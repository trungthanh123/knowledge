import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Table } from '../../components/table/Table';
import { invoiceColumns, loanColumns } from './supplier-home.config';
import { supplierService } from '../../services/supplier.service';
import './supplier-home.scss';

function SupplierHome({ history }) {
  const [invoices, setInvoices] = useState([]);
  const [loans, setLoans] = useState([]);

  const getInvoices = () => {
    supplierService
      .getInvoices()
      .then(res => setInvoices(res))
      .catch(console.error);
  };

  const getLoans = () => {
    supplierService
      .getLoans()
      .then(res => setLoans(res))
      .catch(console.error);
  };

  const goToInvoiceDetail = (event, rowData) => {
    history.push(`/supplier-home/invoice/${rowData.id}`);
  };

  const goToLoanDetail = (event, rowData) => {
    history.push(`/supplier-home/loan/${rowData.id}`);
  };

  useEffect(() => {
    getInvoices();
    getLoans();
  }, []);

  return (
    <Grid container className="supplier-home" justify="center">
      <Grid item xs={10} className="supplier-home-invoices">
        <Table
          columns={invoiceColumns}
          data={invoices}
          title="Invoice"
          onRowClick={goToInvoiceDetail}
        />
      </Grid>
      <Grid item xs={10}>
        <Table
          columns={loanColumns}
          data={loans}
          title="Loan"
          onRowClick={goToLoanDetail}
        />
      </Grid>
    </Grid>
  );
}

SupplierHome.propTypes = {
  history: PropTypes.instanceOf(Object),
};

SupplierHome.defaultProps = {
  history: {},
};

export { SupplierHome };
