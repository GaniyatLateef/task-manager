import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8080/api/v1";


export const postTask = (taskDetails) => {
    return axios.post(`${SERVER_BASE_URL}/tasks`, taskDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  export const updateTask = (taskDetails) => {
    return axios.put(`${SERVER_BASE_URL}/tasks/${taskDetails.id}`,taskDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  export const getAllTasks =() => {
    return axios.get(`${SERVER_BASE_URL}/tasks`, {
      headers: {
        Accept: "application/json",
        App: "My galatex app"
      }
    });
  };

  export const getTaskById = (taskId) => {
    return axios.get(`${SERVER_BASE_URL}/tasks/${taskId}`, {
      headers: {}
    });
  }

  export const deleteTaskById = (taskId) => {
   return axios.delete (`${SERVER_BASE_URL}/tasks/${taskId}`)
  }
  export const completeTaskById = (taskId) => axios.patch(`${SERVER_BASE_URL}/tasks/status/${taskId}`);

  export const taskReminderById = (taskId) => {
    return axios.patch(`${SERVER_BASE_URL}/tasks/reminder/${taskId}`)
  }