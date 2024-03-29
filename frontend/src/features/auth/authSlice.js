import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register user (action)
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            // will check if theres an error and put it in const message
            const message =
                (error && error.response.data && error.response.data.message) ||
                error.message ||
                error.toSting();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//logout (action)
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

// login user (action)
export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
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
    // thunk functions go here (async API calls & other ASYNC stuff)
    extraReducers: (builder) => {
        //when register function is loading, fullfilled and rejected
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

// when we have a reducer inside reducer we export it this way
// to export it into components
export const { reset } = authSlice.actions;
// exporting reducer functions
export default authSlice.reducer;

//async thunk to deal with backend
