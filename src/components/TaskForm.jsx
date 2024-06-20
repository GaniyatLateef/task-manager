import React from "react";
import { getTaskById, postTask, updateTask } from "../api/service";
import {
  ADD_TASK,
  HIDE_FORM,
  SET_CURRENT_TASK,
  SET_ERROR,
  TOGGLE_LOADING,
  UPDATE_TASK,
} from "../context/types";
import TaskContext from "../context/store";

const TaskForm = () => {
  const { state, dispatch } = React.useContext(TaskContext);
  const { currentTask, isLoading, errMsg } = state;

  const defaultValues = {
    title: currentTask.title || "",
    description: currentTask.description || "",
    taskDay: currentTask.taskDay || "",
    reminder: currentTask.reminder || false,
  };

  const [formValues, setFormValues] = React.useState(defaultValues);
  const [fieldError, setFieldError] = React.useState({
    title: false,
    taskDay: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldError({
      ...fieldError,
      title: !formValues.title,
      taskDay: !formValues.taskDay,
    });

    if (!formValues.title || !formValues.taskDay) {
      return;
    }

    dispatch({ type: TOGGLE_LOADING });

    try {
      if (!currentTask.id) {
        const res = await postTask(formValues);
        setFormValues(defaultValues);

        const newLocation = res.headers.location;
        if (newLocation) {
          const index = newLocation.lastIndexOf("/");
          const taskId = newLocation.substring(index + 1);

          const createdTask = await getTaskById(taskId);

          dispatch({ type: ADD_TASK, payload: createdTask.data });
          dispatch({ type: HIDE_FORM });
        }
      } else {
        const taskId = currentTask.id;
        const res = await updateTask({ ...formValues, id: taskId });

        dispatch({ type: SET_CURRENT_TASK, payload: {} });
        dispatch({ type: UPDATE_TASK, payload: res.data });
        dispatch({ type: HIDE_FORM });
      }
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response?.data?.message || err.message,
      });
    }

    dispatch({ type: TOGGLE_LOADING });
  };

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
        <br />
        <div className="form-control">
          <label>Task*</label>
          <input
            style={{ borderColor: fieldError.title && "red" }}
            type="text"
            placeholder="Add task title"
            disabled={isLoading}
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
          {fieldError.title && (
            <span style={{ color: "red" }}>Please add a task title</span>
          )}
        </div>
        <div className="form-control">
          <label>Description</label>
          <input
            type="text"
            placeholder="Add task description"
            disabled={isLoading}
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label> Task Day &amp; Time*</label>
          <input
            style={{ borderColor: fieldError.taskDay && "red" }}
            type="text"
            placeholder="Add Day &amp; Time"
            value={formValues.taskDay}
            disabled={isLoading}
            onChange={(e) =>
              setFormValues({ ...formValues, taskDay: e.target.value })
            }
          />

          {fieldError.taskDay && (
            <span style={{ color: "red" }}>Please add a date and time</span>
          )}
        </div>
        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input
            type="checkbox"
            checked={formValues.reminder}
            disabled={isLoading}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                reminder: e.currentTarget.checked,
              })
            }
          />
        </div>
        <input
          className="btn btn-block"
          type="submit"
          value={`${
            isLoading
              ? "saving Task..."
              : currentTask.id
              ? "update Task"
              : "Save Task"
          }`}
        />
      </form>
    </div>
  );
};

export default TaskForm;
