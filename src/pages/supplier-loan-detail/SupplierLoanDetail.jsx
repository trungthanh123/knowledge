import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Paper, PaperRow } from '../../components/paper/Paper';
import { supplierService } from '../../services/supplier.service';
import './supplier-loan-detail.scss';

function SupplierLoanDetail({ match }) {
  const [loan, setLoan] = useState({});

  const getLoan = () => {
    const loanId = match?.params?.id;
    supplierService
      .getLoan(loanId)
      .then(res => setLoan(res))
      .catch(console.error);
  };

  useEffect(() => {
    getLoan();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="supplier-loan-detail"
    >
      <Grid item xs={4}>
        <Paper title="Loan">
          <PaperRow label="Loan ID" value={loan.id} />
          <PaperRow
            label="Invoice ID"
            value={loan.invoiceId && loan.invoiceId[0]}
          />
          <PaperRow label="Bank" value={loan.bankName} />
          <PaperRow label="Loan Type" value={loan.loanType} />
          <PaperRow label="Buyer" value={loan.buyer} />
          <PaperRow label="Amount" value={loan.amount} format="amount" />
          <PaperRow label="Start Date" value={loan.startDate} format="date" />
          <PaperRow label="End Date" value={loan.endDate} format="date" />
          <PaperRow label="Status" value={loan.status} />
        </Paper>
      </Grid>
    </Grid>
  );
}

SupplierLoanDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
};

SupplierLoanDetail.defaultProps = {
  match: {},
};

export { SupplierLoanDetail };
