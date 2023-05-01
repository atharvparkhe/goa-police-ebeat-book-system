import { useState,useEffect } from 'react';
import { addSubdivision } from '../../actions/subdivision'
import { useDispatch,useSelector } from 'react-redux'
import "leaflet/dist/leaflet.css"
import { Typography,Backdrop,CircularProgress,Button,TextField } from '@mui/material'
import { MapContainer, TileLayer,Popup,Marker,Polygon,useMapEvents } from 'react-leaflet'
import './Subdivision.css'
import { useAlert } from 'react-alert';

const Add_Subdivision = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const position = [15.422671837604284,73.98029707006378]
  const [locations, setLocations] = useState([]);
  const [add,setAdd] = useState(false)
  const [name,setName] = useState("")
  
  const { loading, error,message } = useSelector(
    (state) => state.subdivision
  );

  const goa_border = [
    {"lat":"15.726829682028878","lng":"73.66880451769835"},{"lat":"15.486800446480933","lng":"73.7359933601824"},{"lat":"15.404736152469617","lng":"73.76619952102976"},{"lat":"15.285552955174065","lng":"73.84720695239317"},{"lat":"15.081428641524179","lng":"73.89399147640482"},{"lat":"14.885766349609272","lng":"74.03678423677418"},{"lat":"14.900015755515522","lng":"74.08557259476795"},{"lat":"14.9239011725739","lng":"74.1250465549662"},{"lat":"14.912290537153128","lng":"74.16177450054198"},{"lat":"14.943803659901192","lng":"74.15044719022421"},{"lat":"14.96204598588673","lng":"74.16898278892602"},{"lat":"14.949110678346365","lng":"74.19404017235622"},{"lat":"14.933189229452035","lng":"74.20262146805149"},{"lat":"14.953754211827366","lng":"74.22424633320358"},{"lat":"14.970337439277914","lng":"74.24072242093851"},{"lat":"15.003168442343648","lng":"74.25342273856751"},{"lat":"15.028368620767804","lng":"74.28053963296458"},{"lat":"15.063843961777609","lng":"74.28877959183663"},{"lat":"15.098317849270389","lng":"74.27127374861826"},{"lat":"15.14836131958868","lng":"74.28431731807507"},{"lat":"15.183152787915152","lng":"74.31520998257805"},{"lat":"15.22489498226987","lng":"74.29701763570407"},{"lat":"15.250731242730616","lng":"74.25514091271117"},{"lat":"15.279213694543511","lng":"74.27470626689639"},{"lat":"15.290473132382042","lng":"74.33443208493549"},{"lat":"15.366624011469279","lng":"74.31967225633959"},{"lat":"15.416934558146453","lng":"74.26990074130701"},{"lat":"15.495024153213778","lng":"74.24930563163838"},{"lat":"15.530088702512947","lng":"74.28294431076382"},{"lat":"15.568454395180668","lng":"74.24587311336025"},{"lat":"15.62367519179074","lng":"74.2565139200224"},{"lat":"15.654420445701918","lng":"74.25102189077742"},{"lat":"15.650453575740322","lng":"74.20674240498978"},{"lat":"15.680864277785268","lng":"74.1844310361821"},{"lat":"15.651775874277806","lng":"74.1566276381294"},{"lat":"15.648139532728075","lng":"74.11303465599741"},{"lat":"15.627642580789624","lng":"74.07321744397133"},{"lat":"15.621691468480275","lng":"74.03237047646184"},{"lat":"15.605159694262635","lng":"74.02138641797187"},{"lat":"15.611111286536515","lng":"73.99186676078011"},{"lat":"15.637560717055903","lng":"73.96234710358841"},{"lat":"15.681194804018606","lng":"73.96303360724401"},{"lat":"15.699042425460796","lng":"73.94278174940318"},{"lat":"15.732419892347565","lng":"73.94243849757534"},{"lat":"15.746628439536945","lng":"73.906740307483"},{"lat":"15.752906318392812","lng":"73.87310162835752"},{"lat":"15.774381804634286","lng":"73.87619089480785"},{"lat":"15.796515695402908","lng":"73.8648635844901"},{"lat":"15.783962442105588","lng":"73.84804424492735"},{"lat":"15.763479149426711","lng":"73.83019514988116"},{"lat":"15.74035036672079","lng":"73.81612182494091"},{"lat":"15.7350634181707","lng":"73.7903779378551"},{"lat":"15.735393856482489","lng":"73.74506869658406"},{"lat":"15.721514985204466","lng":"73.72172757229289"}
    ]
  
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

  const handleAdd = () =>{
    document.getElementById('map').style.cursor = 'crosshair'
    setAdd(add ? false : true)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    document.getElementById('map').style.cursor = 'pointer'
    console.log(locations)
    dispatch(addSubdivision(name,locations))
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

  if (loading )
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  else
    return (
      <div className='subdivisions'>
        <Typography variant='h4'>Add Subdivision</Typography>
        <MapContainer id='map' center={position} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {
            <Polygon pathOptions={{ color: 'purple' }} positions={myFunc(goa_border)} />
          } */}
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

export default Add_Subdivision