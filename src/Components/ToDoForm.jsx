import React, { useState, useEffect } from 'react';
import { createTodo } from '../api/todoapi.js';
import { toast } from 'react-toastify';

const ToDoForm = ({ category, onTodoAdded }) => {
  const [formData, setData] = useState({
    title: "",
    description: "",
    status: false,
    category: category
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setData((prev) => ({ ...prev, category: category }));
  }, [category]);

  const handleAddToDo = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.warning("⚠️ Title is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.warning("⚠️ Description is required");
      return;
    }

    setSubmitting(true);
    try {
      await createTodo({
        title: formData.title,
        description: formData.description,
        status: formData.status === "true" || formData.status === true,
        category: formData.category
      });
      toast.success("✨ Task created successfully!");
      setData({
        title: "",
        description: "",
        status: false,
        category: category
      });
      if (onTodoAdded) {
        onTodoAdded();
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error(`❌ Failed to create task: ${error.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" border border-slate-800 p-6 rounded-sm backdrop-blur-md ">
      <h3 className="text-lg font-bold text-black mb-4 font-sans">Create New Task</h3>
      <form onSubmit={handleAddToDo} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-sans">Title</label>
          <input
            name="title"
            type="text"
            placeholder="e.g. Design UI mockups"
            className="w-full bg-slate-850 border border-slate-800 rounded-sm px-4 py-3 text-black placeholder-grey-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 text-sm font-sans"
            value={formData.title}
            onChange={(e) => setData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-sans">Description</label>
          <textarea
            name="description"
            placeholder="Describe your task here..."
            rows="3"
            className="w-full  border border-slate-800 rounded-sm px-4 py-3 text-black placeholder-grey-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 text-sm resize-none font-sans"
            value={formData.description}
            onChange={(e) => setData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
        

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Status</label>
            <select
              name="status"
              className="w-full bg-slate-850 border border-slate-800 rounded-sm px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 text-sm cursor-pointer font-sans"
              value={formData.status}
              onChange={(e) => setData({ ...formData, status: e.target.value })}
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-sm font-bold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:pointer-events-none font-sans"
        >
          {submitting ? "Adding..." : "Add ToDo"}
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
