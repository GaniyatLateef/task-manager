import { useContext } from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import TaskContext from "../context/Store";
import { TOGGLE_FORM } from "../context/types";

const Header = ({ title }) => {
  const {
    state: { showForm },
    dispatch,
  } = useContext(TaskContext);

  return (
    <header className="header">
      <p>Welcome, {title}</p>
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
    </header>
  );
};

export default Header;
