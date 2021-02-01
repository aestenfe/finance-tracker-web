import { func, instanceOf } from "prop-types";
import React from "react";

const AccountTable = ({
  data, onDelete, onEdit,
}) => (
  <table>
    <thead>
      <tr>
        <th>Account Name</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td><button type="button" onClick={() => onEdit(row.id)}>Edit</button></td>
          <td><button type="button" onClick={() => onDelete(row.id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
);

AccountTable.propTypes = {
  data: instanceOf(Array),
  onDelete: func.isRequired,
  onEdit: func,
};

AccountTable.defaultProps = {
  data: [],
  onEdit: null,
};

export default AccountTable;
