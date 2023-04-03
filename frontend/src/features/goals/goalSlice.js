import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    goal: null,
    singleGoal: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//create new goal (action)
export const createGoal = createAsyncThunk(
    "goals/create",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.createGoal(goalData, token);
        } catch (error) {
            // will check if theres an error and put it in const message
            const message =
                (error && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// action: get one goal
export const getGoal = createAsyncThunk(
    "goals/getGoal",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.getGoal(id, token);
        } catch (error) {
            // will check if theres an error and put it in const message
            const message =
                (error && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//get user goals (action)
export const getGoals = createAsyncThunk(
    "goals/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.getGoals(token);
        } catch (error) {
            // will check if theres an error and put it in const message
            const message =
                (error && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//update user goal
export const updateGoal = createAsyncThunk(
    "goals/update",
    async (goalData, id, thunkAPI) => {
        try {
            const token = thunkAPI.getState;
            return await goalService.updateGoal(goalData, id, token);
        } catch (error) {
            const message =
                (error && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//delete user goal (action)
export const deleteGoal = createAsyncThunk(
    "goals/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.deleteGoal(id, token);
        } catch (error) {
            // will check if theres an error and put it in const message
            const message =
                (error && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const goalSlice = createSlice({
    name: "goal",
    initialState,
    // functions in here would not be asynchronous
    reducers: {
        //resets state to default value
        // dispatch this function after we register
        reset: (state) => initialState,
    },
    // thunk functions go here (async API calls & other ASYNC stuff)
    extraReducers: (builder) => {
        //when register function is loading, fullfilled and rejected
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter(
                    (goal) => goal._id !== action.payload.id
                );
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

// when we have a reducer inside reducer we export it this way
// to export it into components
export const { reset } = goalSlice.actions;
// exporting reducer functions
export default goalSlice.reducer;

// thunkAPI has a getState method in any part
