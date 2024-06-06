import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useRef, useState, FC, useEffect } from "react";
import homeFill from "@iconify/icons-eva/home-outline";
import usersFill from "@iconify/icons-eva/people-outline";
import facilityFill from "@iconify/icons-ant-design/apartment-outline";
import questionFill from "@iconify/icons-eva/question-mark-circle-outline";
import wardFill from "@iconify/icons-eva/map-outline";

import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import { Button, Box, Divider, MenuItem, Typography } from "@mui/material";
// routes

import { MIconButton } from "../../components/@material-extend";
import MyAvatar from "../../components/MyAvatar";
import MenuPopover from "../../components/MenuPopover";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import { useAuthUserContext } from "../../context/authUser.context";
import { PATH_DASHBOARD } from "../../routes/paths";
import { levels } from "../../constants";

// ----------------------------------------------------------------------

interface IMENU {
  label: string;
  icon: any;
  linkTo: string;
}
const ADMIN_MENU_OPTIONS: IMENU[] = [
  // {
  //   label: "Home",
  //   icon: homeFill,
  //   linkTo: "/dashboard/app",
  // },

  {
    label: "MOC KPI",
    linkTo: PATH_DASHBOARD.settings.MocKPIManagement,
    icon: questionFill,
  },
  {
    label: "User Management",
    linkTo: PATH_DASHBOARD.settings.userManagement,
    icon: usersFill,
  },
];
const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/dashboard/app",
  },

  // {
  //   label: 'Profile',
  //   icon: personFill,
  //   linkTo: PATH_DASHBOARD.user.profile
  // },
  // {
  //   label: 'Settings',
  //   icon: settings2Fill,
  //   linkTo: PATH_DASHBOARD.user.account
  // }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [menuOptions, setmenuOptions] = useState<IMENU[]>([]);
  const isMountedRef = useIsMountedRef();
  const {
    handleSignOut,
    userState: { userProfile },
  } = useAuthUserContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      userProfile?.access.toLowerCase() === "viewer" || userProfile?.access.toLowerCase() === "admin"
    ) {
      setmenuOptions(MENU_OPTIONS);
    } else {
      setmenuOptions(ADMIN_MENU_OPTIONS);
    }
  }, [userProfile]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleSignOut();
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout", { variant: "error" });
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme: any) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <MyAvatar />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 250 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {userProfile?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userProfile?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {menuOptions.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
