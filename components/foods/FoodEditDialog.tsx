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
  const [open, setOpen] = React.useState<boolean>(false);
  const [foodName, setFoodName] = React.useState<string>(props.foodName);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    await props.submitAction(foodName);
    setOpen(false);
  };

  const setFoodNameHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setFoodName((prev) => e.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {"Edit"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Edit ${props.foodName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>Set the Foods name:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name of the food:"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={foodName}
            onChange={(e) => setFoodNameHandler(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleAction}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
