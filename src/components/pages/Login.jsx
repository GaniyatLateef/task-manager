import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, loginApiService } from "../../api/service";
import {
  DELETE_ALL_TASKS,
  IS_LOGGED_IN,
  IS_LOGGED_OUT,
  REMOVE_AUTH_TOKEN,
  REMOVE_USER_PROFILE,
  SET_AUTH_TOKEN,
  SET_USER_PROFILE,
} from "../../context/types";
import TaskContext from "../../context/store";

const Login = () => {
  const { dispatch } = React.useContext(TaskContext);
  const navigate = useNavigate();

  const [formValues, setFormValues] = React.useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    username: false,
    password: false,
  });

  const [isLoading, setIsloading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    dispatch({ type: REMOVE_AUTH_TOKEN });
    dispatch({ type: IS_LOGGED_OUT });
    dispatch({ type: REMOVE_USER_PROFILE });
    dispatch({ type: DELETE_ALL_TASKS });
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({
      ...formErrors,
      username: !formValues.username,
      password: !formValues.password,
    });

    if (!formValues.username || !formValues.password) {
      return;
    }

    setIsloading(true);

    try {
      const response = await loginApiService(formValues);
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: JSON.stringify(response.data),
      });
     
      dispatch({ type: IS_LOGGED_IN });

      const profileRes = await getUserProfile(`${response.data.token_type} ${response.data.access_token}`);
      dispatch({type: SET_USER_PROFILE, payload: profileRes.data });
      navigate("dashboard/tasks", { replace: true });
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.request?.message || err.message
      );
    }

    setIsloading(false);
  };

  return (
    <div className="login-form">
      <form className="form-block" onSubmit={handleSubmit}>  
        <h5 className="form-title">Please login to continue</h5>
        {errorMessage && <p className="form-error">{errorMessage}</p>}
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
        <div>
          <input
            type="submit"
            value={`Login ${isLoading ? "..." : ""}`}
            className={`btn btn-block ${isLoading && "loading"}`}
            disabled={isLoading}
          />
        </div>
      </form>

      <p className="no-account">
        Don&apos;t have account? &nbsp;
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
