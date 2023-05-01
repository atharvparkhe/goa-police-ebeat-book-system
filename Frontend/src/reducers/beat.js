import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const beatReducer = createReducer(initialState,{
    GetBeatsRequest: (state,action)=>{
        state.loading = true;
    },
    GetBeatsSuccess: (state,action)=>{
        state.beats = action.payload;
        state.loading = false
    },
    GetBeatsFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    GetBeatRequest: (state,action)=>{
        state.loading = true;
    },

    GetBeatSuccess: (state,action)=>{
        state.beat = action.payload;
        state.loading = false
    },
    GetBeatFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    AddBeatRequest: (state,action)=>{
        state.loading = true;
    },
    AddBeatSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    AddBeatFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    EditBeatRequest: (state,action)=>{
        state.loading = true;
    },

    EditBeatSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    EditBeatFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    RemoveBeatRequest: (state,action)=>{
        state.loading = true;
    },
    RemoveBeatSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    RemoveBeatFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    GetAllConstableRequest: (state,action)=>{
        state.loading = true;
    },
    GetAllConstableSuccess: (state,action)=>{
        state.constables = action.payload;
        state.loading = false
    },
    GetAllConstableFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    AssignConstableRequest: (state,action)=>{
        state.loading = true;
    },
    AssignConstableSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    AssignConstableFailure: (state,action)=>{     
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

