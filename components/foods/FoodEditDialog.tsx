import * as React from "react";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormDialog from "../ui/FormDialog";

export default function FoodEditDialog(props: {
  foodName: string;
  onSubmitHandler: Function;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FormDialog
      title={props.foodName}
      buttonTitle="edit"
      onSubmitHandler={props.onSubmitHandler}
      buttonCancelTitle="cancel"
    >
      <DialogContent>
        <DialogContentText>Set the Foods name before save!</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="name of the food:"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={props.foodName}
        />
      </DialogContent>
    </FormDialog>
  );
}
