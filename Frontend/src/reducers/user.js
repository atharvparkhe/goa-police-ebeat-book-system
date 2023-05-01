import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated:false,
}
export const userReducer = createReducer(initialState,{
    LoginRequest: (state,action)=>{
        state.loading = true;
    },
    LoginSuccess: (state,action)=>{
        state.message = action.payload1;
        state.role = action.payload2;
        state.isAuthenticated = true;
        state.loading = false
    },
    LoginFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },
    LoadUserRequest: (state,action)=>{
        state.loading = true;
    },
    LoadUserSuccess: (state,action)=>{
        state.isAuthenticated = true;
        state.role = action.payload
        state.loading = false
    },
    LoadUserFailure: (state,action)=>{     
        state.error = action.payload
        state.isAuthenticated = false;
        state.loading = false
    },
    LogoutRequest: (state,action)=>{
        state.loading = true;
    },
    LogoutSuccess: (state,action)=>{
        state.isAuthenticated = false;
        state.message = action.payload
        state.loading = false
    },
    clearError:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})

