import { func, string } from "prop-types";
import React from "react";

const AccountEdit = ({
  value, onChange, onClickSubmit, onClickCancel,
}) => (
  <div>
    <label htmlFor="inputName">
      Name
      <input type="text" id="inputName" name="name" value={value} placeholder="Account name" onChange={onChange} />
    </label>
    <button type="button" className="accent-button" onClick={onClickSubmit}>Save</button>
    <button type="button" onClick={onClickCancel}>Cancel</button>
  </div>
);

AccountEdit.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  onClickSubmit: func.isRequired,
  onClickCancel: func.isRequired,
};

export default AccountEdit;
