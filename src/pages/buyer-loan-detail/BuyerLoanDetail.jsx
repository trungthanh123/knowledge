import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Paper, PaperRow, PaperAction } from '../../components/paper/Paper';
import { buyerService } from '../../services/buyer.service';
import { Popup } from '../../components/popup/Popup';
import { Button } from '../../components/button/Button';
import { itemStatus } from '../../configs/common-config';
import './buyer-loan-detail.scss';

function BuyerLoanDetail({ match, history }) {
  const [loan, setLoan] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [checkedCommitment, setCheckedCommitment] = useState(false);

  const getLoan = () => {
    const loanId = match?.params?.id;
    buyerService
      .getLoan(loanId)
      .then(res => setLoan(res))
      .catch(console.error);
  };

  useEffect(() => {
    getLoan();
  }, []);

  const approveLoan = () => {
    const loanId = match?.params?.id;
    buyerService
      .approveLoan(loanId)
      .then(() => setOpenPopup(true))
      .catch(console.error);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    history.push('/');
  };

  const handleCheckCommitment = event => {
    setCheckedCommitment(event.target.checked);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="buyer-loan-detail"
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

          {itemStatus.loanRequested === loan.status && (
            <PaperAction>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedCommitment}
                    onChange={handleCheckCommitment}
                    name="commitment"
                  />
                }
                className="loan-detail-commitment"
                label={`I acknowledge that the invoice data is sent to UOB bank for processing loan ID ${loan.id}`}
              />
            </PaperAction>
          )}

          {itemStatus.loanRequested === loan.status && (
            <PaperAction>
              <Button
                text="Approve"
                onClick={approveLoan}
                disabled={!checkedCommitment}
              />
            </PaperAction>
          )}
        </Paper>
      </Grid>

      <Popup
        isOpen={openPopup}
        handleClose={handleClosePopup}
        title="Notification"
        content="Approve loan request is successfully sent to the system."
      />
    </Grid>
  );
}

BuyerLoanDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

BuyerLoanDetail.defaultProps = {
  match: {},
  history: {},
};

export { BuyerLoanDetail };
