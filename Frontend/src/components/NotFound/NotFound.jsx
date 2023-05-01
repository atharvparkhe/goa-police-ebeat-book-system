import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import classes from './not-found.module.css'

const NotFound = () => {
  return (
    <Box className={classes.container}>
      <Typography className={classes.errorTitle}variant="h1">404</Typography>
      <Typography className={classes.title} variant="h2">You have found a secret place.</Typography>
      <Typography className={classes.body} variant="body1">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Typography>
      <Button className={classes.backBtn} variant="contained" component={Link} to="/">
        Take me back to home
      </Button>
    </Box>
  );
};
export default NotFound;
