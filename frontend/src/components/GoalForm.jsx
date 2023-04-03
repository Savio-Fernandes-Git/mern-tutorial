import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal, updateGoal } from "../features/goals/goalSlice";

const GoalForm = ({ formText, id }) => {
    const [text, setText] = useState("");

    useEffect(() => {
        if (formText !== "") {
            setText(formText);
        }
    }, [formText]);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (id) {
            console.log(text);
            dispatch(updateGoal({ text }));
        } else {
            dispatch(createGoal({ text }));
            setText("");
        }
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Goal</label>
                    <input
                        type="text"
                        name="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        {id ? "Update Goal" : "Add Goal"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default GoalForm;
