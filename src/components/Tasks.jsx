import { useContext } from "react";
import Task from "./Task";
import TaskContext from "../context/store";


const Tasks = () => {
  const {
    state: { tasks },
  } = useContext(TaskContext);

  return (
    <div>
      {!tasks.length && <p> No task available</p>}
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
