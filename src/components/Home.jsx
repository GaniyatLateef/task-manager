import { useEffect, useContext } from "react";
import Header from "./Header";
import TaskForm from "./TaskForm";
import { getAllTasks } from "../api/service";
import Tasks from "./Tasks";
import TaskContext from "../context/Store";
import { ADD_ALL_TASKS, SET_ERROR, TOGGLE_LOADING } from "../context/types";

const Home = () => {
  const { state, dispatch } = useContext(TaskContext);
  const { isLoading, showForm, errMsg } = state;

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });

    getAllTasks()
      .then((res) => dispatch({ type: ADD_ALL_TASKS, payload: res.data }))
      .catch((err) =>
        dispatch({
          type: SET_ERROR,
          payload:
            err.response?.data?.message || err.request?.message || err.message,
        })
      )
      .finally(() => dispatch({ type: TOGGLE_LOADING }));
  }, [dispatch]);

  return (
    <div>
      <Header title="Guest" />

      {!isLoading && (
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
