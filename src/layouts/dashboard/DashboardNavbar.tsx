import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// components
import { MHidden } from "../../components/@material-extend";
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { levels, roles } from "../../constants";
import Logo from "../../components/Logo";
import NavSection from "../../components/NavSection";
import sidebarConfig, { LGAConfig, StateConfig } from "./SidebarConfig";
import { useAuthUserContext } from "../../context/authUser.context";
import NavBarSection from "../../components/NavBarSection";
import GatewayPopover from "./MenuPopOver";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 0; // original value 280;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 60;
const APPBAR_DESKTOP = 60;

const RootStyle = styled(AppBar)(({ theme }) => ({
  // boxShadow: 'none',
  // backdropFilter: 'blur(6px)',
  // WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: "#212B36",
  // backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
  marginBottom: "1rem",
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }: any) {
  const { isCollapse } = useCollapseDrawer();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const getFontSize = () => {
    if (isSmallScreen) {
      return '1rem'; // Small font size for small screens
    } else if (isMediumScreen) {
      return '1.25rem'; // Medium font size for medium screens
    } else if (isLargeScreen) {
      return '1.5rem'; // Large font size for large screens
    }
  };
  const [sidebar, setsidebar] = useState<any>();
  const {
    userState: { userProfile },
  } = useAuthUserContext();
  useEffect(() => {
    if (userProfile?.access === "viewer") {
      setsidebar(StateConfig);
    } else {
      setsidebar(sidebarConfig);
    }
  }, [userProfile]);
  return (
    <RootStyle
      sx={{
        // ...(isCollapse && {
        width: { lg: `100%` },
        // })
      }}
    >
      <ToolbarStyle>
        <Grid container>
          <Grid xs={2} sx={{ display: "flex" }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 0.5, sm: 1.5 }}
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              <GatewayPopover />
            </Stack>
          </Grid>
          <Grid xs={8}>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              // spacing={{ xs: 1, sm: 2, md: 4 }}
              sx={{justifyContent: 'center', alignItems: 'center'}}
            >
              <Logo sx={{width: '25%'}} />
              <Typography pt={1} pl={2} sx={{fontSize: getFontSize(), textAlign:'center'}}>Ministerial Oversight Committee Dashboard</Typography>
            </Stack>
          </Grid>
          <Grid xs={2} sx={{ display: "flex" }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 0.5, sm: 1.5 }}
              sx={{ width: "100%", justifyContent: "flex-end" }}
            >
              <AccountPopover />
            </Stack>
          </Grid>

          {/* <div style={{display: 'flex', flex: '1', position: "absolute", right: "10px"}}>

        <MHidden width="mdUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1 }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

       
            </div> */}
        </Grid>
      </ToolbarStyle>
    </RootStyle>
  );
}
