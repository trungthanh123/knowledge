import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { buyerService } from '../../services/buyer.service';
import { Table } from '../../components/table/Table';
import { repaymentColumns, loanColumns } from './buyer-home.config';
import './buyer-home.scss';

function BuyerHome({ history }) {
  const [repayments, setRepayments] = useState([]);
  const [loans, setLoans] = useState([]);

  const getRepayments = () => {
    buyerService
      .getRepayments()
      .then(res => setRepayments(res))
      .catch(console.error);
  };

  const getLoans = () => {
    buyerService
      .getLoans()
      .then(res => setLoans(res))
      .catch(console.error);
  };

  const goToRepaymentDetail = (event, rowData) => {
    history.push(`/buyer-home/repayment/${rowData.id}`);
  };

  const goToLoanDetail = (event, rowData) => {
    history.push(`/buyer-home/loan/${rowData.id}`);
  };

  useEffect(() => {
    getRepayments();
    getLoans();
  }, []);

  return (
    <Grid container className="buyer-home" justify="center">
      <Grid item xs={10} className="buyer-home-loan">
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

BuyerHome.propTypes = {
  history: PropTypes.instanceOf(Object),
};

BuyerHome.defaultProps = {
  history: {},
};

export { BuyerHome };
