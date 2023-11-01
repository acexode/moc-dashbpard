import React, { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

interface IViewDataModal {
  open: boolean;
  handleClose: () => void;
  title: string;
  rowData: any;
}

const ViewDataModal: FC<IViewDataModal> = ({
  open,
  handleClose,
  title,
  rowData,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ mt: 3 }} variant="h6" component="div">
                Governance.
              </Typography>
              <List>
                <Stack spacing={2}>
                  <ListItem secondaryAction="-Yes">
                    <ListItemText primary="Has the state provided BHCPF counterpart funds for (2022) fiscal year" />
                  </ListItem>
                  <ListItem secondaryAction="-Yes">
                    <ListItemText primary="Is there a functional SOC in place at the state level?" />
                  </ListItem>
                  <ListItem secondaryAction="-June, 2023">
                    <ListItemText primary="When was the last SOC meeting held?" />
                  </ListItem>
                </Stack>
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewDataModal;
