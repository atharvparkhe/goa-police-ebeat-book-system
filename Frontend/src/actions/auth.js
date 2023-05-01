import axios from "axios"
import '../axios'

export const loginUser = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data} = await axios.post("/api/v1/auth/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"LoginSuccess",
            payload1: "Login Successfull",
            payload2:data.role
        })
        localStorage.setItem(
            'user',
            JSON.stringify({token: data.token })
        )
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoginFailure",
            payload:error.response.data.msg
        })
    }    
}
export const logoutUser = ()=>async(dispatch)=>{
    dispatch({
        type:"LogoutRequest"
    })
    localStorage.removeItem("user"); 
    dispatch({
        type:"LogoutSuccess",
        payload:"User Logged Out"
    })
}

export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const {data} = await axios.get("/api/v1/auth/load")
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user.role
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.detail
        })
    }    
}