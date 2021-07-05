import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Paper, PaperRow, PaperAction } from '../../components/paper/Paper';
import { Button } from '../../components/button/Button';
import { supplierService } from '../../services/supplier.service';
import { itemStatus } from '../../configs/common-config';
import './invoice-detail.scss';

function InvoiceDetail({ history, match }) {
  const [invoice, setInvoice] = useState({});

  const getInvoice = () => {
    const invoiceId = match?.params?.id;
    supplierService
      .getInvoice(invoiceId)
      .then(res => setInvoice(res))
      .catch(console.error);
  };

  useEffect(() => {
    getInvoice();
  }, []);

  const goToRequestLoan = () => {
    history.push(`/supplier-home/invoice/${invoice.id}/request-loan`);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="invoice-detail"
    >
      <Grid item xs={4}>
        <Paper title="Invoice">
          <PaperRow label="Invoice ID" value={invoice.id} />
          <PaperRow label="Product" value={invoice.product} />
          <PaperRow label="Buyer" value={invoice.buyer} />
          <PaperRow label="Amount" value={invoice.amount} format="amount" />
          <PaperRow label="Due Date" value={invoice.dueDate} format="date" />
          <PaperRow label="Status" value={invoice.status} />

          {itemStatus.invoiceAdded === invoice.status && (
            <PaperAction>
              <Button text="Register Loan" onClick={goToRequestLoan} />
            </PaperAction>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

InvoiceDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

InvoiceDetail.defaultProps = {
  match: {},
  history: {},
};

export { InvoiceDetail };
