import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props: {
  foodName: string;
  submitAction: Function;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    await props.submitAction();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        {"Delete"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Delete ${props.foodName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this food?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleAction}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
