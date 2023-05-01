import {useEffect,useState} from 'react'
import { allBeats } from '../../actions/beat'
import { useDispatch,useSelector } from 'react-redux'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,Chip } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon } from 'react-leaflet'
import './Beat.css'
import { useNavigate } from 'react-router-dom'

const Beat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const position = [15.422671837604284,73.98029707006378]
  
  const { loading, error, beats } = useSelector(
    (state) => state.beat
  );

  useEffect(()=>{
    dispatch(allBeats())
  },[])

  const myFunc = (coords) =>{
    let arr = []
    coords.map((el)=>
      arr.push([Number(el.lat),(el.lng)])
    )
    return arr
  }
  const findCentroid = (polygon) =>{
    const numPoints = polygon.length;
    const lng = polygon.map(point => Number(point['lng']));
    const lat = polygon.map(point => Number(point['lat']));
    const centroidX = lng.reduce((a, b) => a + b, 0) / numPoints;
    const centroidY = lat.reduce((a, b) => a + b, 0) / numPoints;
    return [centroidY, centroidX];
  }

  const handleClick = (id) =>{
    navigate(`/beat/${id}`)
  }

  if (loading || !beats)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  else
    return (
      <div className='beats'>
        <div>
          <Typography variant='h4'>Beats</Typography>
        </div>
        <MapContainer center={position} zoom={11} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            beats.map((ele)=>{
              return (
                <>
                  <Polygon key={ele._id} pathOptions={{ color: 'orange' }} positions={myFunc(ele.coords)} />
                  <Marker key={ele._id} position={findCentroid(ele.coords)}>
                    <Popup>
                      <div className='popup'>
                        <Typography variant='h7'>Name : {ele.name}</Typography>
                        <Button onClick={()=>handleClick(ele._id)}>View</Button>
                    </div> 
                    </Popup>
                  </Marker>
                </>
              )
            })
          }
        </MapContainer>
    </div>
    
  )
}

export default Beat