import { useState } from "react";
import "./TodoList.css"; // Import the CSS file

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask(""); // Clear input
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h2 className="heading">To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <button className="delete-btn" onClick={() => handleDeleteTask(index)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}