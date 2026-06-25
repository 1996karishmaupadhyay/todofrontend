import api from "../utils/api";
export const createTodo=async(formData)=>{
 try {
    console.log("form data is comming in create todo api")
    const res=await api.post("/todos/add",formData)
    console.log("response from create todo api",res.data)
    console.log("form data is comming in create todo api after",formData)
    return res.data
 } catch (error) {
    console.error("Error creating todo:", error)
      console.log(error.response);
  console.log(error.response.data);
  console.log(error.response.status);
    throw error
 }
}