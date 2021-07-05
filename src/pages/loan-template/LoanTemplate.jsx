import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import map from 'lodash/map';
import { bankService } from '../../services/bank.service';
import { LoanTemplateNew } from './loan-template-new/LoanTemplateNew';
import { LoanTemplateEdit } from './loan-template-edit/LoanTemplateEdit';
import './loan-template.scss';

function LoanTemplate() {
  const [loanTemplates, setLoanTemplates] = useState([]);
  const [templateConditions, setTemplateConditions] = useState([]);

  const getLoanTemplates = () => {
    bankService
      .getLoanTemplates()
      .then(res => setLoanTemplates(res))
      .catch(console.error);
  };

  const getLoanTemplateConditions = () => {
    bankService
      .getLoanTemplateConditions()
      .then(res => setTemplateConditions(res))
      .catch(console.error);
  };

  useEffect(() => {
    getLoanTemplateConditions();
    getLoanTemplates();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="loan-template"
    >
      <Grid item xs={7} className="loan-template-content">
        <LoanTemplateNew
          getLoanTemplates={getLoanTemplates}
          templateConditions={templateConditions}
        />

        {templateConditions.length &&
          map(loanTemplates, template => (
            <div className="loan-template-edit" key={template.id}>
              <LoanTemplateEdit
                template={template}
                getLoanTemplates={getLoanTemplates}
                templateConditions={templateConditions}
              />
            </div>
          ))}
      </Grid>
    </Grid>
  );
}

LoanTemplate.propTypes = {};

LoanTemplate.defaultProps = {};

export { LoanTemplate };
