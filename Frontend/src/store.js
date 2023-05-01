import { configureStore } from "@reduxjs/toolkit"
import {userReducer} from './reducers/user'
import {subdivisionReducer} from './reducers/subdivision'
import { stationReducer } from "./reducers/station"
import { beatReducer } from "./reducers/beat"

const store = configureStore({
    reducer:{
        user:userReducer,
        subdivision:subdivisionReducer,
        station:stationReducer,
        beat:beatReducer
    }
})
export default store