import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import map from 'lodash/map';
import { Paper, PaperAction } from '../../../components/paper/Paper';
import { Button } from '../../../components/button/Button';
import { bankService } from '../../../services/bank.service';
import { Field } from '../../../components/field/Field';
import { ConditionFields } from '../condition-fields/ConditionFields';
import { InterestRateFields } from '../interest-rate-fields/InterestRateFields';

function LoanTemplateEdit({ getLoanTemplates, template, templateConditions }) {
  const [onView, setOnView] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    errors,
    watch,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      interestRate: template.interestRate,
      condition: template.condition,
    },
  });

  // Update template after modifying successfully
  useEffect(() => {
    reset(template);
  }, [template]);

  const {
    fields: interestRateFields,
    append: interestRateAppend,
    remove: interestRateRemove,
  } = useFieldArray({
    control,
    name: 'interestRate',
  });

  const {
    fields: conditionFields,
    append: conditionAppend,
    remove: conditionRemove,
  } = useFieldArray({
    control,
    name: 'condition',
    keyName: 'idConditionField',
  });

  const addInterestRate = () => {
    interestRateAppend({ rate: '', minDays: '' });
  };

  const removeInterestRate = () => {
    interestRateRemove(interestRateFields.length - 1);
  };

  const addCondition = () => {
    conditionAppend({ rate: '', minDays: '' });
  };

  const removeCondition = () => {
    conditionRemove(conditionFields.length - 1);
  };

  const updateLoanTemplate = form => {
    const payload = { ...template, ...form };
    delete payload.bankName;
    bankService
      .updateLoanTemplate(payload, template.id)
      .then(() => {
        setOnView(true);
        return getLoanTemplates();
      })
      .catch(console.error);
  };

  const cancelEdit = () => {
    setOnView(true);
    reset(template);
  };

  const btnWithStatus = () => {
    if (onView) {
      return [{ text: 'Edit', action: () => setOnView(false) }];
    }
    return [
      { text: 'Cancel', action: cancelEdit },
      { text: 'Save', action: handleSubmit(updateLoanTemplate) },
    ];
  };

  const renderInterestRateActions = () => {
    if (onView) {
      return '';
    }
    return (
      <div className="btns-interest-rate">
        {interestRateFields.length > 2 && (
          <IconButton aria-label="remove" onClick={removeInterestRate}>
            <RemoveCircleIcon fontSize="large" />
          </IconButton>
        )}
        <IconButton aria-label="add" onClick={addInterestRate}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </div>
    );
  };

  const renderConditionActions = () => {
    if (onView) {
      return '';
    }
    return (
      <div className="btns-condition">
        {conditionFields.length > 1 && (
          <IconButton aria-label="remove" onClick={removeCondition}>
            <RemoveCircleIcon fontSize="large" />
          </IconButton>
        )}
        <IconButton aria-label="add" onClick={addCondition}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </div>
    );
  };

  return (
    <Paper title={`Loan: ${template.loanName}`}>
      <div className="loan-template-form">
        <Field
          name="bankName"
          label="Bank"
          disabled
          defaultValue={template.bankName}
          typeField="secondary"
          layout={{ labelCol: 2, inputCol: 10 }}
        />

        {/* Interest Rate */}
        <Grid container>
          {map(interestRateFields, (field, index) => (
            <InterestRateFields
              key={field.id}
              field={field}
              register={register}
              errors={errors}
              index={index}
              onView={onView}
            />
          ))}
          {renderInterestRateActions()}
        </Grid>
        {/* End Interest Rate */}

        {/* Condition */}
        {map(conditionFields, (field, index) => (
          <ConditionFields
            key={field.idConditionField}
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            index={index}
            clearErrors={clearErrors}
            templateConditions={templateConditions}
            onView={onView}
            field={field}
          />
        ))}
        {renderConditionActions()}
        {/* End Condition */}
      </div>

      <PaperAction>
        {map(btnWithStatus(), btn => (
          <Button
            key={btn.text}
            text={btn.text}
            onClick={btn.action}
            className="loan-template-edit-btn"
          />
        ))}
      </PaperAction>
    </Paper>
  );
}

LoanTemplateEdit.propTypes = {
  getLoanTemplates: PropTypes.func,
  template: PropTypes.instanceOf(Object),
  templateConditions: PropTypes.arrayOf(PropTypes.object),
};

LoanTemplateEdit.defaultProps = {
  getLoanTemplates: () => ({}),
  template: {},
  templateConditions: [],
};

export { LoanTemplateEdit };
