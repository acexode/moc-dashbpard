import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useRef, useState, FC, useEffect } from "react";
import homeFill from "@iconify/icons-eva/home-outline";
import usersFill from "@iconify/icons-eva/people-outline";
import facilityFill from "@iconify/icons-ant-design/apartment-outline";
import questionFill from "@iconify/icons-eva/question-mark-circle-outline";
import wardFill from "@iconify/icons-eva/map-outline";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import { Button, Box, Divider, MenuItem, Typography, styled, ListItemIcon } from "@mui/material";
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
  {
    label: "MOC",
    linkTo: PATH_DASHBOARD.general.app,
    icon: questionFill,
  },
  {
    label: "NPHCDA",
    linkTo: PATH_DASHBOARD.general.nphcda,
    icon: questionFill,
  },
  {
    label: "NHIA",
    linkTo: PATH_DASHBOARD.general.nhia,
    icon: questionFill,
  },
  {
    label: "EMT",
    linkTo: PATH_DASHBOARD.general.emt,
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
const ListItemIconStyle = styled(ListItemIcon)({
    width: 25,
    height: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
export default function GatewayPopover() {
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
        //   width: 144,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
            //   borderRadius: "50%",
              position: "absolute",
            //   bgcolor: (theme: any) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Typography sx={{fontSize: '20px', color: '#fff'}}>Gateway</Typography>
        <Box
                component={Icon}
            
                icon={ open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 30, height: 30, color:"#fff" }}
              />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 250 }}
      >
        {menuOptions.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1,}}
          >
            <Box
              sx={{
    
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

      </MenuPopover>
    </>
  );
}
