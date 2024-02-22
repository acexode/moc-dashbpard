// @ts-nocheck

import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import qaIcon from "../../../assets/qa.svg";
import LinearProgress from "@mui/material/LinearProgress";
import { getColor, getLightColor } from "../../../utility";

const QualityAssessmentPreview = () => {
  const [progress, setprogress] = useState(85);
  const [label, setlabel] = useState("QA Score > 80");

  return (
    <Card style={{ height: "308px", overflow: "visible" }} className="card">
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={qaIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Quality Assessment
            </Typography>
          </div>
        }
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            position: "relative",
            width: "243px",
            background: `${getLightColor(progress)}`,
            border: `1px solid ${getLightColor(progress)}`,
            marginTop: "2rem",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "#fff",
              padding: "5px 16px",
              borderRadius: "20px",
            }}
          >
            {progress}
          </span>
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "15px",
              fontWeight: "800",
              color: `${progress < 40 ? "#000" : "#fff"}`,
            }}
          >
            {" "}
            QA Score
          </span>

          <Box
            sx={{
              height: "56px",
              width: `${progress}%`,
              background: getColor(progress),
              textAlign: "center",
              paddingTop: "15px",
              paddingLeft: "3px",
            }}
          ></Box>
        </Box>
        <Typography
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "#212B36",
            marginTop: "10px",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Card>
  );
};

export default QualityAssessmentPreview;
