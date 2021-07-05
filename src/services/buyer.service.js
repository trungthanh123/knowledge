import { requestUrl } from '../configs/request-url';
import { requestService } from './request.service';

const getRepayments = () => requestService.get(requestUrl.repayment);

const getRepayment = repaymentId =>
  requestService.get(`${requestUrl.repayment}/${repaymentId}`);

const getLoans = () => requestService.get(requestUrl.loan);

const getLoan = loanId => requestService.get(`${requestUrl.loan}/${loanId}`);

const approveLoan = loanId =>
  requestService.put(`${requestUrl.loan}/buyer-approve`, { id: loanId });

const executeRepayment = repaymentId =>
  requestService.put(`${requestUrl.repayment}/execute`, {
    id: repaymentId,
  });

export const buyerService = {
  getRepayment,
  getLoan,
  getRepayments,
  getLoans,
  executeRepayment,
  approveLoan,
};
