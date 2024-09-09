import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState: { isSignedIn: false, role: "user" },
    reducers:{
        signin(state){
            state.isSignedIn = true;
        },
        signout(state){
            state.isSignedOut = false;
        },
        changeRole(state, action){
            const role = action.payload;
            state.role = role;
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;