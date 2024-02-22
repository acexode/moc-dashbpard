// @ts-nocheck
import { useState, FC } from "react";
import { Icon } from "@iconify/react";
import CloseFill from "@iconify/icons-eva/close-fill";
import options2Fill from "@iconify/icons-eva/options-2-fill";
// material
import {
  Box,
  Backdrop,
  Paper,
  Tooltip,
  Divider,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import { MIconButton } from "../../@material-extend";
import Scrollbar from "../../Scrollbar";
import useSettings from "../../../hooks/useSettings";
import TrendChart from "./TrendChart";
import { DefaultState } from "../../../utility/processIndicator";

//---------------------------------------------------------

const DRAWER_WIDTH = 660;

const TrendsModal: FC<{selectedState: DefaultState}> = ({selectedState}) => {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = "sm";
  const { enqueueSnackbar } = useSnackbar();
  const { handleShowTrendModal, showTrendModal, selectedIndicatorTitle, fetchedIndicators, selectedIndicator } = useSettings();

  const handleClose = () => {
    handleShowTrendModal(false);
  };

  return (
    <>
      <Dialog
        // fullWidth={fullWidth}

        maxWidth={maxWidth}
        open={showTrendModal}
        onClose={handleClose}
      >
        <DialogTitle>{selectedIndicatorTitle} Trends</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ width: "50vw" }}>
          <DialogContentText>
            {/* You can set my maximum width and whether to adapt or not. */}
          </DialogContentText>

          <TrendChart selectedState={selectedState} />
        </DialogContent>
      </Dialog>
    </>
  );
}
export default TrendsModal;
