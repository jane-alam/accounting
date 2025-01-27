module.exports = {
  name: 'Account',
  label: 'Account',
  doctype: 'DocType',
  documentClass: require('./AccountDocument.js'),
  isSingle: 0,
  isTree: 1,
  keywordFields: ['name', 'rootType', 'accountType'],
  fields: [
    {
      fieldname: 'name',
      label: 'Account Name',
      fieldtype: 'Data',
      required: 1
    },
    {
      fieldname: 'rootType',
      label: 'Root Type',
      fieldtype: 'Select',
      options: [
        'Select...',
        'Asset',
        'Liability',
        'Equity',
        'Income',
        'Expense'
      ],
      required: 1
    },
    {
      fieldname: 'parentAccount',
      label: 'Parent Account',
      fieldtype: 'Link',
      target: 'Account',
      getFilters: (query, doc) => {
        const filter = {
          isGroup: 1
        };
        doc.rootType ? (filter.rootType = doc.rootType) : '';
        return filter;
      }
    },
    {
      fieldname: 'accountType',
      label: 'Account Type',
      fieldtype: 'Select',
      required: 1,
      options: [
        '',
        'Accumulated Depreciation',
        'Bank',
        'Cash',
        'Chargeable',
        'Cost of Goods Sold',
        'Depreciation',
        'Equity',
        'Expense Account',
        'Expenses Included In Valuation',
        'Fixed Asset',
        'Income Account',
        'Payable',
        'Receivable',
        'Round Off',
        'Stock',
        'Stock Adjustment',
        'Stock Received But Not Billed',
        'Tax',
        'Temporary'
      ]
    },
    {
      fieldname: 'balance',
      label: 'Balance',
      fieldtype: 'Currency',
      default: '0',
      disabled: true
    },
    {
      fieldname: 'isGroup',
      label: 'Is Group',
      fieldtype: 'Check'
    }
  ],

  quickEditFields: [
    'name',
    'rootType',
    'parentAccount',
    'accountType',
    'balance',
    'isGroup',
  ],

  events: {
    validate: doc => {}
  },

  listSettings: {
    getFields(list) {
      return ['name', 'accountType', 'rootType'];
    },
    getRowHTML(list, data) {
      return `<div class="col-11">${list.getNameHTML(data)} (${
        data.rootType
      })</div>`;
    }
  },

  treeSettings: {
    parentField: 'parentAccount',
    async getRootLabel() {
      let accountingSettings = await frappe.getSingle('AccountingSettings');
      return accountingSettings.companyName;
    }
  }
};
