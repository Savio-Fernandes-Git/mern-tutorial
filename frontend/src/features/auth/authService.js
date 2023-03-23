import axios from "axios";

//base API to call users
axios.defaults.baseURL = process.env.API_URL;

const register = async (userData) => {
    const response = await axios.post(`http://localhost:5000/api/users`, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// use this to export whatever we want
const authService = {
    register,
};

export default authService;
