import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Board() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), task: newTask, isCompleted: false }]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.task);
  };

  const editTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? { ...task, task: newTask } : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setNewTask('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Your Task List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:border-blue-400"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {isEditing ? (
          <button
            onClick={editTask}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Update Task
          </button>
        ) : (
          <button
            onClick={addTask}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Task
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {tasks.length === 0 && <p className="text-center text-gray-500">No tasks available.</p>}
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 border rounded-lg ${
              task.isCompleted ? 'bg-gray-200 line-through' : 'bg-gray-50'
            }`}
          >
            <span
              className="cursor-pointer"
              onClick={() => toggleComplete(task.id)}
            >
              {task.task}
            </span>
            <div>
              <button
                onClick={() => startEditing(task)}
                className="mr-2 w-fit bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="w-fit bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
