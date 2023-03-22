import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    // functions in here would not be asynchronous
    reducers: {
        //resets state to default value
        // dispatch this function after we register
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    // thunk functions go here
    extraReducers: () => {},
});

// when we have a reducer inside reducer we export it this way
// to export it into components
export const { reset } = authSlice.actions;
// exporting reducer functions
export default authSlice.reducer;
