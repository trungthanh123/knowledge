import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Paper, PaperRow, PaperAction } from '../../components/paper/Paper';
import { Button } from '../../components/button/Button';
import { Field } from '../../components/field/Field';
import { supplierService } from '../../services/supplier.service';
import { getMess } from '../../util/message';
import './add-invoice.scss';

function AddInvoice({ history }) {
  const { register, handleSubmit } = useForm();
  const [invoice, setInvoice] = useState({});
  const [invoiceNotFoundMess, setInvoiceNotFoundMess] = useState('');

  const getExtInvoice = form => {
    setInvoiceNotFoundMess('');
    if (form.invoiceId) {
      supplierService
        .getExtInvoice(form.invoiceId)
        .then(res => {
          if (isEmpty(res)) {
            setInvoiceNotFoundMess(getMess('M02'));
            return setInvoice({});
          }
          return setInvoice(res);
        })
        .catch(console.error);
    }
  };

  const addInvoice = () => {
    supplierService
      .addInvoice(invoice)
      .then(() => history.push('/'))
      .catch(console.error);
  };

  return (
    <Grid container direction="row" justify="center" className="add-invoice">
      <Grid item xs={4}>
        <Grid container alignItems="flex-end" className="add-invoice-get-info">
          <Grid item xs={9}>
            <Field name="invoiceId" label="Invoice ID" inputRef={register()} />
          </Grid>
          <Grid item xs={3}>
            <Button text="Get info" onClick={handleSubmit(getExtInvoice)} />
          </Grid>
        </Grid>
        <div className="error-text">{invoiceNotFoundMess}</div>

        {invoice.id && (
          <Paper title="Invoice">
            <PaperRow label="Invoice ID" value={invoice.id} />
            <PaperRow label="Product" value={invoice.product} />
            <PaperRow label="Buyer" value={invoice.buyer} />
            <PaperRow label="Amount" value={invoice.amount} format="amount" />
            <PaperRow label="Due Date" value={invoice.dueDate} format="date" />
            <PaperRow label="Status" value={invoice.status} />

            <PaperAction>
              <Button text="Add Invoice" onClick={addInvoice} />
            </PaperAction>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

AddInvoice.propTypes = {
  history: PropTypes.instanceOf(Object),
};

AddInvoice.defaultProps = {
  history: {},
};

export { AddInvoice };
