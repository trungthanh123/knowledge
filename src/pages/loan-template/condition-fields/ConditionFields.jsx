import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import find from 'lodash/find';
import { Field } from '../../../components/field/Field';
import { getMess } from '../../../util/message';

function ConditionFields({
  control,
  errors,
  register,
  watch,
  index,
  templateConditions,
  clearErrors,
  onView,
  field,
}) {
  const [isExactMatch, setIsExactMatch] = useState(true);
  const [isOverOptions, setIsOverOptions] = useState([]);
  const [condition1Options, setCondition1Options] = useState([]);
  const condition = watch(`condition[${index}]`) || {};

  // Create options of condition 1
  useEffect(() => {
    const options = map(templateConditions, item => ({
      name: item.displayName,
      value: item.id,
    }));
    setCondition1Options(options);
  }, [templateConditions]);

  useEffect(() => {
    if (condition.id) {
      const templateCondition = find(templateConditions, { id: condition.id });
      if (templateCondition?.type === 'exactMatch') {
        // Create options for condition 2
        const options = map(templateCondition.precedence, item => ({
          name: item.value,
          value: `${item.id}`,
        }));
        setIsOverOptions(options);

        setIsExactMatch(true);
        clearErrors('threshold');
      } else {
        setIsExactMatch(false);
        clearErrors('value');
      }
    } else {
      // Reset 'is over' options after add successfully
      setIsOverOptions([]);
    }
  }, [condition.id]);

  return (
    <Grid container>
      <Grid item xs={4}>
        <Field
          typeField="secondary"
          typeInput="select"
          required
          name={`condition[${index}].id`}
          label="Condition"
          rules={{ required: getMess('M01', 'Condition') }}
          control={control}
          options={condition1Options}
          helperText={get(errors, `condition[${index}].id.message`)}
          layout={{ labelCol: 6, inputCol: 6 }}
          disabled={onView}
          defaultValue={field.id}
        />
      </Grid>
      <Grid item xs={8}>
        <div className="is-over-field">
          {isExactMatch ? (
            <Field
              typeField="secondary"
              typeInput="select"
              required
              name={`condition[${index}].value`}
              label="is over"
              rules={{ required: getMess('M01', 'is over') }}
              control={control}
              options={isOverOptions}
              helperText={get(errors, `condition[${index}].value.message`)}
              layout={{ labelCol: 4, inputCol: 8 }}
              disabled={onView}
              defaultValue={field.value}
            />
          ) : (
            <Field
              typeField="secondary"
              name={`condition[${index}].threshold`}
              label="is over"
              inputRef={register({
                required: getMess('M01', 'is over'),
              })}
              helperText={get(errors, `condition[${index}].threshold.message`)}
              typeInput="number"
              layout={{ labelCol: 4, inputCol: 8 }}
              disabled={onView}
              defaultValue={field.threshold}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
}

ConditionFields.propTypes = {
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]),
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  templateConditions: PropTypes.arrayOf(PropTypes.object),
  onView: PropTypes.bool,
  field: PropTypes.oneOfType([PropTypes.object]),
};

ConditionFields.defaultProps = {
  templateConditions: [],
  errors: {},
  field: {},
  onView: false,
};

export { ConditionFields };
