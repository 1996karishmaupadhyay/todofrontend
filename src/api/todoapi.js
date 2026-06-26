import api from "../utils/api";

export const createTodo = async (formData) => {
  try {
    const res = await api.post("/todos/add", formData);
    return res.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const getAllToDos = async () => {
  try {
    const res = await api.get("/todos/get");
    return res.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const updateTodo = async (id, data) => {
  try {
    const res = await api.put(`/todos/update/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await api.post(`/todos/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};