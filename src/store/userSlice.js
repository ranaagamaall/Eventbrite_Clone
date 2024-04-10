import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        id: "",
        token: "",
        email: "",
        firstName: "",
        lastName: "",
        isCreator: false
    },
    reducers: {
        login: (state, action)=>{
            state.loggedIn = true
            state.id = action.payload.id
            state.token = action.payload.token
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.isCreator = action.payload.isCreator
            window.location.reload();
        },
        signup: (state) =>{
            state.loggedIn= false
            state.id = ""
        },
        logout: (state) =>{
            state.loggedIn= false
            state.id= ""
            state.token= ""
            state.email= ""
            state.firstName= ""
            state.lastName= ""
            localStorage.clear()
        },
        creator: (state, action)=>{
            state.isCreator = action.payload.isCreator
        }
    }   
})

export const userActions = userSlice.actions;
export default userSlice.reducer;