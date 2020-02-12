import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { alerts, setAlert, removeAlert } = alertContext;
  const { register, error } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

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
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else if (error !== null) {
      // setAlert(`${error}`, "danger");
      console.log(error);
    } else {
      setAlert("Registering...", "success");
      register({ name, email, password });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name
            <input type="text" name="name" value={name} onChange={onChange} required />
          </label>
        </div>
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
        <div className="form-group">
          <label htmlFor="password2">
            Confirm Password
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
            />
          </label>
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Register;
