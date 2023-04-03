import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteGoal } from "../features/goals/goalSlice";

const GoalItem = ({ goal }) => {
    const dispatch = useDispatch();
    return (
        <div className="goal">
            <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
            <Link to={`goals/${goal._id}`} key={goal._id}>
                <h3>{goal.text}</h3>
            </Link>
            <button
                onClick={() => dispatch(deleteGoal(goal._id))}
                className="close"
            >
                X
            </button>
        </div>
    );
};

export default GoalItem;
