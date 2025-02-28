import { configureStore } from "@reduxjs/toolkit";
import student from "../slices/student/studentSlice"
import user from "../slices/user/userSlice"


const store = configureStore({
    reducer:{
        student,
        user
    }
});

export default store;