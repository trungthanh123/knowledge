import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import { Controller } from 'react-hook-form';
import { formatDate } from '../../../util/valueFormat';

const oneDay = 86400000;
const today = new Date().getTime();
const getTimeSpan = date => new Date(date).getTime();

const valueLabelStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    margin: '25px 0 5px 0',
  },
}));

const ValueLabel = props => {
  const classes = valueLabelStyles();
  const { children, value, invoice, template } = props;
  const interestRateList = template.interestRate;
  let interestRate = interestRateList[0].rate;
  const duration = (getTimeSpan(invoice.dueDate) - value) / oneDay;
  const interestRateValid = find(
    sortBy(interestRateList, ['minDays']),
    rate => duration <= rate.minDays
  );

  if (interestRateValid) {
    interestRate = interestRateValid.rate;
  }

  return (
    <Tooltip
      open
      placement="bottom-start"
      title={
        <>
          <div>Start date</div>
          <div className="text-bold">{formatDate(value)}</div>
          <div>Interest Rate</div>
          <div className="text-bold">{`${interestRate} %`}</div>
        </>
      }
      classes={classes}
    >
      {children}
    </Tooltip>
  );
};

ValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
  invoice: PropTypes.instanceOf(Object).isRequired,
  template: PropTypes.instanceOf(Object).isRequired,
};

const SliderCustom = withStyles({
  root: {
    color: '#4375c5',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#4375c5',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: '0px 0px 0px 8px rgb(67, 117, 197, 0.3)',
    },
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    borderRadius: 4,
    color: 'white',
  },
  markLabel: {
    color: 'white',
  },
})(Slider);

const DateRange = ({ invoice, template, ...rest }) => {
  const marks = [
    {
      value: today,
      label: 'Today',
    },
    {
      value: getTimeSpan(invoice.dueDate),
      label: 'Invoice Due Date',
    },
  ];

  return (
    <div>
      <div>
        <span className="date-range-label-left">{formatDate(today)}</span>
        <span className="date-range-label-right">
          {formatDate(invoice.dueDate)}
        </span>
      </div>

      <Controller
        {...rest}
        render={propsController => (
          <SliderCustom
            {...propsController}
            min={today}
            max={getTimeSpan(invoice.dueDate)}
            marks={marks}
            step={oneDay}
            onChange={(_, value) => {
              propsController.onChange(value);
            }}
            ValueLabelComponent={propsSlider => {
              return ValueLabel({ ...propsSlider, invoice, template });
            }}
          />
        )}
        defaultValue={today}
      />
    </div>
  );
};

DateRange.propTypes = {
  invoice: PropTypes.instanceOf(Object),
  template: PropTypes.instanceOf(Object),
};

DateRange.defaultProps = {
  invoice: {},
  template: {},
};

export { DateRange };
