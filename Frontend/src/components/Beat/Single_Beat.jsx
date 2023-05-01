import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getBeat,removeBeat } from '../../actions/beat'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,Chip } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon } from 'react-leaflet'
import "./Beat.css"
import { useAlert } from 'react-alert'

const Single_Beat = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const position = [15.422671837604284,73.98029707006378]

    const { loading, error, beat,message } = useSelector(
        (state) => state.beat
    );
    
    useEffect(()=>{
        dispatch(getBeat(id))
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
    
    //   const handleClick = (sid) =>{
    //     navigate(`/beat/${sid}`)
    //   }

      const handleAdd = () =>{
        navigate(`/assign_beat/${id}`)
      }
      const handleDelete = () =>{
        dispatch(removeBeat(id))
        navigate('/')
      }
    
      if (loading || !beat)
        return (
          <Backdrop open={true}>
            <CircularProgress />
          </Backdrop>
        );
    else
        return (
            <div className='beats'>
                <div>
                    <Typography variant='h4'>Beat</Typography>
                    <div>
                      <Chip label="Assign Officer" color='primary' onClick={handleAdd} />
                      <Chip label="Delete Beat" style={{backgroundColor:'red'}} color='secondary' onClick={handleDelete} />
                    </div>
                    
                </div>
                <div>
                  <div>
                    <Typography variant='h5'>Name: </Typography>
                    <Typography variant='h6' color='gray' >{beat.name}</Typography>
                  </div>
                  <div>
                      <Typography variant='h5'>Constable: </Typography>
                      <Typography variant='h6' color='gray' >{beat?.constable}</Typography>
                  </div>
                </div>
            <MapContainer center={findCentroid(beat.coords)} zoom={15} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon pathOptions={{ color: 'orange' }} positions={myFunc(beat.coords)} />
        </MapContainer>
    </div>
        )
}

export default Single_Beat