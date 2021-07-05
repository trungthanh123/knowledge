import React from 'react';
import ButtonMaterial from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './button.scss';

function Button({ text, variant, color, ...otherProps }) {
  const classes = { primary: 'button-primary' };

  return (
    <span className="button-custom">
      <ButtonMaterial
        variant={variant}
        className={`btn ${classes[color] || classes.primary}`}
        {...otherProps}
      >
        {text}
      </ButtonMaterial>
    </span>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  variant: 'contained',
  color: 'primary',
};
export { Button };
