import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { bankService } from '../../services/bank.service';
import { Table } from '../../components/table/Table';
import { repaymentColumns, loanColumns } from './bank-home.config';
import './bank-home.scss';

function BankHome({ history }) {
  const [repayments, setRepayments] = useState([]);
  const [loans, setLoans] = useState([]);

  const getRepayments = () => {
    bankService
      .getRepayments()
      .then(res => setRepayments(res))
      .catch(console.error);
  };

  const getLoans = () => {
    bankService
      .getLoans()
      .then(res => setLoans(res))
      .catch(console.error);
  };

  const goToRepaymentDetail = (event, rowData) => {
    history.push(`/bank-home/repayment/${rowData.id}`);
  };

  const goToLoanDetail = (event, rowData) => {
    history.push(`/bank-home/loan/${rowData.id}`);
  };

  useEffect(() => {
    getRepayments();
    getLoans();
  }, []);

  return (
    <Grid container className="bank-home" justify="center">
      <Grid item xs={10} className="bank-home-loan">
        <Table
          columns={loanColumns}
          data={loans}
          title="Loan"
          onRowClick={goToLoanDetail}
        />
      </Grid>
      <Grid item xs={10}>
        <Table
          columns={repaymentColumns}
          data={repayments}
          title="Repayment"
          onRowClick={goToRepaymentDetail}
        />
      </Grid>
    </Grid>
  );
}

BankHome.propTypes = {
  history: PropTypes.instanceOf(Object),
};

BankHome.defaultProps = {
  history: {},
};

export { BankHome };
