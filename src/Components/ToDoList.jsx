import React, { useEffect, useState } from "react";
import { getAllToDos, updateTodo, deleteTodo } from "../api/todoapi.js";
import { FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ToDoList = ({ refreshTrigger, onTodoUpdated }) => {
  const [todos, setTodos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const gettodos = async () => {
    try {
      const res = await getAllToDos();
      setTodos(res.data);
    } catch (error) {
      console.log("Error in fetching todos", error);
    }
  };

  useEffect(() => {
    gettodos();
  }, [refreshTrigger]);

  const handleToggleStatus = async (todo) => {
    try {
      await updateTodo(todo._id, {
        ...todo,
        status: !todo.status,
      });
      toast.success(todo.status ? "Task marked as Pending" : "Task marked as Completed!");
      if (onTodoUpdated) {
        onTodoUpdated();
      } else {
        gettodos();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update task status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTodo(id);
      toast.success("Task deleted successfully");
      if (onTodoUpdated) {
        onTodoUpdated();
      } else {
        gettodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete task");
    }
  };

  const filteredTodos =
    selectedCategory === "All"
      ? todos
      : todos.filter((todo) => todo.category === selectedCategory);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md w-full max-w-4xl mx-auto shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-sans">Tasks Overview</h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">Manage your daily checklist</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans">Filter Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-850 border border-slate-850 rounded-xl px-4 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer font-sans"
          >
            <option value="All">All Categories</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/20">
        <table className="min-w-full divide-y divide-slate-800/60">
          <thead>
            <tr className="bg-slate-900/40">
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans w-12">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans">
                Task Title
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans hidden md:table-cell">
                Description
              </th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans w-28">
                Category
              </th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans w-20">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <tr
                  key={todo._id}
                  className={`hover:bg-slate-800/20 transition duration-150 ${
                    todo.status ? "opacity-60" : ""
                  }`}
                >
                  {/* Status Checkbox Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleToggleStatus(todo)}
                      className="text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
                    >
                      {todo.status ? (
                        <FaCheckCircle className="text-indigo-500 text-lg" />
                      ) : (
                        <FaRegCircle className="text-slate-600 text-lg hover:border-indigo-500" />
                      )}
                    </button>
                  </td>

                  {/* Title Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100 font-sans">
                    <span className={todo.status ? "line-through text-slate-500" : ""}>
                      {todo.title}
                    </span>
                  </td>

                  {/* Description Column */}
                  <td className="px-6 py-4 text-sm text-slate-400 font-sans hidden md:table-cell max-w-xs truncate">
                    <span className={todo.status ? "line-through text-slate-500" : ""}>
                      {todo.description}
                    </span>
                  </td>

                  {/* Category Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-block px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-lg border border-slate-700 font-sans">
                      {todo.category}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-slate-500 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition duration-200 focus:outline-none"
                      title="Delete Task"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-slate-500 font-sans"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm">No tasks found.</p>
                    <p className="text-xs text-slate-600 mt-1">Get started by creating a new task!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDoList;