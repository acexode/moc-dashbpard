import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';

interface IDialog {
    open: boolean,
    handleClose: () => void,
    loading: boolean,
    handleSubmit: () => any

}
 const AlertDialog:React.FC<IDialog> = ({open,handleClose,loading,handleSubmit}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Assessment Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to submit this assessment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
        size="medium"
        type="submit"
        variant="contained"
          onClick={handleClose}
          sx={{background:"hsl(148, 37%, 59%)"}}
      >
        No
      </Button>
          <LoadingButton
        size="medium"
        type="submit"
        variant="contained"
          loading={loading}
          onClick={handleSubmit}
      >
        Yes
      </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog