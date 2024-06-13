import * as operations from "./types";

export const reducer = (state, action) => {
  switch (action.type) {
    case operations.ADD_TASK:
      // action = {type:'ADD_TASK', payload: new_task}
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case operations.ADD_ALL_TASKS:
      // action = {type: 'ADD_ALL_TASKS', payload: [task1, task2]} task1 and 2 are objects
      return { ...state, tasks: [...action.payload] };

    case operations.DELETE_TASK:
      // action = {type:'DELETE_TASK', payload: 'deleted_task_id'}
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case operations.DELETE_ALL_TASKS:
      // action = {type:'DELETE_ALL_TASKS'}
      return { ...state, tasks: [] };

    case operations.UPDATE_TASK:
      // action = {type:'UPDATE_TASK', payload: task}
      return {
        ...state,
        tasks: [
          action.payload,
          ...state.tasks.filter((task) => task.id !== action.payload.id),
        ],
      }; //question

    case operations.TOGGLE_COMPLETE_TASK:
      // action = {type:'TOGGLE_COMPLETE_TASK', payload: task_id}
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            task = { ...task, status: !task.status };
          }
          return task;
        }),
      };

    case operations.TOGGLE_TASK_REMINDER:
      // action = {type:'TOGGLE_TASK_REMINDER', payload: task_id}
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            task = { ...task, reminder: !task.reminder };
          }
          return task;
        }),
      };

    case operations.TOGGLE_FORM:
      // action = {type:'TOGGLE_FORM'}
      return { ...state, showForm: !state.showForm };

    case operations.TOGGLE_LOADING:
      // action = {type:'TOGGLE_LOADING'}
      return { ...state, isloading: !state.isloading };

    case operations.SHOW_FORM:
      // action = {type:'SHOW_FORM'}
      return { ...state, showForm: true };

    case operations.HIDE_FORM:
      return { ...state, showForm: false };

    case operations.SET_ERROR:
      // action = {type:'SET_ERROR', payload: 'message'}
      return { ...state, errMsg: action.payload };

    case operations.SET_CURENT_TASK:
      // action = {type:'SET_CURENT_TASK', payload: currentTask}
      return { ...state, currentTask: action.payload };

    default:
      return state;
  }
};
