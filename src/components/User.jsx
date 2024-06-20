import React from 'react'
import { toggleUserAccess, toggleUserAdmin } from "../api/service";
import { UPDATE_USER } from '../context/types';
import { FaUserCircle, FaUserCog } from 'react-icons/fa';
import TaskContext from '../context/store';

const User = ({user}) => {
    const { dispatch } = React.useContext(TaskContext);

    const hasAccess = user?.roles?.includes("ROLE_ACCESS");
    const hasAdmin = user?.roles?.includes("ROLE_ADMIN");

    const toggleAccess = async (userId) => {
        try {
            const res = await toggleUserAccess(userId);
            dispatch({ type: UPDATE_USER, payload: res.data });
          } catch (err) {}
        };
      
        const toggleAdmin = async (userId) => {
          try {
            const res = await toggleUserAdmin(userId);
            dispatch({ type: UPDATE_USER, payload: res.data });
          } catch (err) {}
        };

  return (
    <div className={`user ${hasAdmin && "admin"}`}>
    <span>
      <p>
        <b>{user.name}</b>
      </p>
      <p>
        <i>{user.username}</i>
      </p>
    </span>
    <span className="actions">
      <FaUserCircle
        className={`icon ${hasAccess && "enabled"}`}
        title="Access User"
        onClick={() => toggleAccess(user.id)}
      />
      <FaUserCog
        className={`icon ${hasAdmin && "enabled"}`}
        title="Admin User"
        onClick={() => toggleAdmin(user.id)}
      />
    </span>
  </div>
);
};

export default User