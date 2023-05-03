import axios from "axios"
import '../axios'

export const sendLine = (line)=>async(dispatch)=>{
    try {
        dispatch({
            type:"SendLineRequest"
        })
          
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({line:line}),
          };
          
        const response = await fetch('http://192.168.165.112:8000/api/line/', options)
        const data = await response.json()

         dispatch({
            type:"SendLineSuccess",
            payload: data.message,
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"SendLineFailure",
            payload:error.response.data
        })
    }    
}