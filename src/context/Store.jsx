import React from "react";
import { reducer } from "./reducer";

const initialState = {
    tasks: [],
    users: [],
    showForm: false,
    isLoading: false,
    errMsg: null,
    currentTask: {},
    userProfile: {},
    isLoggedIn: false,
};

const TaskContext = React.createContext();

export const TaskProvider = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const store = { state, dispatch };

    return (
        <TaskContext.Provider value={store}>{props.children}</TaskContext.Provider>
    );
}

export default TaskContext;