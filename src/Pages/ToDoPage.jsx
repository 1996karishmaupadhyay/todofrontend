import React, { useState } from 'react';

const ToDoPage = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4">
          📝 My To-Do List
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400">No tasks yet</p>
          ) : (
            tasks.map((t, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <span
                  onClick={() => toggleTask(index)}
                  className={`cursor-pointer ${
                    t.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {t.text}
                </span>

                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ToDoPage;