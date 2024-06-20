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

    case operations.SET_CURRENT_TASK:
      // action = {type:'SET_CURERNT_TASK', payload: currentTask}
      return { ...state, currentTask: action.payload };

    case operations.SET_USER_PROFILE:
      //action = {type: 'SET_USER_PROFILE', payload: userProfile}
      return { ...state, userProfile: action.payload};

    case operations.REMOVE_USER_PROFILE:
        //action = {type: 'REMOVE_USER_PROFILE'}
        return { ...state, userProfile: {}};  

    case operations.SET_AUTH_TOKEN:
        //action = {type: 'SET_AUTH_TOKEN', payload: authToken}
        localStorage.setItem(operations.AUTH_TOKEN_KEY, action.payload);
        return { ...state };  

    case operations.REMOVE_AUTH_TOKEN:
          // action = {type:'SET_CURENT_TASK'}
          localStorage.removeItem(operations.AUTH_TOKEN_KEY);
          return { ...state};

    
    case operations.IS_LOGGED_IN:
            // action = {type:'IS_LOGGED_IN'}
            return { ...state, isLoggedIn: true };

    case operations.IS_LOGGED_OUT:
            // action = {type:'IS_LOGGED_OUT'}
            return { ...state, isLoggedIn: false };      

    case operations.ADD_ALL_USERS:
           //action = {type: 'ADD_ALL_USERS', payload: [user1, user2]} 
         return { ...state, users: [...action.payload] };    
      
    case operations.UPDATE_USER:
      //action = {type: 'UPDATE_USER', payload: user}
      return { ...state, users: [action.payload,
         ...state.users.filter((user) => user.id !==action.payload.id)]};
  

    default:
      return state;
  }
};
