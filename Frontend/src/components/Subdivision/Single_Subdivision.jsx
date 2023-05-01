import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubdivision,removeSubdivision } from '../../actions/subdivision'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,Chip } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon } from 'react-leaflet'
import "./Subdivision.css"

const Single_Subdivision = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const position = [15.422671837604284,73.98029707006378]

    const { loading, error, subdivision } = useSelector(
        (state) => state.subdivision
    );
    const {role} = useSelector((state)=>state.user)
    
    useEffect(()=>{
        dispatch(getSubdivision(id))
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
    
      const handleClick = (sid) =>{
        navigate(`/station/${sid}`)
      }

      const handleAdd = () =>{
        navigate(`/add_station/${id}`)
      }
      const handleDelete = () =>{
        dispatch(removeSubdivision(id))
        navigate('/')
      }
    
      if (loading || !subdivision)
        return (
          <Backdrop open={true}>
            <CircularProgress />
          </Backdrop>
        );
    else
        return (
            <div className='subdivisions'>
                <div>
                    <Typography variant='h4'>Subdivision</Typography>
                    <div>
                      <Chip label="Add Station" color='primary' onClick={handleAdd} />
                      {role == 'sp' ? <Chip label="Delete Subdivision" style={{backgroundColor:'red'}} color='secondary' onClick={handleDelete} />:null}
                    </div>
                    
                </div>
                <div>
                  <div>
                    <Typography variant='h5'>Name: </Typography>
                    <Typography variant='h6' color='gray' >{subdivision.name}</Typography>
                  </div>
                  <div>
                      <Typography variant='h5'>District: </Typography>
                      <Typography variant='h6' color='gray' >{subdivision.district}</Typography>
                  </div>
                  <div>
                      <Typography variant='h5'>Stations: </Typography>
                      <Typography variant='h6' color='gray' >{subdivision.stations.length}</Typography>
                  </div>
                </div>
            <MapContainer center={position} zoom={9.5} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            { 
            subdivision.stations.map((ele,index)=>{
              return (
                <>
                  <Polygon pathOptions={{ color: 'red' }} positions={myFunc(ele.coords)} />
                  <Marker position={findCentroid(ele.coords)}>
                    <Popup>
                      <div className='popup'>
                        <Typography variant='h7'>Name : {ele.name}</Typography>
                        <Typography variant='h7'>Beats : {ele.beats.length}</Typography>
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

export default Single_Subdivision