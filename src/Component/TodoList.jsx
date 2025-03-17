import { useState } from "react";
import './TodoList.css'

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Add or Update Task
  const addOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (isEditing) {
      // Update existing task
      const updatedTasks = tasks.map((t, i) =>
        i === editIndex ? task : t
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }

    setTask(""); // Clear input field
  };

  // Start editing a task
  const editTask = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Delete task
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    // If deleting the task that's currently being edited
    if (isEditing && index === editIndex) {
      setIsEditing(false);
      setTask("");
    }
  };

  return (
    <div>
      
    <div className="container">
    <h4 className="heading">Todo List</h4> 
      <input
        type="text"
        className="input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />&nbsp;&nbsp;
      <button onClick={addOrUpdateTask}>
        {isEditing ? "Update" : "Add"}
      </button>

      <ul>
        {tasks.map((t, index) => (
          <li
          className="lists"
            key={index}
            >
            <span>{t}</span>
            <div className="btns">
              <button className="update-btn" onClick={() => editTask(index)}>✏️</button>&nbsp;&nbsp;
              <button  onClick={() => removeTask(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default TaskList;
