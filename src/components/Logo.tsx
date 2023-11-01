// material
import { Box } from "@mui/material";
import logo from "../assets/minOfHeath-logo.png";
import logod from "../assets/minOfHeath-white-logo.png";
import { useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

export default function Logo({ sx }: any) {
  const { pathname } = useLocation();
  const itsAuth = pathname === "/auth/login";
  return (
    <Box sx={{ width: itsAuth ? 200 : 150, height: 40, ...sx }}>
      <img alt="screen" src={itsAuth ? logo : logod} />
    </Box>
  );
}
