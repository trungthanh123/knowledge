import React from 'react';
import PaperMaterial from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { formatAmount, formatDate } from '../../util/valueFormat';
import './paper.scss';

function Paper({ children, title }) {
  return (
    <div className="paper">
      <PaperMaterial>
        <div className="paper-title">{title}</div>
        <div className="paper-content">{children}</div>
      </PaperMaterial>
    </div>
  );
}

Paper.defaultProps = {
  children: <></>,
  title: '',
};
Paper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  title: PropTypes.string,
};

function PaperRow({ label, value, format }) {
  let valueFormat = '';
  switch (format) {
    case 'date':
      valueFormat = formatDate(value);
      break;
    case 'amount':
      valueFormat = formatAmount(value);
      break;
    default:
      valueFormat = value;
      break;
  }

  return (
    <Grid container>
      <Grid container item xs={6} className="paper-row-left">
        {label}
      </Grid>
      <Grid container item xs={6} className="paper-row-right">
        {valueFormat}
      </Grid>
    </Grid>
  );
}

PaperRow.defaultProps = {
  label: '',
  format: '',
  value: '',
};
PaperRow.propTypes = {
  label: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function PaperAction({ children }) {
  return (
    <Grid container className="paper-action">
      {children}
    </Grid>
  );
}

PaperAction.defaultProps = {
  children: <></>,
};
PaperAction.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export { Paper, PaperRow, PaperAction };
