import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const stationReducer = createReducer(initialState,{
    GetStationsRequest: (state,action)=>{
        state.loading = true;
    },
    GetStationsSuccess: (state,action)=>{
        state.stations = action.payload;
        state.loading = false
    },
    GetStationsFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    GetStationRequest: (state,action)=>{
        state.loading = true;
    },

    GetStationSuccess: (state,action)=>{
        state.station = action.payload;
        state.loading = false
    },
    GetStationFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    AddStationRequest: (state,action)=>{
        state.loading = true;
    },

    AddStationSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    AddStationFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    EditStationRequest: (state,action)=>{
        state.loading = true;
    },

    EditStationSuccess: (state,action)=>{
        state.station = action.payload;
        state.loading = false
    },
    EditStationFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    RemoveStationRequest: (state,action)=>{
        state.loading = true;
    },
    RemoveStationSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    RemoveStationFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    GetAllPiRequest: (state,action)=>{
        state.loading = true;
    },
    GetAllPiSuccess: (state,action)=>{
        state.officers = action.payload;
        state.loading = false
    },
    GetAllPiFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    AssignPiRequest: (state,action)=>{
        state.loading = true;
    },
    AssignPiSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false
    },
    AssignPiFailure: (state,action)=>{     
          state.error = action.payload
          state.loading = false
    },

    PiStationRequest: (state,action)=>{
        state.loading = true;
    },
    PiStationSuccess: (state,action)=>{
        state.station = action.payload;
        state.loading = false
    },
    PiStationFailure: (state,action)=>{     
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

