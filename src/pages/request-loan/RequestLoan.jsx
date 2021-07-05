import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Paper, PaperRow } from '../../components/paper/Paper';
import { supplierService } from '../../services/supplier.service';

import { RequestLoanForm } from './request-loan-form/RequestLoanForm';
import './request-loan.scss';

function RequestLoan({ match, history }) {
  const [invoice, setInvoice] = useState({});
  const [loanTemplates, setLoanTemplates] = useState([]);

  const getInvoice = () => {
    const invoiceId = match?.params?.id;
    supplierService
      .getInvoice(invoiceId)
      .then(res => setInvoice(res))
      .catch(console.error);
  };

  const getLoanTemplates = () => {
    supplierService
      .getLoanTemplates()
      .then(res => setLoanTemplates(res))
      .catch(console.error);
  };

  useEffect(() => {
    getInvoice();
    getLoanTemplates();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="request-loan"
    >
      <Grid item xs={5}>
        <Paper title="Invoice">
          <PaperRow label="Invoice ID" value={invoice.id} />
          <PaperRow label="Product" value={invoice.product} />
          <PaperRow label="Amount" value={invoice.amount} format="amount" />
          <PaperRow label="Due Date" value={invoice.dueDate} format="date" />
          <PaperRow label="Status" value={invoice.status} />
        </Paper>

        {map(loanTemplates, template => (
          <RequestLoanForm
            loanTemplate={template}
            invoice={invoice}
            history={history}
          />
        ))}
      </Grid>
    </Grid>
  );
}

RequestLoan.propTypes = {
  match: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

RequestLoan.defaultProps = {
  match: {},
  history: {},
};

export { RequestLoan };
