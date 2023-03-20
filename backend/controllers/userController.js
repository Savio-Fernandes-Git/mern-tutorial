// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
    res.json({ message: "Register user" });
};

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = (req, res) => {
    res.json({ message: "Login user" });
};

// @desc Register new user
// @route GET /api/users/me
// @access Public
const getMe = (req, res) => {
    res.json({ message: "Register user" });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};