import { createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit";
import axios from "axios";

//Redirect action
const resetStudentCreated = createAction("student/created/reset");

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
                `${import.meta.env.VITE_BE_URL}/students/`,
                config
            );
            return data;
            
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const createNewStudent = createAsyncThunk(
    "student/create",
    async (formData,{rejectWithValue, getState, dispatch}) =>{
        const user = getState()?.user;
        const { userAuth } = user;
        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token?.access}`,
            }
        }
        //http call
        try {
            const {data} = await axios.post(
                `${import.meta.env.VITE_BE_URL}/students/`,
                formData,
                config
            );
            //dispatch
            dispatch(resetStudentCreated());
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
                `${import.meta.env.VITE_BE_URL}/students/${id}/`,
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
        //create students
        builder.addCase(createNewStudent.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });
        builder.addCase(resetStudentCreated, (state ) => {
            state.isStudentCreated = true;
        });
        builder.addCase(createNewStudent.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.studentCreated = action?.payload;
            state.isStudentCreated = true;
            state.error = undefined;
        });
        builder.addCase(createNewStudent.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload?.message || "Failed to fetch students";
        });

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

    },
});

export default studentSlices.reducer;