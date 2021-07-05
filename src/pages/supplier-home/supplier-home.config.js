import { formatDate, formatAmount } from '../../util/valueFormat';

const invoiceColumns = [
  {
    title: 'Invoice ID',
    field: 'id',
  },
  {
    title: 'Product',
    field: 'product',
  },
  {
    title: 'Buyer',
    field: 'buyer',
  },
  {
    title: 'Amount',
    field: 'amount',
    render: rowData => formatAmount(rowData.amount),
  },
  {
    title: 'Due Date',
    field: 'dueDate',
    render: rowData => formatDate(rowData.dueDate),
  },
  {
    title: 'Status',
    field: 'status',
  },
];

const loanColumns = [
  {
    title: 'Loan ID',
    field: 'id',
  },
  {
    title: 'Invoice ID',
    field: 'invoiceId',
  },
  {
    title: 'Loan Type',
    field: 'loanType',
  },
  {
    title: 'Start Date',
    field: 'startDate',
    render: rowData => formatDate(rowData.startDate),
  },
  {
    title: 'End Date',
    field: 'endDate',
    render: rowData => formatDate(rowData.endDate),
  },
  {
    title: 'Status',
    field: 'status',
  },
];

export { invoiceColumns, loanColumns };
