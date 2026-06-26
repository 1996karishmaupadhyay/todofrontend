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
    <form onSubmit={handleAddToDo} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Title</label>
        <input
          name="title"
          type="text"
          placeholder="e.g. Code frontend pages"
          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition duration-200 text-sm font-sans"
          value={formData.title}
          onChange={(e) => setData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Description</label>
        <textarea
          name="description"
          placeholder="Describe your task here..."
          rows="3"
          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition duration-200 text-sm resize-none font-sans"
          value={formData.description}
          onChange={(e) => setData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Category</label>
          <select
            name="category"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition duration-200 text-sm cursor-pointer font-sans"
            value={formData.category}
            onChange={(e) => setData({ ...formData, category: e.target.value })}
          >
            <option value="home">Home</option>
            <option value="office">Office</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Status</label>
          <select
            name="status"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition duration-200 text-sm cursor-pointer font-sans"
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
        className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 active:scale-[0.98] transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:pointer-events-none font-sans"
      >
        {submitting ? "Adding..." : "Add ToDo"}
      </button>
    </form>
  );
};

export default ToDoForm;
