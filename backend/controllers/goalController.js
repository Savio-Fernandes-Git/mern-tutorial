const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    console.log(req.body);
    // checking if request body exists
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please send a request body"); // using express error handler
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(201).json(goal);
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // Check if user exists
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // make sure logged in user matches thhe goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // Check if user exists
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // make sure logged in user matches thhe goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
