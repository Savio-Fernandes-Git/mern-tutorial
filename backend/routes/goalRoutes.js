// imports
const express = require("express");
const router = express.Router();

const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} = require("../controllers/goalController");

// cleaning up redundant routes with different HTTP methods
router.route("/").get(getGoals).post(setGoal);

router.route("/:id").put(updateGoal).delete(deleteGoal);

// exports
module.exports = router;
