// material
import { Box, useMediaQuery, useTheme } from "@mui/material";
import logo from "../assets/minOfHealth.svg";
import { useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

export default function Logo({ sx }: any) {
  const { pathname } = useLocation();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const getImageSize = () => {
    if (isSmallScreen) {
      return '60%'; // Small font size for small screens
    } else if (isMediumScreen) {
      return '50%'; // Medium font size for medium screens
    } else if (isLargeScreen) {
      return '30%'; // Large font size for large screens
    }
  };
  const itsAuth = pathname === "/auth/login";
  return (
    <Box sx={{ width: itsAuth ? '60%' : getImageSize(),  }}>
      <img alt="screen" src={logo} />
    </Box>
  );
}
