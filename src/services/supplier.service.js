import { requestService } from './request.service';
import { requestUrl } from '../configs/request-url';

const getInvoices = () => requestService.get(requestUrl.invoice);

const getInvoice = invoiceId =>
  requestService.get(`${requestUrl.invoice}/${invoiceId}`);

const addInvoice = payload => {
  const payloadClone = payload;
  payloadClone.extId = payloadClone.id;
  delete payloadClone.id;

  return requestService.post(requestUrl.invoice, payloadClone);
};

const getExtInvoice = invoiceId =>
  requestService.get(`${requestUrl.invoice}/ext-invoices/${invoiceId}`);

const getLoans = () => requestService.get(requestUrl.loan);

const getLoan = loanId => requestService.get(`${requestUrl.loan}/${loanId}`);

const requestLoan = payload => {
  const payloadClone = payload;
  payloadClone.amount = +payloadClone.amount;
  payloadClone.loanStartDate = new Date(payloadClone.loanStartDate);
  return requestService.post(requestUrl.loan, payloadClone);
};

const getLoanTemplates = () => requestService.get(requestUrl.loanTemplate);

export const supplierService = {
  getInvoice,
  getLoanTemplates,
  requestLoan,
  getExtInvoice,
  getLoan,
  getInvoices,
  getLoans,
  addInvoice,
};
