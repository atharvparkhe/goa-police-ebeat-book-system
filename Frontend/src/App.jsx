import "./App.css";
import { useEffect } from "react";
import Login from "./components/Login/Login";
import HomePi from "./components/Home/HomePi";
import HomeSp from './components/Home/HomeSp'
import HomeDysp from './components/Home/HomeDysp'
import Subdivision from './components/Subdivision/Subdivision'
import Add_Subdivision from "./components/Subdivision/Add_Subdivision";
import Single_Subdivision from "./components/Subdivision/Single_Subdivision";
import Station from './components/Station/Station'
import Add_Station from "./components/Station/Add_Station";
import Single_Station from "./components/Station/Single_Station";
import Pi_Station from "./components/Station/Pi_Station";
import Beat from './components/Beat/Beat'
import Add_Beat from "./components/Beat/Add_Beat";
import Single_Beat from "./components/Beat/Single_Beat";
import NotFound from './components/NotFound/NotFound'
import Settings from "./components/Settings/Settings";
import { useDispatch, useSelector } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import { Typography,Backdrop,CircularProgress } from "@mui/material";
import { loadUser } from "./actions/auth";

function App() {
  const { loading, isAuthenticated,role} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  else
    return (
    <>
      <StyledEngineProvider injectFirst>
        <Routes>
          <Route element={isAuthenticated?<Header />:<Login/>}>

            <Route path="/" element={isAuthenticated?
              role === 'sp'? <HomeSp/> :role === 'dysp'
                ?<HomeDysp/> : <HomePi/>
              :<Login/>} 
            />

            <Route path="/subdivision" element={isAuthenticated?
              role === 'sp' || role === 'dysp'? <Subdivision/> :<NotFound/>
              :<Login/>} 
            />
            <Route path="/add_subdivision" element={isAuthenticated?
              role === 'sp' || role === 'dysp'? <Add_Subdivision/> :<NotFound/>
              :<Login/>} 
            />
            <Route path="/subdivision/:id" element={isAuthenticated?
              role === 'sp' || role === 'dysp'? <Single_Subdivision/> :<NotFound/>
              :<Login/>} 
            />

            <Route path="/station" element={isAuthenticated?
              role === 'sp' || role === 'dysp'? <Station/> : role === 'pi'?<Pi_Station/>:<NotFound/>
              :<Login/>} 
            />
            <Route path="/add_station/:id" element={isAuthenticated?
              role === 'sp' || role === 'dysp'? <Add_Station/> :<NotFound/>
              :<Login/>} 
            />
            <Route path="/station/:id" element={isAuthenticated? <Single_Station/>:<Login/>} />

            <Route path="/beat" element={isAuthenticated?
              role === 'sp' || role === 'pi'? <Beat/> :<NotFound/>
              :<Login/>} 
            />
            <Route path="/beat/:id" element={isAuthenticated? <Single_Beat/>:<Login/>} />
            <Route path="/add_beat/:id" element={isAuthenticated? <Add_Beat/>:<Login/>} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={isAuthenticated?<Settings />:<Login/>} />
          </Route>
          <Route
            path="*"
            element={<Typography variant="h1">Opps! 404 Not Found!</Typography>}
          />
        </Routes>
      </StyledEngineProvider>
    </>
  );
}

export default App;
