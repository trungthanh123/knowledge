import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import './table.scss';

function Table({ title, ...rest }) {
  return (
    <div className="table-custom">
      <div className="table-title">{title}</div>
      <MaterialTable
        options={{
          toolbar: false,
          draggable: false,
          padding: 'dense',
          rowStyle: { whiteSpace: 'nowrap' },
          maxBodyHeight: 220,
          minBodyHeight: 220,
          pageSizeOptions: [5],
          headerStyle: {
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        {...rest}
      />
    </div>
  );
}

Table.propTypes = {
  title: PropTypes.string,
};

Table.defaultProps = {
  title: '',
};

export { Table };
