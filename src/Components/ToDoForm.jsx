import React, { useState } from 'react'
import { createTodo } from '../api/todoapi.js';

const ToDoForm = ({category}) => {

  const [formData,setData]=useState({
    title:"",
    description:"",
    status:false,
    category:category
  })

  const handleAddToDo=async(e)=>{
    e.preventDefault();
    console.log(formData,"form data is coming in handle add to do function");
    try {
       const data=await createTodo(formData)
       console.log("passing formdata to post api function of add to do")
    } catch (error) {
      console.error("Error creating todo:", error)
      throw error;
    }
   


  }
  return (
    <>
      <form  className='flex flex-col gap-4'>
        <input 
          name="title" 
          type="text" 
          placeholder="Enter a title" 
          className='border border-gray-300 rounded-md p-2' 
          value={formData.title}
          onChange={(e) => setData({...formData, title: e.target.value})}
        />  
        <input 
          name="description" 
          type="text" 
          placeholder="Enter a description" 
          className='border border-gray-300 rounded-md p-2' 
          value={formData.description}
          onChange={(e) => setData({...formData, description: e.target.value})}
        /> 
        <select 
          name="status" 
          className='border border-gray-300 rounded-md p-2' 
          value={formData.status}
          onChange={(e) => setData({...formData, status: e.target.value})}
        >
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
           
        </select> 
        <button  className='bg-blue-500 text-white rounded-md p-2' onClick={handleAddToDo}>Add ToDo</button>
      </form>
    </>
  )
}

export default ToDoForm
