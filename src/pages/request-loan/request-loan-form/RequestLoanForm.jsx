import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Paper, PaperAction } from '../../../components/paper/Paper';
import { Button } from '../../../components/button/Button';
import { supplierService } from '../../../services/supplier.service';
import { InputRange } from '../input-range/InputRange';
import { DateRange } from '../date-range/DateRange';

function RequestLoanForm({ history, invoice, loanTemplate }) {
  const { register, handleSubmit, control } = useForm();

  const requestLoan = (template, form) => {
    const payload = {
      invoiceId: invoice.id,
      loanTemplateId: template.id,
      ...form,
    };

    supplierService
      .requestLoan(payload)
      .then(() => history.push('/'))
      .catch(console.error);
  };

  return (
    <div className="request-loan-template" key={loanTemplate.id}>
      <Paper
        title={`Loan: ${loanTemplate.loanName} (${loanTemplate.bankName})`}
      >
        <div className="request-loan-template-content">
          <DateRange
            name="loanStartDate"
            invoice={invoice}
            template={loanTemplate}
            control={control}
          />
          <InputRange
            name="amount"
            title="Amount"
            amount={invoice.amount}
            inputRef={register()}
          />
        </div>

        <PaperAction>
          <Button
            text="Request Loan"
            onClick={handleSubmit(form => requestLoan(loanTemplate, form))}
          />
        </PaperAction>
      </Paper>
    </div>
  );
}

RequestLoanForm.propTypes = {
  history: PropTypes.instanceOf(Object),
  invoice: PropTypes.instanceOf(Object),
  loanTemplate: PropTypes.instanceOf(Object),
};

RequestLoanForm.defaultProps = {
  history: {},
  invoice: {},
  loanTemplate: {},
};

export { RequestLoanForm };
