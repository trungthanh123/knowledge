import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Paper, PaperRow, PaperAction } from '../../components/paper/Paper';
import { bankService } from '../../services/bank.service';
import { Popup } from '../../components/popup/Popup';
import { Button } from '../../components/button/Button';
import { itemStatus } from '../../configs/common-config';
import './bank-loan-detail.scss';

function BankLoanDetail({ match }) {
  const [loan, setLoan] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [messPopup, setMessPopup] = useState('');

  const getLoan = () => {
    const loanId = match?.params?.id;
    bankService
      .getLoan(loanId)
      .then(res => setLoan(res))
      .catch(console.error);
  };

  useEffect(() => {
    getLoan();
  }, []);

  const handleClosePopup = () => {
    setOpenPopup(false);
    getLoan();
  };

  const approveLoan = () => {
    const loanId = match?.params?.id;
    bankService
      .approveLoan(loanId)
      .then(() => {
        setMessPopup(`Loan ${loanId} is successfully approved.`);
        return setOpenPopup(true);
      })
      .catch(console.error);
  };

  const executeLoan = () => {
    const loanId = match?.params?.id;
    bankService
      .executeLoan(loanId)
      .then(() => {
        setMessPopup(
          'Loan execution request is successfully sent to the payment system.'
        );
        return setOpenPopup(true);
      })
      .catch(console.error);
  };

  const requestRepayment = () => {
    bankService
      .requestRepayment(loan.id)
      .then(() => {
        setMessPopup(
          `Repayment is requested to buyer ${loan.buyer} for Loan ${loan.id}.`
        );
        return setOpenPopup(true);
      })
      .catch(console.error);
  };

  const btnWithStatus = {
    [itemStatus.buyerApproved]: { text: 'Approve', action: approveLoan },
    [itemStatus.bankApproved]: { text: 'Execute Loan', action: executeLoan },
    [itemStatus.loanExecuted]: {
      text: 'Request Repayment',
      action: requestRepayment,
    },
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="bank-loan-detail"
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

          <PaperAction>
            {btnWithStatus[loan.status] && (
              <Button
                text={btnWithStatus[loan.status].text}
                onClick={btnWithStatus[loan.status].action}
              />
            )}
          </PaperAction>
        </Paper>
      </Grid>

      <Popup
        isOpen={openPopup}
        handleClose={handleClosePopup}
        title="Notification"
        content={messPopup}
      />
    </Grid>
  );
}

BankLoanDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
};

BankLoanDetail.defaultProps = {
  match: {},
};

export { BankLoanDetail };
