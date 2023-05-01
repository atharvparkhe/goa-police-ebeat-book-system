import { useState,useEffect } from 'react';
import { addStation } from '../../actions/station';
import { getSubdivision } from '../../actions/subdivision';
import { useDispatch,useSelector } from 'react-redux'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,TextField } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon,useMapEvents } from 'react-leaflet'
import './Station.css'
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Add_Station = () => {
  const dispatch = useDispatch()
  const position = [15.422671837604284,73.98029707006378]
  const [locations, setLocations] = useState([]);
  const [add,setAdd] = useState(false)
  const [name,setName] = useState("")
  const alert = useAlert()
  const {id} = useParams()
  
  const { loading, error,message } = useSelector(
    (state) => state.station
  );
  const { loading:loading2,subdivision } = useSelector(
    (state) => state.subdivision
  );

  useEffect(()=>{
    dispatch(getSubdivision(id))
  },[])

  useEffect(() => {
    if (error) {
        if(error.msg)
            alert.error(error.msg)
        else
            alert.error("Something went wrong,check console");
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
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

  const handleAdd = () =>{
    document.getElementById('map').style.cursor = 'crosshair'
    setAdd(add ? false : true)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    document.getElementById('map').style.cursor = 'pointer'
    dispatch(addStation(name,id,locations))
    setAdd(false)
    setLocations([])
  }
  const handleReset = () =>{
    setLocations([])
  }
  

  function handleMapClick(event) {
    setLocations([...locations, event.latlng]);
  }
    

  function LocationMarkers() {
    useMapEvents({
        click(event) {
          handleMapClick(event);
        },
      });

    return (
      <>
        {locations.map((location, index) => (
          <Marker key={index} position={location}>
            <Popup>{`Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`}</Popup>
          </Marker>
        ))}
      </>
    );
  }

  if (loading || loading2 || !subdivision)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  else
    return (
      <div className='stations'>
        <Typography variant='h4'>Add Station</Typography>
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

        <MapContainer id='map' center={findCentroid(subdivision.coords)} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon pathOptions={{ color: 'purple' }} positions={myFunc(subdivision.coords)} />
          {add && <LocationMarkers />}
        </MapContainer>
        <form className='buttons' onSubmit={handleSubmit}>
            <Button variant='outlined'onClick={handleReset}>Reset</Button>
            <Button variant='outlined' onClick={handleAdd}>Add region</Button>
            <div>
                <input onChange={(e)=>setName(e.target.value)} type="text" required placeholder='name'/>
                <Button variant='outlined' type='submit'>Done</Button>
            </div>
        </form>
    </div>
    
  )
}

export default Add_Station