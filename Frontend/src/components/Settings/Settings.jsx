import { useState,useEffect } from "react";
import { Container, Button, Typography, Box, Divider,CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";
import classes from "./settings.module.css";
import {logoutUser} from '../../actions/auth'
import {useDispatch,useSelector} from "react-redux"
import { useAlert } from "react-alert";

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "1.1rem",
  padding: "1rem 2rem",
  borderRadius: "10px",
  "& svg": {
    width: "30px",
    height: "30px",
  },
}));

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [btnType, setBtnType] = useState("");

  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, message, loading} = useSelector(
    (state) => state.user
  );

  useEffect(()=>{
    if(error){
        alert.error("Something went wrong,check console")
        dispatch({type:"clearError"})
    }
    if(message){
        alert.success(message)
        dispatch({type:"clearMessage"})
    }
  },[dispatch,error,message,alert])

  // close modal
  const handleClose = (e, reason) => {
    if (reason !== "backdropClick") setOpen(false);
  };

  // Send button type data to Dialog
  // Except logout button
  const formTypeHandler = (type) => {
    setBtnType(() => type);
    if (type !== "logout") setOpen(true);
    else{
      dispatch(logoutUser())
    }
  };

  const SETTING_BTNS = [
    {
      name: "log out",type: "logout",
      icon: <LogoutIcon sx={{ color: red[400] }} />
    },
  ];

  return (
    loading ? <CircularProgress/> :
    <>
      <Typography component="h1" variant="h5" className={classes.page_title}>
        <SettingsIcon fontSize="2rem" />
        Settings
      </Typography>
      <Container maxWidth="lg" sx={{ minHeight: "calc(100vh - 200px)" }}>
        {/* buttons */}
        <Box className={classes.button_container}>
          {SETTING_BTNS.map((btn) => (
            <div key={btn.type}>
              <CustomButton
                className={classes.button}
                variant="text"
                startIcon={btn.icon}
                onClick={formTypeHandler.bind(null, btn.type)}
              >
                {btn.name}
              </CustomButton>
              <hr className={classes.divider} />
            </div>
          ))}
        </Box>

        {/* form modal */}
        {/* {open && (
          <SettingsModal
            formType={btnType}
            isOpen={open}
            onCloseModal={handleClose}
          />
        )} */}
      </Container>
    </>
  );
};

export default Settings;
