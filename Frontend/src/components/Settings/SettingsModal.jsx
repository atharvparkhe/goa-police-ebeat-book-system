import * as React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// dynamically place content in modal
export default function SettingsModal({ isOpen, onCloseModal, formType }) {
  const formComponent = () => {
    switch (formType) {
      case "password":
        return <ChangePwdForm onSubmitForm={onCloseModal} />;
      case "admin":
        return <VerifyAdminForm />;
      case "admins":
        return <AllAdmins/>;
      case "remove":
          return <RemoveAdminForm onSubmitForm={onCloseModal}/>
      default:
        return <Typography variant="h5">Invalid Option!</Typography>;
    }
  };

  // modal component
  return (
    <div>
      <FormDialog
        maxWidth="lg"
        fullWidth
        open={isOpen}
        onClose={(e) => onCloseModal(e, "backdropClick")}
        TransitionComponent={Transition}
        disableEscapeKeyDown
      >
        {/* close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "0.5rem 0",
          }}
        >
          <IconButton
            edge="start"
            onClick={onCloseModal}
            aria-label="close"
            sx={{
              color: "primary.main",
              "& svg": { width: "1.2em", height: "1.2em" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* form */}
        {formComponent()}
      </FormDialog>
    </div>
  );
}
