import {useEffect,useState} from 'react'
import { getSubdivision,allSubdivisions,addSubdivision } from '../../actions/subdivision'
import { useDispatch,useSelector } from 'react-redux'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,Chip } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon } from 'react-leaflet'
import './Subdivision.css'
import { useNavigate } from 'react-router-dom'

const Subdivision = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const position = [15.422671837604284,73.98029707006378]
  
  const { loading, error, subdivisions } = useSelector(
    (state) => state.subdivision
  );

  useEffect(()=>{
    dispatch(allSubdivisions())
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
    navigate(`/subdivision/${id}`)
  }
  const handleAdd = () =>{
    navigate('/add_subdivision')
  }

  if (loading || !subdivisions)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  else
    return (
      <div className='subdivisions'>
        <div>
          <Typography variant='h4'>Subdivisions</Typography>
          <Chip label="Add Subdivision" color='primary' onClick={handleAdd} />
        </div>
        <MapContainer center={position} zoom={9.5} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            subdivisions.map((ele)=>{
              return (
                <>
                  <Polygon key={ele._id} pathOptions={{ color: 'purple' }} positions={myFunc(ele.coords)} />
                  <Marker key={ele._id} position={findCentroid(ele.coords)}>
                    <Popup>
                      <div className='popup'>
                        <Typography variant='h7'>Name : {ele.name}</Typography>
                        <Typography variant='h7'>District : {ele.district}</Typography>
                        <Typography variant='h7'>Stations : {ele.stations.length}</Typography>
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

export default Subdivision