import React from "react";
import {
  FaList,
  FaTrash,
  FaCaretUp,
  FaCaretDown,
  FaClock,
  FaBell,
} from "react-icons/fa";
import {
  deleteTaskById,
  completeTaskById,
  taskReminderById,
  getTaskById,
} from "../api/service";
import { FaPencil } from "react-icons/fa6";

import {
  DELETE_TASK,
  SET_CURRENT_TASK,
  SET_ERROR,
  SHOW_FORM,
  TOGGLE_TASK_REMINDER,
  UPDATE_TASK,
} from "../context/types";
import TaskContext from "../context/store";

const Task = ({ task }) => {
  const { dispatch } = React.useContext(TaskContext);

  const [more, setMore] = React.useState(false);

  const showMoreDetails = () => {
    setMore(!more);
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      dispatch({ type: DELETE_TASK, payload: taskId });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload:
          err.response?.data?.message || err.request?.message || err.message,
      });
    }
  };

  const editTask = async (task) => {
    dispatch({ type: SET_CURRENT_TASK, payload: task });
    dispatch({ type: SHOW_FORM });
  };

  const taskReminder = async (taskId) => {
    try {
      await taskReminderById(taskId);
      dispatch({ type: TOGGLE_TASK_REMINDER, payload: taskId });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload:
          err.response?.data?.message || err.request?.message || err.message,
      });
    }
  };

  const completeTask = async (taskId) => {
    try {
      await completeTaskById(taskId);
      //({type: TOGGLE_COMPLETE_TASK, payload: taskId});
      const res = await getTaskById(taskId);
      dispatch({ type: UPDATE_TASK, payload: res.data });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload:
          err.response?.data?.message || err.request?.message || err.message,
      });
    }
  };

  return (
    <div
      className={`task ${task.status && "remind"}`}
      
    >
      <div className="header">
        <span className="title">
          <FaList onDoubleClick={() => completeTask(task.id)} />
          <h4> {task.title}</h4>
        </span>
        <span className="actions">
          <FaPencil
            color="blue"
            cursor="pointer"
            onClick={() => editTask(task)}
          />
          <FaTrash
            color="darkred"
            cursor="pointer"
            onClick={() => deleteTask(task.id)}
          />
        </span>
      </div>
      <p className="task-desc">
        {more ? task.description : task.description.substring(0, 100) + "..."}
      </p>
      <span className="show-more" onClick={showMoreDetails}>
        <p>{more ? "Hide details" : "more details"}</p>
        {more ? <FaCaretUp size="24" /> : <FaCaretDown size="24" />}
      </span>
      {more && (
        <>
          <hr />
          <span className="reminder">
            <p className="task-day">
              <FaClock color="purple" /> {task.taskDay}
            </p>
            <FaBell
              color={`${task.reminder ? "darkgreen" : "lightgray"}`}
              onClick={() => taskReminder(task.id)}
            />
          </span>
        </>
      )}
    </div>
  );
};

export default Task;
