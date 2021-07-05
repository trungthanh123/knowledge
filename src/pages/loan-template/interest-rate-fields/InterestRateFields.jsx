import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Field } from '../../../components/field/Field';
import { getMess } from '../../../util/message';

function InterestRateFields({ errors, register, index, field, onView }) {
  return (
    <Grid container>
      {index === 0 ? (
        <Grid item xs={4}>
          <Field
            label="Interest Rate"
            typeInput="number"
            name={`interestRate[${index}].rate`}
            inputRef={register({
              required: getMess('M01', 'Interest Rate'),
            })}
            typeField="secondary"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            required
            helperText={get(errors, `interestRate[${index}].rate.message`)}
            layout={{ labelCol: 6, inputCol: 6 }}
            disabled={onView}
            defaultValue={field.rate}
          />
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={4}>
            <Field
              typeInput="number"
              name={`interestRate[${index}].rate`}
              inputRef={register()}
              typeField="secondary"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              layout={{ labelCol: 6, inputCol: 6 }}
              disabled={onView}
              defaultValue={field.rate}
            />
          </Grid>
          <Grid item xs={8}>
            <span className="min-days">
              <Field
                typeInput="number"
                name={`interestRate[${index}].minDays`}
                label="if the duration is shorter than"
                inputRef={register()}
                typeField="secondary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">days</InputAdornment>
                  ),
                }}
                layout={{ labelCol: 7, inputCol: 5 }}
                disabled={onView}
                defaultValue={field.minDays}
              />
            </span>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

InterestRateFields.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.object]),
  register: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onView: PropTypes.bool,
};

InterestRateFields.defaultProps = {
  errors: {},
  onView: false,
};

export { InterestRateFields };
