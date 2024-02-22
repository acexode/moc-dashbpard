// @ts-nocheck
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
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
} from "@mui/material";
import { MIconButton } from "../../components/@material-extend";
import Scrollbar from "../../components/Scrollbar";
import IndicatorSettings from "../../components/settings/Settings";
import useSettings from "../../hooks/useSettings";
import { useSnackbar } from "notistack";
import { indicatorSettings } from "../../constants";
import { indicatorBoard } from "../../components/settings/board";
//
// import SettingMode from './SettingMode';
// import SettingColor from './SettingColor';
// import SettingStretch from './SettingStretch';
// import SettingDirection from './SettingDirection';
// import SettingFullscreen from './SettingFullscreen';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 660;

export default function Settings() {
  const [open, setOpen] = useState(false);
  const { handleIndicatorChange, indicatorUpdates, handleIndicatorUpdates } =
    useSettings();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    // setOpen(false);
    const column = indicatorUpdates.columnOrder[1];
    const cards = indicatorUpdates.columns[column].cardIds;
    console.log(cards);
    if (cards.length < 14) {
      enqueueSnackbar(
        "You have less than 14 indicators, Dashboard requires 14 indicators",
        {
          variant: "error",
        }
      );
    } else if (cards.length > 14) {
      enqueueSnackbar(
        "You have more than 14 indicators, Dashboard requires 14 indicators",
        {
          variant: "error",
        }
      );
    }
    {
      setOpen(false);
      handleIndicatorChange(indicatorUpdates);
      enqueueSnackbar("Update success", { variant: "success" });
      localStorage.setItem(indicatorSettings, JSON.stringify(indicatorUpdates));
    }
  };

  const handleReset = () => {
    localStorage.removeItem(indicatorSettings);
    handleIndicatorChange(null);
    handleIndicatorUpdates(null);
    enqueueSnackbar("Successfully reset changes", { variant: "success" });
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Backdrop
        sx={{
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      />

      <Box
        sx={{
          top: 32,
          bottom: 12,
          right: 0,
          position: "fixed",
          zIndex: 2001,
          ...(open && { right: 12 }),
        }}
      >
        <Box
          sx={{
            p: 0.5,
            px: "4px",
            mt: -3,
            left: -44,
            top: "50%",
            color: "grey.800",
            position: "absolute",
            bgcolor: "common.white",
            borderRadius: "24px 0 16px 24px",
            boxShadow: (theme: { customShadows: { z12: any } }) =>
              theme.customShadows.z12,
          }}
        >
          <Tooltip title="Settings">
            <MIconButton
              color="inherit"
              onClick={handleToggle}
              sx={{
                p: 0,
                width: 40,
                height: 40,
                transition: (theme: {
                  transitions: { create: (arg0: string) => any };
                }) => theme.transitions.create("all"),
                "&:hover": { color: "primary.main", bgcolor: "transparent" },
              }}
            >
              <Icon
                icon={open ? closeFill : options2Fill}
                width={20}
                height={20}
              />
            </MIconButton>
          </Tooltip>
        </Box>

        <Paper
          sx={{
            height: 1,
            width: "0px",
            overflow: "hidden",
            boxShadow: (theme: { customShadows: { z24: any } }) =>
              theme.customShadows.z24,
            transition: (theme: {
              transitions: { create: (arg0: string) => any };
            }) => theme.transitions.create("width"),
            ...(open && { width: "100vw" }),
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 2, pr: 1, pl: 2.5 }}
          >
            <Typography variant="subtitle1">Settings</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button onClick={handleReset}>Reset Changes</Button>
              <Button sx={{ mx: 2.5 }} onClick={handleClose}>
                Apply Changes
              </Button>
            </Stack>
          </Stack>
          <Divider />

          <Scrollbar sx={{ height: 1 }}>
            <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
              <Stack spacing={1.5}>
                <IndicatorSettings />
              </Stack>
            </Stack>
          </Scrollbar>
        </Paper>
      </Box>
    </>
  );
}
