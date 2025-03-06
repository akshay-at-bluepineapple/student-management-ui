import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, {rejectWithValue }) =>{
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        try {
            const {data} = await axios.post(
                `${import.meta.env.VITE_BE_URL}/login/user/`,
                userData,
                config
            )
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
              }
              return rejectWithValue(error?.response?.data);
        }
    }
)

//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("userInfo");
      return true;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
)

//get user details from loacal storage and place it in store
const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

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


        //logout
        builder.addCase(logoutAction.pending, (state) => {
            state.isLoading = false;
        });
        builder.addCase(logoutAction.fulfilled, (state) => {
            state.userAuth = undefined;
            state.isLoading = false;
            state.error = undefined;
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.error = action.payload?.message 
            state.isLoading = false;
        });
    }
});

export default userSlices.reducer;