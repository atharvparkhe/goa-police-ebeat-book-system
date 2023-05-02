import { useState, useContext } from "react";
import classes from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import {
  Analytics,
  AnalyticsOutlined,
  Apartment,
  ApartmentOutlined,
  TrackChanges,
  TrackChangesOutlined,
  Map,
  MapOutlined,
  Settings,
  SettingsOutlined,
  Close,
} from "@mui/icons-material";
import { Typography, IconButton,CircularProgress } from "@mui/material";
import logo from "../../assets/goa_police.png";
import { MenuContext } from "react-flexible-sliding-menu";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [tab, setTab] = useState(window.location.pathname);
  const { toggleMenu } = useContext(MenuContext);
  
  const { message, loading, error, role} = useSelector(
    (state) => state.user
  );
  
  if (loading)
    return (
        <CircularProgress />
    );
  else
    return (
    <div className={classes.sidebar}>
      <IconButton
        className={classes.close_btn}
        onClick={toggleMenu}
        aria-label="close sidebar menu"
      >
        <Close className={classes.close} />
      </IconButton>
      <div className={classes.menu}>

        {/* home */}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={(e) => {
            // handleClick(e.currentTarget, "");
            setTab("/");
            toggleMenu();
          }}
        >
          {tab === "/" ? (
            <Analytics style={{ color: "#0008C1" }} />
          ) : (
            <AnalyticsOutlined />
          )}
          <Typography variant="subtitle1">Insights</Typography>
        </NavLink>
        
        {/* SubDivision */}
        {
          role === 'sp' || role === 'dysp' ? 
            <NavLink
            to="/subdivision"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            onClick={(e) => {
              setTab("/subdivision");
              toggleMenu();
            }}
          >
            {tab === "/subdivision" ? (
              <Map style={{ color: "#0008C1" }} />
            ) : (
              <MapOutlined />
            )}
            <Typography variant="subtitle1">Subdivisions</Typography>
          </NavLink>
          :null
        }

        {/* Station */}
        {
          role === 'sp' || role === 'dysp' || role === 'pi' ? 
            <NavLink
            to="/station"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            onClick={(e) => {
              setTab("/station");
              toggleMenu();
            }}
          >
            {tab === "/station" ? (
              <Apartment style={{ color: "#0008C1" }} />
            ) : (
              <ApartmentOutlined />
            )}
            <Typography variant="subtitle1">Stations</Typography>
          </NavLink>
          :null
        }

        {/* Beat */}
        {
          role === 'sp' || role === 'pi'?
          <NavLink
            to="/beat"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            onClick={(e) => {
              setTab("/beat");
              toggleMenu();
            }}
          >
            {tab === "/beat" ? (
              <TrackChanges style={{ color: "#0008C1" }} />
            ) : (
              <TrackChangesOutlined />
            )}
            <Typography variant="subtitle1">Beats</Typography>
          </NavLink>
          :null
        }
        
        
        {/* settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={(e) => {
            setTab("/settings");
            toggleMenu();
          }}
        >
          {tab === "/settings" ? (
            <Settings style={{ color: "#0008C1" }} />
          ) : (
            <SettingsOutlined />
          )}
          <Typography variant="subtitle1">Settings</Typography>
        </NavLink>

      </div>
      {/* logo */}
      <div className={classes.sidebar_logo}>
        <img
          className={classes.sidebar_logo_img}
          src={logo}
          alt="Goa Police Logo"
        />
      </div>
    </div>
  );
};

export default Sidebar;
