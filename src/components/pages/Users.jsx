import React from "react";
import TaskContext from "../../context/store";
import { getAllUsers, getUserProfile } from "../../api/service";
import { useNavigate } from "react-router-dom";
import {
  ADD_ALL_USERS,
  IS_LOGGED_IN,
  SET_ERROR,
  SET_USER_PROFILE,
  TOGGLE_LOADING,
} from "../../context/types";
import Header from "../Header";
import User from "../User";

const Users = () => {
  const { state, dispatch } = React.useContext(TaskContext);
  const { isLoading, errMsg, isLoggedIn, userProfile, users } = state;
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLoggedIn) {
        try {
          const profileRes = await getUserProfile();
          dispatch({ type: SET_USER_PROFILE, payload: profileRes.data });
          dispatch({ type: IS_LOGGED_IN });
        } catch (err) {
          navigate("/", { replace: true });
        }
      }else {
        if (!userProfile?.roles?.includes("ROLE_ADMIN")) {
          navigate("/", {replace: true});
        }
      }
    };

    fetchUserProfile();

    dispatch({ type: TOGGLE_LOADING });
    getAllUsers()
      .then((res) =>  {
        dispatch({ type: ADD_ALL_USERS, payload: res.data });
    })
    .catch((err) => {
      const authError = [401, 403];
      if (authError.includes(err.response.status)) {
        navigate("/", { replace: true });
      } else {
        dispatch({
          type: SET_ERROR,
          payload:
            err.response?.data?.message ||
            err.request?.message ||
            err.message,
        });
      }
    })
    .finally(() => dispatch({ type: TOGGLE_LOADING }));
  }, []);

  return (
    <div className="users-panel">
      <Header comp="users" />
      <p>List of Users</p>
      {isLoading && <p>Fetching all users</p>}
      {errMsg && <p>{errMsg}</p>}

      <div className="users-card">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
