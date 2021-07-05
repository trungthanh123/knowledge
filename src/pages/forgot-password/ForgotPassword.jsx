import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Button } from '../../components/button/Button';
import { getMess } from '../../util/message';
import { Field } from '../../components/field/Field';
import { patternEmail } from '../../util/form';

function ForgotPassword(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = get(props, 'history', {});
  const [apiError, setApiError] = useState('');

  const onSubmit = formState => {
    setApiError('');

    authService
      .forgotPassword(formState)
      .then(() =>
        history.push(`/forgot-password/reset-password/${formState.username}`)
      )
      .catch(err => setApiError(err.message));
  };

  return (
    <Grid container className="login">
      <Grid container className="login-content">
        <Grid item className="login__paper">
          <h2>Reset your password.</h2>
          <p>You will receive a verification code to reset your password.</p>
          <form
            className="login__form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="error-text">{apiError}</p>

            <Field
              helperText={errors.username?.message}
              required
              label="User Email"
              name="username"
              inputRef={register({
                required: getMess('M01', 'Email'),
                pattern: {
                  value: patternEmail,
                  message: getMess('M05'),
                },
              })}
              notRightLabel
            />

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Link className="forgot-password-link" to="/login">
                <div>Back to login</div>
              </Link>
              <Button text="SUBMIT" type="submit" />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { ForgotPassword };
