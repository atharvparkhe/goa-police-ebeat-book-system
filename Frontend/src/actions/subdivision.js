import axios from "axios"
import '../axios'

export const addSubdivision = (name,coords)=>async(dispatch)=>{
    try {
        dispatch({
            type:"AddSubdivisionRequest"
        })
        const {data} = await axios.post("/api/v1/subdivision",{name,coords},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"AddSubdivisionSuccess",
            payload: data.msg,
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AddSubdivisionFailure",
            payload:error.response.data.msg
        })
    }    
}

export const allSubdivisions = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetSubdivisionsRequest"
        })
        const {data} = await axios.get("/api/v1/subdivision")
        dispatch({
            type:"GetSubdivisionsSuccess",
            payload:data.subdivisions
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetSubdivisionsFailure",
            payload:error.response.data
        })
    }    
}
export const getSubdivision = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetSubdivisionRequest"
        })
        const {data} = await axios.get(`/api/v1/subdivision/${id}`)
        dispatch({
            type:"GetSubdivisionSuccess",
            payload:data.subdivision
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetSubdivisionFailure",
            payload:error.response.data
        })
    }    
}
export const removeSubdivision = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"RemoveSubdivisionRequest"
        })
        const {data} = await axios.delete(`/api/v1/subdivision/${id}`)
        dispatch({
            type:"RemoveSubdivisionSuccess",
            payload:data.message
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"RemoveSubdivisionFailure",
            payload:error.response.data
        })
    }    
}