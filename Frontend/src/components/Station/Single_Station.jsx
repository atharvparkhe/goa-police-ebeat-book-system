import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getStation,removeStation } from '../../actions/station'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,Chip } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon } from 'react-leaflet'
import "./Station.css"
import { useAlert } from 'react-alert'

const Single_Station = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const position = [15.422671837604284,73.98029707006378]

    const { loading, error, station,message } = useSelector(
        (state) => state.station
    );
    
    useEffect(()=>{
        dispatch(getStation(id))
    },[])

    useEffect(() => {
        if (error) {
          alert.error("Something went wrong,check console");
          dispatch({ type: "clearError" });
        }
        if (message) {
          alert.success(message);
          dispatch({ type: "clearMessage" });
          navigate('/')
        }
    }, [dispatch, error, alert, message]);

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
        navigate(`/beat/${sid}`)
      }

      const handleAdd = () =>{
        navigate(`/add_beat/${id}`)
      }
      const handleDelete = () =>{
        dispatch(removeStation(id))
        navigate('/')
      }
    
      if (loading || !station)
        return (
          <Backdrop open={true}>
            <CircularProgress />
          </Backdrop>
        );
    else
        return (
            <div className='stations'>
                <div>
                    <Typography variant='h4'>Station</Typography>
                    <div>
                      <Chip label="Add Beat" color='primary' onClick={handleAdd} />
                      <Chip label="Delete Station" style={{backgroundColor:'red'}} color='secondary' onClick={handleDelete} />
                    </div>
                    
                </div>
                <div>
                  <div>
                    <Typography variant='h5'>Name: </Typography>
                    <Typography variant='h6' color='gray' >{station.name}</Typography>
                  </div>
                  <div>
                      <Typography variant='h5'>PI: </Typography>
                      <Typography variant='h6' color='gray' >{station?.pi}</Typography>
                  </div>
                  <div>
                      <Typography variant='h5'>Beats: </Typography>
                      <Typography variant='h6' color='gray' >{station.beats.length}</Typography>
                  </div>
                </div>
            <MapContainer center={position} zoom={9.5} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            { 
            station.beats.map((ele)=>{
              return (
                <>
                  <Polygon pathOptions={{ color: 'blue' }} positions={myFunc(ele.coords)} />
                  <Marker position={findCentroid(ele.coords)}>
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

export default Single_Station