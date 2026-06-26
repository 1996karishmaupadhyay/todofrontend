import React, { useState } from "react";
import ToDoForm from "../Components/ToDoForm";
import { activeBtn, inactiveBtn } from "../styles";
import ToDoList from "../Components/ToDoList";
const ToDoPage = () => {
  const [category, setCategory] = useState("H");

  return (
    <>
      <div className="flex gap-4 justify-around">
        <div>
          <div className="flex">
            <button
              onClick={() => setCategory("H")}
              className={category === "H" ? activeBtn : inactiveBtn}
            >
              Home
            </button>
            <button
              onClick={() => setCategory("O")}
              className={category === "O" ? activeBtn : inactiveBtn}
            >
              Office
            </button>
            <button
              onClick={() => setCategory("M")}
              className={category === "M" ? activeBtn : inactiveBtn}
            >
              Miscellaneous
            </button>
          </div>
          <div>
            <ToDoForm category={category} />
          </div>
        </div>
        <div>
          <ToDoList category={category} />
        </div>
      </div>
    </>
  );
};

export default ToDoPage;
