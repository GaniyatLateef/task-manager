import React from "react";
import { Link } from "react-router-dom";
import { registerApiService } from "../../api/service";
import { FaCheckCircle } from "react-icons/fa";

const Register = () => {
  const [formValues, setFormValues] = React.useState({
    username: "",
    password: "",
    password2: "",
    name: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    username: false,
    password: false,
    password2: false,
    name: false,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({
      ...formErrors,
      username: !formValues.username,
      password: !formValues.password,
      name: !formValues.name,
      password2:
        !formValues.password2 || formValues.password != formValues.password2,
    });

    if (
      !formValues.username ||
      !formValues.password ||
      !formValues.name ||
      !formValues.password2 ||
      formValues.password != formValues.password2
    ) {
      return;
    }

    setIsLoading(true);

    try {
      await registerApiService(formValues);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setErrorMessage(
        err.response?.data?.message || err.request?.message || err.message
      );
    }

    //setIsLoading(false);
  };

  return (
    <div className="login-form">
      {success && (
        <div className="reg-success">
          <h3>
            <FaCheckCircle /> Success
          </h3>
          <p>
            You have been successfully registered. Please click the button below
            to login.
          </p>
          <Link to="/login">
            <button className="btn btn-block">Proceed to Login</button>
          </Link>
        </div>
      )}
      {!success && (
        <>
          <form className="form-block" onSubmit={handleSubmit}>
            <h5 className="form-title">
              Please register to access
            </h5>
            {errorMessage && <p className="form-error">{errorMessage}</p>}
            <div className="form-control">
              <label>Name</label>
              <input
                className={`${formErrors.name && "error"}`}
                type="text"
                placeholder="Enter your name"
                disabled={isLoading}
                value={formValues.name}
                onChange={(e) => {
                  setFormValues({ ...formValues, name: e.target.value });
                }}
              />
              {formErrors.name && (
                <span className="error-field">Please enter your name</span>
              )}
            </div>
            <div className="form-control">
              <label>Username</label>
              <input
                className={`${formErrors.username && "error"}`}
                type="text"
                placeholder="Enter your username"
                disabled={isLoading}
                value={formValues.username}
                onChange={(e) => {
                  setFormValues({ ...formValues, username: e.target.value });
                }}
              />
              {formErrors.username && (
                <span className="error-field">Please enter a username</span>
              )}
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                className={`${formErrors.password && "error"}`}
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                value={formValues.password}
                onChange={(e) => {
                  setFormValues({ ...formValues, password: e.target.value });
                }}
              />
              {formErrors.password && (
                <span className="error-field">Please enter a password</span>
              )}
            </div>
            <div className="form-control">
              <label>Confirm Password</label>
              <input
                className={`${formErrors.password2 && "error"}`}
                type="password"
                placeholder="Confirm your password"
                disabled={isLoading}
                value={formValues.password2}
                onChange={(e) => {
                  setFormValues({ ...formValues, password2: e.target.value });
                }}
              />
              {formErrors.password2 && (
                <span className="error-field">Password not same or empty</span>
              )}
            </div>
            <div>
              <input
                type="submit"
                value={`Register ${isLoading ? "..." : ""}`}
                className={`btn btn-block ${isLoading && "loading"}`}
                disabled={isLoading}
              />
            </div>
          </form>

          <p className="no-account">
            Already have an account? &nbsp;
            <Link to="/login">Login</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Register;
