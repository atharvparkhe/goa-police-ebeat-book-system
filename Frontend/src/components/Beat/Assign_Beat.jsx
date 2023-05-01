import React, { useState,useEffect } from "react";
import { assignBeat } from "../../actions/beat"; 
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

const Assign_Beat = ({ open, onClose, beat_id }) => {
  const dispatch = useDispatch();
  const [constable, setConstable] = useState('');
  const { constables } = useSelector(
    (state) => state.beat
  );

  const handleChange = (event) => {
    setConstable(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const bo = data.get("bo");
    dispatch(assignBeat(beat_id,bo))
  };

  return (
    <>
      <Dialog maxWidth="xs" open={open} onClose={onClose}>
        <CustomDialogHeader onClose={onClose} />

        <DialogContent sx={{ p: 7 }}>
          <Typography variant="h5" fontWeight={600} align="center" pb={1}>
            Assign BO
          </Typography>
          <Typography color="ocean" align="center" variant="body2">
            Select BO from the dropdown below
          </Typography>
          <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
            <FormControl fullWidth>
                <InputLabel id="select-pi">Select PI</InputLabel>
                <Select
                    labelId="select-BO"
                    id="select-bo"
                    name='bo'
                    value={constable}
                    label="Select BO"
                    onChange={handleChange}
                    required
                >
                {
                    constables? constables.map(
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

export default Assign_Beat;
