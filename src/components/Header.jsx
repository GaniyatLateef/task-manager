import { useContext } from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import { TOGGLE_FORM } from "../context/types";
import {Link} from "react-router-dom";
import TaskContext from "../context/store";

const Header = ({comp}) => {
  const {
    state: { showForm, userProfile },
    dispatch,
  } = useContext(TaskContext);

  return (
    <header className="header">
      {userProfile?.name && (
        <>
           <p>
             Welcome, {userProfile?.name} <br />
             { comp === "tasks" && userProfile.roles.includes("ROLE_ADMIN")
               && <Link to="/dashboard/users"> Users</Link>
             }
             { comp === "users" && <Link to="/dashboard/tasks">Tasks</Link>} {" "}
             &nbsp; | <Link to="/login">Logout</Link>
           </p>
           { comp === "tasks" && (
              <Button
              label={
                showForm ? (
                   "Show Tasks"
                ) : (
                  <>
                     <FaPlus /> Add Task
                  </>
                )
              }
              onClick={() => dispatch({ type: TOGGLE_FORM })}
            />
           )}           
          </>
       )}
     </header>
  );
};

export default Header;
