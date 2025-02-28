import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

//Redirect action
// const resetUserRegister = createAction("user/register/reset");
const resetUserLogin = createAction("user/login/reset");
// const resetUserUpdated = createAction("user/update/reset");

export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, {rejectWithValue, dispatch}) =>{
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        try {
            const {data} = await axios.post(
                "http://localhost:8000/login/user/",
                userData,
                config
            )
            localStorage.setItem("userInfo", JSON.stringify(data));
            dispatch(resetUserLogin()); // This ensures registration status is reset before the next registration attempt.
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
              }
              return rejectWithValue(error?.response?.data);
        }
    }
)

//get user details from loacal storage and place it in store
const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined;

//slice
const userSlices = createSlice({
    name: "user",
    initialState: {
        userAuth: userLoginFromStorage
    },

    extraReducers:(builder)=>{
        builder.addCase(loginUserAction.pending, (state)=>{
            state.userLoading = true;
            state.error = undefined;
        });

        builder.addCase(loginUserAction.fulfilled, (state, action)=>{
            state.userAuth = action?.payload;
            state.userLoading = false;
            state.error = undefined;
        })

        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userLoading = false;
            state.error = action?.payload?.message;
        });

        builder.addCase(resetUserLogin, (state) => {
            state.isLogin = true;
          });
    }
});

export default userSlices.reducer;