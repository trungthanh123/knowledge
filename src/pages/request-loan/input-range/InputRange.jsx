import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import './input-range.scss';

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
})(Slider);

function InputRange({ title, amount, unit, ...rest }) {
  const [value, setValue] = useState(amount);
  const onChange = (e, valueSlide) => {
    setValue(valueSlide);
  };

  return (
    <div className="input-range">
      <Typography gutterBottom>{title}</Typography>
      <div className="inputRange">
        <TextField
          fullWidth
          type="number"
          value={value}
          onChange={e => {
            let valueInput = +e.target.value;
            if (valueInput >= amount) {
              valueInput = amount;
            }
            onChange(e, valueInput);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{unit}</InputAdornment>
            ),
          }}
          className="inputRange"
          {...rest}
        />
        <SliderCustom onChange={onChange} value={+value} max={amount} />
      </div>
    </div>
  );
}

InputRange.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  amount: PropTypes.number,
};

InputRange.defaultProps = {
  title: '',
  amount: 0,
  unit: 'SGD',
};

export { InputRange };
