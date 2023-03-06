// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
    res.status(200).json({ message: "Get goals" });
};

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = (req, res) => {
    console.log(req.body);
    // checking if request body exists
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please send a request body"); // using express error handler
    }
    res.status(200).json({ message: "Set goal" });
};

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
};

// @desc Delete goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = (req, res) => {
    res.status(200).json({ message: `Delete goals ${req.params.id}` });
};

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
