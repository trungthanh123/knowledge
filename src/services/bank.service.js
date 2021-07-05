import reduce from 'lodash/reduce';
import map from 'lodash/map';
import { requestService } from './request.service';
import { requestUrl } from '../configs/request-url';

const formatPayloadLoanTemplate = template => {
  const payloadClone = template;
  payloadClone.interestRate = reduce(
    payloadClone.interestRate,
    (result, item, index) => {
      if (index === 0) {
        return [...result, { rate: +item.rate }];
      }
      if (item.rate && item.minDays) {
        return [...result, { rate: +item.rate, minDays: +item.minDays }];
      }
      return result;
    },
    []
  );

  payloadClone.condition = map(payloadClone.condition, item => {
    const itemClone = item;
    if (item.threshold) {
      itemClone.threshold = +itemClone.threshold;
    }
    return itemClone;
  });
  return payloadClone;
};

const getRepayments = () => requestService.get(requestUrl.repayment);

const getRepayment = repaymentId =>
  requestService.get(`${requestUrl.repayment}/${repaymentId}`);

const getLoans = () => requestService.get(requestUrl.loan);

const getLoan = loanId => requestService.get(`${requestUrl.loan}/${loanId}`);

const approveLoan = loanId =>
  requestService.put(`${requestUrl.loan}/bank-approve`, { id: loanId });

const executeLoan = loanId =>
  requestService.put(`${requestUrl.loan}/execute`, { id: loanId });

const requestRepayment = loanId =>
  requestService.post(requestUrl.repayment, { loanId });

const addLoanTemplate = payload => {
  const payloadFormat = formatPayloadLoanTemplate(payload);

  return requestService.post(requestUrl.loanTemplate, payloadFormat);
};

const updateLoanTemplate = (payload, id) => {
  const payloadFormat = formatPayloadLoanTemplate(payload);

  return requestService.put(`${requestUrl.loanTemplate}/${id}`, payloadFormat);
};

const getLoanTemplates = () => requestService.get(requestUrl.loanTemplate);

const getLoanTemplateConditions = () =>
  requestService.get(`${requestUrl.loanTemplate}/conditions`);

export const bankService = {
  getRepayment,
  approveLoan,
  executeLoan,
  requestRepayment,
  getLoan,
  getRepayments,
  getLoans,
  getLoanTemplates,
  addLoanTemplate,
  updateLoanTemplate,
  getLoanTemplateConditions,
};
