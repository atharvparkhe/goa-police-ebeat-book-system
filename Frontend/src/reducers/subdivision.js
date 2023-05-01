import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const subdivisionReducer = createReducer(initialState,{
    GetSubdivisionsRequest: (state,action)=>{
        state.loading = true;
    },
    GetSubdivisionsSuccess: (state,action)=>{
        state.subdivisions = action.payload;
        state.loading = false
    },
    GetSubdivisionsFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    GetSubdivisionRequest: (state,action)=>{
        state.loading = true;
    },

    GetSubdivisionSuccess: (state,action)=>{
        state.subdivision = action.payload;
        state.loading = false
    },
    GetSubdivisionFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    AddSubdivisionRequest: (state,action)=>{
        state.loading = true;
    },

    AddSubdivisionSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    AddSubdivisionFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    EditSubdivisionRequest: (state,action)=>{
        state.loading = true;
    },

    EditSubdivisionSuccess: (state,action)=>{
        state.subdivision = action.payload;
        state.loading = false
    },
    EditSubdivisionFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    RemoveSubdivisionRequest: (state,action)=>{
        state.loading = true;
    },
    RemoveSubdivisionSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    RemoveSubdivisionFailure: (state,action)=>{     
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

