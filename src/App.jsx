import React from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SupplierHome } from './pages/supplier-home/SupplierHome';
import { BuyerHome } from './pages/buyer-home/BuyerHome';
import { BankHome } from './pages/bank-home/BankHome';
import { AddInvoice } from './pages/add-invoice/AddInvoice';
import { InvoiceDetail } from './pages/invoice-detail/InvoiceDetail';
import { SupplierLoanDetail } from './pages/supplier-loan-detail/SupplierLoanDetail';
import { BuyerLoanDetail } from './pages/buyer-loan-detail/BuyerLoanDetail';
import { BankLoanDetail } from './pages/bank-loan-detail/BankLoanDetail';
import { LoanTemplate } from './pages/loan-template/LoanTemplate';
import { BuyerRepaymentDetail } from './pages/buyer-repayment-detail/BuyerRepaymentDetail';
import { RequestLoan } from './pages/request-loan/RequestLoan';
import { pagesHasPermission, pagesNotPermission } from './configs/pages';
import { NotFound } from './components/not-found/NotFound';
import { Header } from './components/header/Header';
import { user } from './util/user';
import { BankRepaymentDetail } from './pages/bank-repayment-detail/BankRepaymentDetail';
// import { Footer } from './components/footer/Footer';
import { PrivateRoute } from './components/private-route/PrivateRoute';

const components = {
  SupplierHome,
  AddInvoice,
  InvoiceDetail,
  SupplierLoanDetail,
  RequestLoan,
  BuyerHome,
  BuyerRepaymentDetail,
  BuyerLoanDetail,
  BankHome,
  LoanTemplate,
  BankRepaymentDetail,
  BankLoanDetail,
};

function App({ history, ...rest }) {
  const homePage = {
    supplier: '/supplier-home',
    buyer: '/buyer-home',
    bank: '/bank-home',
  };

  const redirectHomePage = () => {
    const userInfo = user.getUserInfo();
    if (isEmpty(userInfo) || !userInfo.role) {
      return <Redirect to="/login" />;
    }
    return <Redirect to={homePage[userInfo.role]} />;
  };

  return (
    <div>
      <Header history={history} {...rest} />
      <div className="app-content">
        <Switch>
          <Route exact path="/" render={() => redirectHomePage()} />

          {map(pagesNotPermission, page => (
            <Route
              key={page.component}
              path={page.path}
              component={components[page.component]}
              exact
            />
          ))}

          {map(pagesHasPermission, page => (
            <PrivateRoute
              key={page.component}
              path={page.path}
              permissionId={page.permissionId}
              component={components[page.component]}
              exact
            />
          ))}

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};

App.defaultProps = {
  history: {},
};

export { App };
