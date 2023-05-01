import axios from "axios"
import '../axios'

export const addStation = (name,sub_id,coords)=>async(dispatch)=>{
    try {
        dispatch({
            type:"AddStationRequest"
        })
        const {data} = await axios.post("/api/v1/station",{name,sub_id,coords},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"AddStationSuccess",
            payload: data.msg,
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AddStationFailure",
            payload:error.response.data
        })
    }    
}

export const allStations = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetStationsRequest"
        })
        const {data} = await axios.get("/api/v1/station")
        dispatch({
            type:"GetStationsSuccess",
            payload:data.stations
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetStationsFailure",
            payload:error.response.data
        })
    }    
}
export const getStation = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetStationRequest"
        })
        const {data} = await axios.get(`/api/v1/station/${id}`)
        dispatch({
            type:"GetStationSuccess",
            payload:data.station
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetStationFailure",
            payload:error.response.data
        })
    }    
}
export const removeStation = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"RemoveStationRequest"
        })
        const {data} = await axios.delete(`/api/v1/station/${id}`)
        dispatch({
            type:"RemoveStationSuccess",
            payload:data.message
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"RemoveStationFailure",
            payload:error.response.data
        })
    }    
}