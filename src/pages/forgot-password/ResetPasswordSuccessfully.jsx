import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';

function ResetPasswordSuccessfully() {
  return (
    <Grid container className="login">
      <Grid container className="login-content">
        <Grid item className="login__paper">
          <h2>Change of Password.</h2>
          <p>Password has been updated.</p>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Link className="forgot-password-link" to="/login">
              <div>Back to login</div>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { ResetPasswordSuccessfully };
