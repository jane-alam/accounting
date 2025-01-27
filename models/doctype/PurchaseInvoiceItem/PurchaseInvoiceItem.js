module.exports = {
  name: 'PurchaseInvoiceItem',
  label: 'Purchase Invoice Item',
  doctype: 'DocType',
  isSingle: 0,
  isChild: 1,
  keywordFields: [],
  layout: 'ratio',
  tableFields: [
    'item',
    'tax',
    'quantity',
    'rate',
    'amount'
  ],
  fields: [
    {
      fieldname: 'item',
      label: 'Item',
      fieldtype: 'Link',
      target: 'Item',
      required: 1,
      width: 2
    },
    {
      fieldname: 'description',
      label: 'Description',
      fieldtype: 'Text',
      formula: (row, doc) => doc.getFrom('Item', row.item, 'description'),
      hidden: 1
    },
    {
      fieldname: 'quantity',
      label: 'Quantity',
      fieldtype: 'Float',
      required: 1
    },
    {
      fieldname: 'rate',
      label: 'Rate',
      fieldtype: 'Currency',
      required: 1,
      formula: (row, doc) => doc.getFrom('Item', row.item, 'rate')
    },
    {
      fieldname: 'account',
      label: 'Account',
      fieldtype: 'Link',
      target: 'Account',
      required: 1,
      formula: (row, doc) => doc.getFrom('Item', row.item, 'expenseAccount')
    },
    {
      fieldname: 'tax',
      label: 'Tax',
      fieldtype: 'Link',
      target: 'Tax',
      formula: (row, doc) => {
        if (row.tax) return row.tax;
        return doc.getFrom('Item', row.item, 'tax');
      }
    },
    {
      fieldname: 'amount',
      label: 'Amount',
      fieldtype: 'Currency',
      readOnly: 1,
      disabled: true,
      formula: async (row, doc) => {
        return await doc.formatIntoCustomerCurrency(
          row.quantity * frappe.parseNumber(row.rate)
        );
      }
    },
    {
      fieldname: 'taxAmount',
      label: 'Tax Amount',
      hidden: 1,
      readOnly: 1,
      fieldtype: 'Text',
      formula: (row, doc) => doc.getRowTax(row)
    }
  ]
};
