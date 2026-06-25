import React, { useState } from 'react'
import ToDoForm from '../Components/ToDoForm';
import { activeBtn, inactiveBtn } from '../styles';
const ToDoPage = () => {
  const [category,setCategory]=useState("C");

  return (
    <>
    <div className='flex'>
      <div>
      <div className='flex'>
          <button onClick={()=>setCategory("C")} className={category==="C" ? activeBtn : inactiveBtn}>Completed</button>
          <button onClick={()=>setCategory("I")} className={category==="I" ? activeBtn : inactiveBtn}>In Progress</button>
          <button onClick={()=>setCategory("N")} className={category==="N" ? activeBtn : inactiveBtn}>Not Started</button>
      </div>
      <div>
        <ToDoForm category={category}/>
      </div>
      </div>
        <div>
          Your To Do's
        </div>
      </div>
    </>
  )
}

export default ToDoPage
