import {useEffect, useState} from 'react'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,Chip } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon,Polyline, useMapEvents } from 'react-leaflet'
import './Test.css'
import { sendLine } from '../../actions/test'
import { useDispatch } from 'react-redux'
//import * as turf from '@turf/turf';

export const Test = () => {
    const position = [15.422671837604284,73.98029707006378]
    const [data,setData] = useState(null)
    const [editableLine, setEditableLine] = useState([]);
    const dispatch = useDispatch()

    
    const handleFinishDrawing = () => {
        if (editableLine.length > 1) {
            const updatedLines = [...lines, editableLine];
            setEditableLine([]);
        // do something with the updatedLines, e.g. save to state
        }
    };

    function LocationMarker({id}) {
        useMapEvents({
            click: (event) => {
            const latLng = event.latlng;
            setEditableLine((prev) => [...prev, latLng]);
            },
        });

    return (
      <>
        {
            editableLine.length > 1 && (
                <Polyline positions={editableLine} onClick={handleFinishDrawing} />
            )
        }
      </>
    );
  }


    useEffect(()=>{
        makeAPICall()
    },[])

    const makeAPICall = async()=>{
        try {
            const response = await fetch(`http://192.168.165.112:8000/api/all-districts/`)
            const result = await response.json()
            setData(result)
            console.log(result)

        } catch (error) {
            console.log(error.response.data,error.response.status)
        }    
    }
    const myFunc = (coords) =>{
        let arr = []
        coords.map((el)=>
            el.map((ele)=>arr.push([ele[1],ele[0]]))
        )
        return arr
      }
    
    const handleDone = ()=>{
        //console.log(editableLine)
        let string = 'LINESTRING ('
        editableLine.map((ele,index)=>{
            if(index == editableLine.length - 1)
                string += `${ele.lat} ${ele.lng})`
            else
                string += `${ele.lat} ${ele.lng}, `
                
        })
        console.log(string)
        dispatch(sendLine(string))
    }

    // function splitPolygonWithLine(polygon, line) {
    //     const poly = myFunc(polygon)
    //     const lin = myFunc(line)
    //     console.log(poly,lin)
    //     const polygonFeature = turf.polygon([polygon]);
    //     const lineFeature = turf.lineString(line);
      
    //     const splitResult = turf.lineSplit(polygonFeature, lineFeature);
        
    //     const splitPolygons = splitResult.features.map(feature => turf.getCoords(feature));
    //     console(splitPolygons)
    //     return splitPolygons;
    // }
    
    
  return (
    <div className='beats'>
        <div>
          <Typography variant='h4'>Regions</Typography>
        </div>
        <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            data &&
            data.map((ele)=>{
              return (
                <>
                  <Polygon key={ele.id} pathOptions={{ color: 'orange' }} positions={myFunc(ele.region.coordinates)} />
                  <LocationMarker id={ele.id}/>
                </>
              )
            })
          }
        </MapContainer>
        <div>
            <Button onClick={handleDone} variant='outlined'>Done</Button>
        </div>
    </div>
  )
}
