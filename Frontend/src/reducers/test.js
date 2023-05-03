import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated:false,
}
export const testReducer = createReducer(initialState,{
    SendLineRequest: (state,action)=>{
        state.loading = true;
    },
    SendLineSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    SendLineFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },
    clearError:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})

