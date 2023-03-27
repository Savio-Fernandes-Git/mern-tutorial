import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const goalSlice = createSlice({
    name: "goals",
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
        // builder.addCase();
    },
});

// when we have a reducer inside reducer we export it this way
// to export it into components
export const { reset } = goalSlice.actions;
// exporting reducer functions
export default goalSlice.reducer;
