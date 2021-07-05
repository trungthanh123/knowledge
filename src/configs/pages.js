import map from 'lodash/map';

const supplierScreens = [
  {
    name: 'Invoice/Loan List',
    path: '/supplier-home',
    component: 'SupplierHome',
  },
  {
    name: 'Add Invoice',
    path: '/add-invoice',
    component: 'AddInvoice',
  },
  {
    name: 'Request Loan',
    path: '/supplier-home/invoice/:id/request-loan',
    component: 'RequestLoan',
  },
  {
    name: 'Invoice Detail',
    path: '/supplier-home/invoice/:id',
    component: 'InvoiceDetail',
  },
  {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    name: 'Loan Detail',
    path: '/supplier-home/loan/:id',
    component: 'SupplierLoanDetail',
  },
];

const buyerScreens = [
  {
    name: 'Loan/Repayment List',
    path: '/buyer-home',
    component: 'BuyerHome',
  },
  {
    name: 'Repayment Detail',
    path: '/buyer-home/repayment/:id',
    component: 'BuyerRepaymentDetail',
  },
  {
    name: 'Loan Detail',
    path: '/buyer-home/loan/:id',
    component: 'BuyerLoanDetail',
  },
];

const bankScreens = [
  {
    name: 'Loan/Repayment List',
    path: '/bank-home',
    component: 'BankHome',
  },
  {
    name: 'Loan Template',
    path: '/loan-template',
    component: 'LoanTemplate',
  },
  {
    name: 'Repayment Detail',
    path: '/bank-home/repayment/:id',
    component: 'BankRepaymentDetail',
  },
  {
    name: 'Loan Detail',
    path: '/bank-home/loan/:id',
    component: 'BankLoanDetail',
  },
];

const navigationMenu = {
  supplier: [supplierScreens[0], supplierScreens[1]],
  buyer: [buyerScreens[0]],
  bank: [bankScreens[0], bankScreens[1]],
};

const pagesHasPermission = [
  ...supplierScreens,
  ...buyerScreens,
  ...bankScreens,
];

const pagesNotPermission = [];

const routesWithRoles = {
  supplier: map(supplierScreens, 'path'),
  buyer: map(buyerScreens, 'path'),
  bank: map(bankScreens, 'path'),
};

export {
  pagesHasPermission,
  pagesNotPermission,
  navigationMenu,
  routesWithRoles,
};
