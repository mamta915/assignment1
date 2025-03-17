import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  //  Updated: Fetch todos
  useEffect(() => {
    axios
      .get("https://todoapp.free.beeceptor.com/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  //  Updated: Add a new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoData = {
      id: Date.now(), // Beeceptor doesn't auto-generate id
      todo: newTodo,
      completed:false,
    };

    axios
      .post("https://todoapp.free.beeceptor.com/todos", newTodoData)
      .then(() => {
        setTodos([...todos, newTodoData]); // Update local list
        setNewTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // Updated: Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`https://todoapp.free.beeceptor.com/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  // Updated: Toggle complete (PUT request)
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    const updatedTodo = updatedTodos.find((todo) => todo.id === id);

    axios
      .put(`https://todoapp.free.beeceptor.com/todos/${id}`, updatedTodo)
      .then(() => setTodos(updatedTodos))
      .catch((error) => console.error("Error updating todo:", error));
  };

  return (
    <div className=" mx-auto p-6 bg-gray-100 rounded-lg mt-10 mb-250 w-[1250px]">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>

      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 bg-white rounded-md shadow-md mt-2"
          >
            <span
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.todo}
            </span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
