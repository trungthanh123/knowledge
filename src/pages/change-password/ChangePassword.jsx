import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';
import { authService } from '../../services/auth.service';
import { Button } from '../../components/button/Button';
import { getMess } from '../../util/message';
import { Field } from '../../components/field/Field';
import { user } from '../../util/user';

function ChangePassword(props) {
  const { register, handleSubmit, errors, watch } = useForm();
  const username = get(props, 'match.params.username', '');
  const history = get(props, 'history', {});
  const [apiError, setApiError] = useState('');

  const onSubmit = formState => {
    setApiError('');
    const payload = formState;
    delete payload.confirmNewPassword;

    authService
      .changePassword(payload)
      .then(res => {
        user.saveUserStorage(res);
        return history.push('/');
      })
      .catch(err => setApiError(err.message));
  };

  return (
    <Grid container className="login">
      <Grid container className="login-content">
        <Grid item className="login__paper">
          <h2>Require a new password</h2>
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
              inputRef={register()}
              notRightLabel
              disabled
              defaultValue={username}
            />

            <Field
              helperText={errors.password?.message}
              label="Temporary Password"
              type="password"
              name="password"
              inputRef={register({
                required: getMess('M01', 'Temporary Password'),
              })}
              notRightLabel
              inputProps={{
                autoComplete: 'new-password',
              }}
            />

            <Field
              helperText={errors.newPassword?.message}
              label="New Password"
              type="password"
              name="newPassword"
              inputRef={register({
                required: getMess('M01', 'New Password'),
              })}
              notRightLabel
            />

            <Field
              helperText={errors.confirmNewPassword?.message}
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              inputRef={register({
                required: getMess('M01', 'Confirm New Password'),
                validate: confirmNewPassword =>
                  confirmNewPassword === watch('newPassword') ||
                  'Password do not match',
              })}
              notRightLabel
            />

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button text="SUBMIT" type="submit" />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { ChangePassword };
