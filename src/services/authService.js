import api from "../utils/api";


export const login = async (data) => {
  try {
    const res = await api.post("/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};


export const signup = async (data) => {
  try {
    const res = await api.post("/signup", data);
    return res.data;   // ❗ you forgot this earlier
  } catch (error) {
    throw error.response?.data || "Signup failed";
  }
};