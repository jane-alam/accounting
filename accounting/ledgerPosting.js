const frappe = require('frappejs');

module.exports = class LedgerPosting {
  constructor({ reference, party, date, description }) {
    Object.assign(this, arguments[0]);
    this.entries = [];
    this.entryMap = {};
    // To change balance while entering ledger entries
    this.accountEntries = [];
  }

  async debit(account, amount, referenceType, referenceName) {
    const entry = this.getEntry(account, referenceType, referenceName);
    amount = frappe.parseNumber(amount);
    entry.debit += amount;
    await this.setAccountBalanceChange(account, 'debit', amount);
  }

  async credit(account, amount, referenceType, referenceName) {
    const entry = this.getEntry(account, referenceType, referenceName);
    amount = frappe.parseNumber(amount);
    entry.credit += amount;
    await this.setAccountBalanceChange(account, 'credit', amount);
  }

  async setAccountBalanceChange(accountName, type, amount) {
    const debitAccounts = ['Asset', 'Expense'];
    const { rootType } = await frappe.getDoc('Account', accountName);
    if (debitAccounts.indexOf(rootType) === -1) {
      const change = type == 'credit' ? amount : -1 * amount;
      this.accountEntries.push({
        name: accountName,
        balanceChange: change
      });
    } else {
      const change = type == 'debit' ? amount : -1 * amount;
      this.accountEntries.push({
        name: accountName,
        balanceChange: change
      });
    }
  }

  getEntry(account, referenceType, referenceName) {
    if (!this.entryMap[account]) {
      const entry = {
        account: account,
        party: this.party || '',
        date: this.date || this.reference.date,
        referenceType: referenceType || this.reference.doctype,
        referenceName: referenceName || this.reference.name,
        description: this.description,
        debit: 0,
        credit: 0
      };

      this.entries.push(entry);
      this.entryMap[account] = entry;
    }

    return this.entryMap[account];
  }

  async post() {
    this.validateEntries();
    await this.insertEntries();
  }

  async postReverse() {
    this.validateEntries();
    let temp;
    for (let entry of this.entries) {
      temp = entry.debit;
      entry.debit = entry.credit;
      entry.credit = temp;
    }
    for (let entry of this.accountEntries) {
      entry.balanceChange = -1 * entry.balanceChange;
    }
    await this.insertEntries();
  }

  validateEntries() {
    let debit = 0;
    let credit = 0;
    let debitAccounts = [];
    let creditAccounts = [];
    for (let entry of this.entries) {
      debit += entry.debit;
      credit += entry.credit;
      if (debit) {
        debitAccounts.push(entry.account);
      } else {
        creditAccounts.push(entry.account);
      }
    }
    debit = Math.floor(debit * 100) / 100;
    credit = Math.floor(credit * 100) / 100;
    if (debit !== credit) {
      frappe.call({
        method: 'show-dialog',
        args: {
          title: 'Invalid Entry',
          message: frappe._('Debit {0} must be equal to Credit {1}', [
            debit,
            credit
          ])
        }
      });
      throw new Error(`Debit ${debit} must be equal to Credit ${credit}`);
    }
  }

  async insertEntries() {
    for (let entry of this.entries) {
      let entryDoc = frappe.newDoc({
        doctype: 'AccountingLedgerEntry'
      });
      Object.assign(entryDoc, entry);
      await entryDoc.insert();
    }
    for (let entry of this.accountEntries) {
      let entryDoc = await frappe.getDoc('Account', entry.name);
      entryDoc.balance += entry.balanceChange;
      await entryDoc.update();
    }
  }
};
