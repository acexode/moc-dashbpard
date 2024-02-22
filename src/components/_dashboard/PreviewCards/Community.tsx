// @ts-nocheck

import { FC, useEffect, useState } from "react";

// material
import { Card, Typography, CardHeader, Box, Divider } from "@mui/material";
// utils
import ReactApexChart from "react-apexcharts";
import commIcon from "../../../assets/comm.svg";
import { getColor } from "../../../utility";
import { AllIndicators } from "../../settings/allIndicators";
import { indicatorSettings } from "../../../constants";
import useSettings from "../../../hooks/useSettings";

const CommunityPreview = () => {
  const [first, setfirst] = useState(97)
  const [second, setsecond] = useState(99)
  const [labels, setlabels] = useState([" PHCs that Conduct Sensitization and Awareness Creation Services", "PHCs with Functional WDCs"])


  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={commIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Community Linkage
            </Typography>
          </div>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "1rem"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "15px 18px",
            borderRadius: "4px",
            color: "#fff",
            background: getColor(first),
          }}
        >
          {first}%
        </div>
        <Typography
          px={2}
          style={{
            fontSize: "0.7rem",
            fontWeight: 400,
            color: "#212B36",
            textAlign: "start",
            position: "relative",
            // right: 0,
            // top: -27,
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: getColor(first),
              fontWeight: 600,
              paddingTop: "1rem",
            }}
            className="customChart"
          >
            {first}%
          </span>{" "}
          {labels[0]}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "15px 18px",
            borderRadius: "4px",
            color: "#fff",
            background: getColor(second),
          }}
        >
          {second}%
        </div>
      </Box>

      <Typography
        style={{
          fontSize: "10px",
          marginTop: "5px",
          fontWeight: 500,
          color: "#525252",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 800,
            color: getColor(second),
            textAlign: "center",
          }}
        >
          {" "}
          {second}%
        </span>{" "}
        {labels[1]}
      </Typography>
    </Card>
  );
};

export default CommunityPreview;
//
