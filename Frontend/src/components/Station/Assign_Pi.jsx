import React, { useState,useEffect } from "react";
import { assignStation } from "../../actions/station";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Button,
  TextField,
  Box,
  Typography,
  DialogContent,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import CustomDialogHeader from "../UI/PopUpDialog";

const Assign_Pi = ({ open, onClose, station_id }) => {
  const dispatch = useDispatch();
  const [PI, setPI] = useState('');
  const { officers } = useSelector(
    (state) => state.station
  );

  const handleChange = (event) => {
    setPI(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const pi = data.get("pi");
    dispatch(assignStation(station_id,pi))
  };

  return (
    <>
      <Dialog maxWidth="xs" open={open} onClose={onClose}>
        <CustomDialogHeader onClose={onClose} />

        <DialogContent sx={{ p: 7 }}>
          <Typography variant="h5" fontWeight={600} align="center" pb={1}>
            Assign PI
          </Typography>
          <Typography color="ocean" align="center" variant="body2">
            Select PI from the dropdown below
          </Typography>
          <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
            <FormControl fullWidth>
                <InputLabel id="select-pi">Select PI</InputLabel>
                <Select
                    labelId="select-pi"
                    id="select-pi"
                    name='pi'
                    value={PI}
                    label="Select PI"
                    onChange={handleChange}
                    required
                >
                {
                    officers? officers.map(
                        (ele)=>
                        <MenuItem value={ele._id} key={ele._id}>{ele.email}</MenuItem>
                    ):null
                }
                </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Done
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Assign_Pi;
