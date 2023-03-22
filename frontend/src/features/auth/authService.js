import axios from "axios";

//base API to call users
const API_URL = "/api/users/";

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
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
