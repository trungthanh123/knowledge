import React from 'react';
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
import { user } from '../../../util/user';
import { getMess } from '../../../util/message';
import { ConditionFields } from '../condition-fields/ConditionFields';
import { InterestRateFields } from '../interest-rate-fields/InterestRateFields';

function LoanTemplateNew({ getLoanTemplates, templateConditions }) {
  const userInfo = user.getUserInfo();
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
      interestRate: [{ rate: '' }, { rate: '', minDays: '' }],
      condition: [{ id: '', threshold: '', value: '' }],
    },
  });

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

  const resetForm = () =>
    reset({
      loanName: '',
      condition: [{ id: '', threshold: '', value: '' }],
      interestRate: [{ rate: '' }, { rate: '', minDays: '' }],
    });

  const addLoanTemplate = form => {
    const payload = form;
    payload.bankId = userInfo.orgId;
    bankService
      .addLoanTemplate(payload)
      .then(() => {
        resetForm();
        return getLoanTemplates();
      })
      .catch(console.error);
  };

  const addInterestRate = () => {
    interestRateAppend({ rate: '', minDays: '' });
  };

  const removeInterestRate = () => {
    interestRateRemove(interestRateFields.length - 1);
  };

  const addCondition = () => {
    conditionAppend({ id: '', threshold: '', value: '' });
  };

  const removeCondition = () => {
    conditionRemove(conditionFields.length - 1);
  };

  return (
    <Paper title="New Loan Template">
      <div className="loan-template-form">
        <Field
          name="bankName"
          label="Bank"
          disabled
          defaultValue={userInfo.orgName}
          typeField="secondary"
          layout={{ labelCol: 2, inputCol: 10 }}
        />
        <Field
          typeField="secondary"
          name="loanName"
          label="Loan Name"
          inputRef={register({
            required: getMess('M01', 'Loan Name'),
          })}
          required
          helperText={errors.loanName?.message}
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
            />
          ))}
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
          />
        ))}
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
        {/* End Condition */}
      </div>

      <PaperAction>
        <Button text="Add Template" onClick={handleSubmit(addLoanTemplate)} />
      </PaperAction>
    </Paper>
  );
}

LoanTemplateNew.propTypes = {
  getLoanTemplates: PropTypes.func,
  templateConditions: PropTypes.arrayOf(PropTypes.object),
};

LoanTemplateNew.defaultProps = {
  getLoanTemplates: () => ({}),
  templateConditions: [],
};

export { LoanTemplateNew };
