import axios from "axios";
import { AUTH_TOKEN_KEY } from "../context/types";

const SERVER_BASE_URL = "http://localhost:9090/api/v1";


export const postTask = (taskDetails) => {
    return axios.post(`${SERVER_BASE_URL}/tasks`, taskDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  };

  export const updateTask = (taskDetails) => {
    return axios.put(`${SERVER_BASE_URL}/tasks/${taskDetails.id}`,taskDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  };

  export const getAllTasks =() => {

    return axios.get(`${SERVER_BASE_URL}/tasks`, {
      headers: {
        Accept: "application/json",
        App: "My galatex app",
        Authorization: getAuthorizationHeader(),
      }
    });
  };

  export const getTaskById = (taskId) => {
    return axios.get(`${SERVER_BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: getAuthorizationHeader(),
      }
    });
  }

  export const deleteTaskById = (taskId) => {
   return axios.delete (`${SERVER_BASE_URL}/tasks/${taskId}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    }
   })
  }
  export const completeTaskById = (taskId) => axios.patch(`${SERVER_BASE_URL}/tasks/status/${taskId}`, {
   headers: {
    Authorization: getAuthorizationHeader(),
   } 
  });

  export const taskReminderById = (taskId) => {
    return axios.patch(`${SERVER_BASE_URL}/tasks/reminder/${taskId}`, {
      headers: {
        Authorization: getAuthorizationHeader(),
      }
    })
  }

  export const getUserProfile = () => {

    const authToken = getAuthorizationHeader();

    if (authToken) {
      return axios.get(`${SERVER_BASE_URL}/users/profile`, {
        headers: {
          Accept: "application/json",
          Authorization: authToken,
        }
      });
    } else {
      return Promise.reject("Not authenticated");
    }
  }

  export const loginApiService = (userDetails) => {
    return axios.post(`${SERVER_BASE_URL}/users/auth/login`, userDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  };

  export const registerApiService = (userDetails) => {
    return axios.post(`${SERVER_BASE_URL}/users/auth/register`, userDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  export const toggleUserAccess = (userId) => {
    return axios.patch(`${SERVER_BASE_URL}/users/toggle/access/${userId}`, null, {
    headers: {
      Authorization: getAuthorizationHeader(),
    }
  });
};

  export const toggleUserAdmin = (userId) => {
    return axios.patch(`${SERVER_BASE_URL}/users/toggle/admin/${userId}`, null, {
      headers: {
        Authorization: getAuthorizationHeader(),
      }
    })
  };

  export const getAllUsers = () => {
    
    return axios.get(`${SERVER_BASE_URL}/users`, {
      headers: {
        Accept: "application/json",
        Authorization: getAuthorizationHeader(),
      }
    });
  };

  export const getAuthorizationHeader = () => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (authToken) {
      const authKeys = JSON.parse(authToken);

      return `${authKeys.token_type} ${authKeys.access_token}`;
    }  

    return "";
  }