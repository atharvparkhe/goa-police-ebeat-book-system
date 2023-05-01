import axios from "axios"
import '../axios'

export const addBeat = (name,station_id,coords)=>async(dispatch)=>{
    try {
        dispatch({
            type:"AddBeatRequest"
        })
        const {data} = await axios.post("/api/v1/beat",{name,station_id,coords},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"AddBeatSuccess",
            payload: data.msg,
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AddBeatFailure",
            payload:error.response.data
        })
    }    
}

export const allBeats = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetBeatsRequest"
        })
        const {data} = await axios.get("/api/v1/beat")
        dispatch({
            type:"GetBeatsSuccess",
            payload:data.beats
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetBeatsFailure",
            payload:error.response.data
        })
    }    
}
export const getBeat = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetBeatRequest"
        })
        const {data} = await axios.get(`/api/v1/beat/${id}`)
        dispatch({
            type:"GetBeatSuccess",
            payload:data.beat
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetBeatFailure",
            payload:error.response.data
        })
    }    
}
export const removeBeat = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"RemoveBeatRequest"
        })
        const {data} = await axios.delete(`/api/v1/beat/${id}`)
        dispatch({
            type:"RemoveBeatSuccess",
            payload:data.message
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"RemoveBeatFailure",
            payload:error.response.data
        })
    }    
}
export const allConstable = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllConstableRequest"
        })
        const {data} = await axios.get("/api/v1/users/constable")
        dispatch({
            type:"GetAllConstableSuccess",
            payload:data.constables
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetAllConstableFailure",
            payload:error.response.data
        })
    }    
}

export const assignBeat = (beat_id,constable)=>async(dispatch)=>{
    try {
        dispatch({
            type:"AssignConstableRequest"
        })
        const {data} = await axios.post(`/api/v1/beat/assign-officer/${beat_id}`,{constable},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"AssignConstableSuccess",
            payload: data.msg,
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AssignConstableFailure",
            payload:error.response.data
        })
    }    
}