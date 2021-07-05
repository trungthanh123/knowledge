import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Paper, PaperRow } from '../../components/paper/Paper';
import { bankService } from '../../services/bank.service';
import './bank-repayment-detail.scss';

function BankRepaymentDetail({ match }) {
  const [repayment, setRepayment] = useState({});

  const getRepayment = () => {
    const repaymentId = match?.params?.id;
    bankService
      .getRepayment(repaymentId)
      .then(res => setRepayment(res))
      .catch(console.error);
  };

  useEffect(() => {
    getRepayment();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="repayment-detail"
    >
      <Grid item xs={4}>
        <Paper title="Repayment">
          <PaperRow label="Loan ID" value={repayment.loanId} />
          <PaperRow label="Invoice ID" value={repayment.invoiceId} />
          <PaperRow label="Buyer" value={repayment.buyer} />
          <PaperRow label="Amount" value={repayment.amount} format="amount" />
          <PaperRow label="Due Date" value={repayment.dueDate} format="date" />
          <PaperRow label="Status" value={repayment.status} />
        </Paper>
      </Grid>
    </Grid>
  );
}

BankRepaymentDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
};

BankRepaymentDetail.defaultProps = {
  match: {},
};

export { BankRepaymentDetail };
