import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGoal, reset } from "../features/goals/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { FaPencilAlt } from "react-icons/fa";
import GoalForm from "./GoalForm";

const GoalDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getGoal(id));
        }

        if (isError) {
            console.log(message);
        }
        return () => {
            dispatch(reset());
        };
    }, [id, navigate, user, dispatch, message, isError]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <h2>Goal page</h2>
            <p>{goals.text}</p>
            <FaPencilAlt
                onClick={() => {
                    if (editMode) {
                        setEditMode(false);
                    } else {
                        setEditMode(true);
                    }
                }}
            />
            {editMode && <GoalForm formText={goals.text} id={id} />}
        </>
    );
};

export default GoalDetails;
