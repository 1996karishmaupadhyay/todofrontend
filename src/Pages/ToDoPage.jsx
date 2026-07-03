import React, { useState } from "react";
import ToDoForm from "../Components/ToDoForm";
import { activeBtn, inactiveBtn } from "../styles";
import ToDoList from "../Components/ToDoList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const ToDoPage = () => {
  const [category, setCategory] = useState("Home");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleLogout = () => {
    // Navigate back to login
    toast.success("Successfully logged out!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-slate-100 flex flex-col font-sans">
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />

      {/* Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-lg">T</span>
            </div>
            <span className="font-bold text-lg text-white font-sans tracking-wide">
              TaskSphere
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-6  flex-1 flex flex-col gap-8">
        {/* Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h1 className="text-2xl font-extrabold text-black tracking-tight">Your Dashboard</h1>
            <p className="text-md text-green-600  font-bold">Organize, track, and complete your projects.</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start ">
          {/* Left Column: Form & Category Tabs */}
          <div className="lg:col-span-4 ">
            <div className=" ">
              <label className="block text-sm font-semibold text-black uppercase tracking-wider mb-1 px-1.5 font-sans">
                Form Preset Category:
              </label>
              <div className="flex flex-wrap gap-1 ">
                <button
                  onClick={() => setCategory("Home")}
                  className={category === "Home" ? activeBtn : inactiveBtn}
                >
                  Home
                </button>
                <button
                  onClick={() => setCategory("Office")}
                  className={category === "Office" ? activeBtn : inactiveBtn}
                >
                  Office
                </button>
                <button
                  onClick={() => setCategory("Miscellaneous")}
                  className={category === "Miscellaneous" ? activeBtn : inactiveBtn}
                >
                  Misc
                </button>
              </div>
            </div>

            <ToDoForm category={category} onTodoAdded={handleRefresh} />
          </div>

          {/* Right Column: Todo List Table */}
          <div className="lg:col-span-8">
            <ToDoList refreshTrigger={refreshTrigger} onTodoUpdated={handleRefresh} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToDoPage;
