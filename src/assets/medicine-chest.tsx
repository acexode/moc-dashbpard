// material
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { FC } from "react";

// ----------------------------------------------------------------------

const MedicineChestIcon: FC<{color: string}> = ({ color }) => {


  return (
    <Box  >
      <svg width="51" height="45" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_21_757"  maskUnits="userSpaceOnUse" x="1" y="2" width="29" height="27">
<path d="M25.8327 10.3335H5.16602C4.09596 10.3335 3.22852 11.2009 3.22852 12.271V25.1876C3.22852 26.2577 4.09596 27.1251 5.16602 27.1251H25.8327C26.9027 27.1251 27.7702 26.2577 27.7702 25.1876V12.271C27.7702 11.2009 26.9027 10.3335 25.8327 10.3335Z" fill="white" stroke="white" stroke-width="2.58333" stroke-linejoin="round"/>
<path d="M12.2702 5.1668H18.7285V2.58347H12.2702V5.1668ZM19.3743 5.81263V10.3335H21.9577V5.81263H19.3743ZM11.6243 10.3335V5.81263H9.04102V10.3335H11.6243ZM18.7285 5.1668C18.8998 5.1668 19.0641 5.23484 19.1852 5.35596C19.3063 5.47708 19.3743 5.64135 19.3743 5.81263H21.9577C21.9577 4.9562 21.6175 4.13485 21.0119 3.52927C20.4063 2.92368 19.5849 2.58347 18.7285 2.58347V5.1668ZM12.2702 2.58347C11.4138 2.58347 10.5924 2.92368 9.98682 3.52927C9.38123 4.13485 9.04102 4.9562 9.04102 5.81263H11.6243C11.6243 5.64135 11.6924 5.47708 11.8135 5.35596C11.9346 5.23484 12.0989 5.1668 12.2702 5.1668V2.58347Z" fill="white"/>
<path d="M11.6241 18.7292H19.3741M15.4991 14.8542V22.6042" stroke="black" stroke-width="2.58333" stroke-linecap="round" stroke-linejoin="round"/>
</mask>
<g mask="url(#mask0_21_757)">
<path d="M0 -1.52588e-05H31V31H0V-1.52588e-05Z" fill={color} />
</g>
</svg>

    </Box>
  );
}

export default MedicineChestIcon;

