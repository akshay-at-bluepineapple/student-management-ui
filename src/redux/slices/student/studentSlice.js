import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllStudents = createAsyncThunk(
    "student/list",
    async (_,{rejectWithValue, getState}) =>{
        const user = getState()?.user;
        const { userAuth } = user;
        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token?.access}`,
            }
        }
        //http call
        try {
            const {data} = await axios.get(
                "http://localhost:8000/students/",
                config
            );
            console.log('data: ', data);
            return data;
            
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const fetchStudentById = createAsyncThunk(
    "student/deatil",
    async (id,{rejectWithValue, getState}) =>{
        const user = getState()?.user;
        const { userAuth } = user;
        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token?.access}`,
            }
        }
        //http call
        try {
            const {data} = await axios.get(
                `http://localhost:8000/students/${id}/`,
                config
            );
            console.log('data: ', data);
            return data;
            
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
)


//----------------
//Slices
//----------------

const studentSlices = createSlice({
    name: "student",
    initialState: {
        studentList: [],
        isLoading: false,
        error: null,
      },
      extraReducers: builder =>{
        //fetch all students
        builder.addCase(fetchAllStudents.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });
        builder.addCase(fetchAllStudents.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.studentList = action?.payload
            state.error = undefined;
        });
        builder.addCase(fetchAllStudents.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload?.message || "Failed to fetch students";
        });

        //fetches student by id
        builder.addCase(fetchStudentById.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });
        builder.addCase(fetchStudentById.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.studentData = action?.payload
            state.error = undefined;
        });
        builder.addCase(fetchStudentById.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload?.message || "Failed to fetch students";
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
    },
});

export default studentSlices.reducer;