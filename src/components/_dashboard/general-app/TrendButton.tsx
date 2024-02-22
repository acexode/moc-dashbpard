// @ts-nocheck
import React, {FC} from "react";
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import trending from "@iconify/icons-eva/trending-up-fill";
import useSettings from "../../../hooks/useSettings";

const TrendButton: FC<{indicator: any, title: string}> =  ({indicator, title}) => {

  const { handleShowTrendModal, handleSelectedIndicator,  setselectedIndicatorTitle } = useSettings();
  const handleClick = () => {
    handleSelectedIndicator(indicator);
    setselectedIndicatorTitle(title)
    handleShowTrendModal(true)
  }

  return (
    <Typography
      onClick={handleClick}
      style={{
        fontSize: "10px",
        fontWeight: 500,
        color: "green",
        position: "absolute",
        right: "30px",
        top: "25px",
        cursor: "pointer",
      }}
    >
      Show Trends{" "}
      <Box
        component={Icon}
        icon={trending}
        sx={{
          width: 10,
          height: 10,
          ml: 1,
          position: "absolute",
          right: "-20px",
        }}
      />
    </Typography>
  );
};

export default TrendButton;
