import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Paper, PaperRow, PaperAction } from '../../components/paper/Paper';
import { Button } from '../../components/button/Button';
import { buyerService } from '../../services/buyer.service';
import { Popup } from '../../components/popup/Popup';
import './buyer-repayment-detail.scss';
import { itemStatus } from '../../configs/common-config';

function BuyerRepaymentDetail({ match, history }) {
  const [repayment, setRepayment] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  const getRepayment = () => {
    const repaymentId = match?.params?.id;
    buyerService
      .getRepayment(repaymentId)
      .then(res => setRepayment({ ...res }))
      .catch(console.error);
  };

  useEffect(() => {
    getRepayment();
  }, []);

  const executeRepayment = () => {
    const repaymentId = match?.params?.id;
    buyerService
      .executeRepayment(repaymentId)
      .then(() => setOpenPopup(true))
      .catch(console.error);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    history.push('/');
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="buyer-repayment-detail"
    >
      <Grid item xs={4}>
        <Paper title="Repayment">
          <PaperRow label="Loan ID" value={repayment.loanId} />
          <PaperRow label="Invoice ID" value={repayment.invoiceId} />
          <PaperRow label="Bank" value={repayment.bankName} />
          <PaperRow label="Amount" value={repayment.amount} format="amount" />
          <PaperRow label="Due Date" value={repayment.dueDate} format="date" />
          <PaperRow label="Status" value={repayment.status} />

          {itemStatus.repaymentRequested === repayment.status && (
            <PaperAction>
              <Button text="Execute Repayment" onClick={executeRepayment} />
            </PaperAction>
          )}
        </Paper>
      </Grid>

      <Popup
        isOpen={openPopup}
        handleClose={handleClosePopup}
        title="Notification"
        content="Repayment execution request is successfully sent to the payment system."
      />
    </Grid>
  );
}

BuyerRepaymentDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

BuyerRepaymentDetail.defaultProps = {
  match: {},
  history: {},
};

export { BuyerRepaymentDetail };
