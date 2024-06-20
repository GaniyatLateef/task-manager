import { useEffect, useContext } from "react";
import Header from "./Header";
import TaskForm from "./TaskForm";
import { getAllTasks, getUserProfile } from "../api/service";
import Tasks from "./Tasks";

import {
  ADD_ALL_TASKS,
  SET_ERROR,
  TOGGLE_LOADING,
  IS_LOGGED_IN,
  SET_USER_PROFILE,
} from "../context/types";
import { useNavigate } from "react-router-dom";
import TaskContext from "../context/store";

const Home = () => {
  const { state, dispatch } = useContext(TaskContext);
  const { isLoading, showForm, errMsg, isLoggedIn } = state;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLoggedIn) {
        try {
          const ProfileRes = await getUserProfile();
          dispatch({ type: SET_USER_PROFILE, payload: ProfileRes.data });
          dispatch({ type: IS_LOGGED_IN });
        } catch (err) {
          navigate("/", {replace: true });
        }
      }
    }

    fetchUserProfile();

    dispatch({ type: TOGGLE_LOADING });

    getAllTasks()
      .then((res) => {
        dispatch({ type: IS_LOGGED_IN });
        dispatch({ type: ADD_ALL_TASKS, payload: res.data });
      })
      .catch((err) => {
        const authError = [401, 403];
        if (authError.includes(err.response.status)) {
          navigate("/login", { replace: true });
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
  }, [dispatch, navigate, isLoggedIn]);

  return (
    <div>
      <Header comp= "tasks"/>

      {!isLoading && isLoggedIn && (
        <>
          {showForm && <TaskForm />}
          {errMsg && <p> Unable to fetch tasks {errMsg}</p>}
          {!showForm && <Tasks />}
        </>
      )}
      {isLoading && <p>Fetching tasks...</p>}
    </div>
  );
};

export default Home;
