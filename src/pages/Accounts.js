import React, { useEffect, useState } from "react";
import AccountEdit from "../components/accounts/AccountEdit";
import AccountsTable from "../components/accounts/AccountsTable";

const Accounts = () => {
  const [data, setData] = useState([]);
  const [uiStatus, setUiStatus] = useState("overview");
  const [form, setForm] = useState({
    id: null,
    name: "",
  });

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts`);
      const accounts = await response.json();
      setData(accounts);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          apiKey: process.env.REACT_APP_API_KEY,
        },
        method: "delete",
      });
      if (response.status === 200) {
        fetchAccounts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addAccount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          apiKey: process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify(form),
        method: "post",
      });
      if (response.status === 201) {
        fetchAccounts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateAccount = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          apiKey: process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({ name: form.name }),
        method: "put",
      });
      if (response.status === 200) {
        fetchAccounts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const clearForm = () => {
    setForm({
      ...form,
      id: null,
      name: "",
    });
  };

  const handleDelete = (id) => {
    deleteAccount(id);
  };

  const handleClickNew = () => {
    setUiStatus("new");
  };

  const handleClickEdit = (id) => {
    const value = data.find((row) => row.id === id);
    setForm({
      ...form,
      id,
      name: value.name,
    });
    setUiStatus("edit");
  };

  const handleClickCancel = () => {
    clearForm();
    setUiStatus("overview");
  };

  const handleClickSubmit = () => {
    if (uiStatus === "new") {
      addAccount(form.name);
    } else {
      updateAccount(form.id);
    }
    clearForm();
    setUiStatus("overview");
  };

  const handleValueChange = ({ target: { value } }) => {
    setForm({
      ...form,
      name: value,
    });
  };

  return (
    <div className="container">
      <h1>Accounts</h1>
      <button type="button" onClick={handleClickNew}>New Account</button>
      {uiStatus === "overview" ? <AccountsTable data={data} onDelete={handleDelete} onEdit={handleClickEdit} /> : null}
      {uiStatus === "new" ? <AccountEdit value={form.name} onChange={handleValueChange} onClickSubmit={handleClickSubmit} onClickCancel={handleClickCancel} /> : null}
      {uiStatus === "edit" ? <AccountEdit value={form.name} onChange={handleValueChange} onClickSubmit={handleClickSubmit} onClickCancel={handleClickCancel} /> : null}
    </div>
  );
};

export default Accounts;
