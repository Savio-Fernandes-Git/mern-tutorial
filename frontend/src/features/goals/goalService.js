import axios from "axios";

const API_URL = "/api/goals/";

const createGoal = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = async () => {
    localStorage.removeItem("user");
};

// use this to export whatever we want
const authService = {
    createGoal,
    logout,
    login
};

export default authService;
