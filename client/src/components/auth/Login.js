import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Login = () => {
  const alertContext = useContext(AlertContext);

  const { alerts, setAlert, removeAlert } = alertContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (alerts.length > 0) {
      alerts.map(alert => {
        return removeAlert(alert.id);
      });
    }

    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      console.log("Login submit");
      setAlert("Login...", "success");
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input type="email" name="email" value={email} onChange={onChange} required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </label>
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Login;
