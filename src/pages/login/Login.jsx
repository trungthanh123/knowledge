import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Button } from '../../components/button/Button';
import { getMess } from '../../util/message';
import { patternEmail } from '../../util/form';
import { Field } from '../../components/field/Field';
import { user } from '../../util/user';
import './login.scss';

function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = get(props, 'history', {});
  const stateHistory = history.location.state || {};

  const [apiError, setApiError] = useState(
    stateHistory.expired ? getMess('M15') : ''
  );

  const onSubmit = formState => {
    setApiError('');

    authService
      .login(formState)
      .then(res => {
        user.saveUserStorage(res);
        return history.push(stateHistory.prePath || '/');
      })
      .catch(err => {
        const requiredNewPassCode = 401;

        if (err.code === requiredNewPassCode) {
          return history.push(`/change-password/${formState.username}`);
        }

        return setApiError(err.message);
      });
  };

  return (
    <Grid container className="login">
      <Grid container className="login-content">
        <Grid item className="login__paper">
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

            <Field
              helperText={errors.password?.message}
              label="Password"
              type="password"
              name="password"
              inputRef={register({
                required: getMess('M01', 'Password'),
              })}
              notRightLabel
            />
            <Link className="forgot-password-link" to="/forgot-password">
              <p>Forgot password?</p>
            </Link>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button text="LOG IN" type="submit" />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { Login };
