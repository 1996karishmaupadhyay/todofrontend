import React, { useEffect, useState } from "react";
import { getAllToDos } from "../api/todoapi.js";
import { FaCircle } from "react-icons/fa";

const ToDoList = () => {
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
  }, []);

  const filteredTodos =
    selectedCategory === "All"
      ? todos
      : todos.filter((todo) => todo.category === selectedCategory);

  return (
    <div className="p-6">
      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="All">All</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>

      {/* Todo Table */}
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
              Description
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <tr key={todo._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900 border border-gray-200">
                  {todo.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900 border border-gray-200">
                  {todo.description}
                </td>
                <td className="px-6 py-4 border border-gray-200 text-center">
                  {todo.status ? (
                    <FaCircle className="text-green-500 inline" />
                  ) : (
                    <FaCircle className="text-red-500 inline" />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="px-6 py-4 text-center text-gray-500 border"
              >
                No todos found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;