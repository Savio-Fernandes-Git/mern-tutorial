import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGoal, reset } from "../features/goals/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const SingleGoalItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            if (id) {
                dispatch(getGoal(id));
            }
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
            {/* <p>{singleGoal.text}</p> */}
            {/* <p>{goal.text}</p>   */}
        </>
    );
};

export default SingleGoalItem;
