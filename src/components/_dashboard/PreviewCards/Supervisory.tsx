// @ts-nocheck

import { FC, useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
// material
import { Card, Typography, CardHeader, Box, Divider } from "@mui/material";
// utils
import ReactApexChart from "react-apexcharts";
import superIcon from "../../../assets/super.svg";
import { getColor } from "../../../utility";


const SupervisoryPreview= () => {
  const [value, setValue] = useState(60);
  const [label, setlabel] = useState("PHCs Visited by State/LGHA Team")
  const tier = "National"

  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={superIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Supervision
            </Typography>
          </div>
        }
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <div style={{ width: "200px", marginTop: '10px' }}>
          {}
          {value && tier === "National" && (
            // <ReactApexChart
            //   options={chartData.options}
            //   series={chartData.series}
            //   type="radialBar"
            // />
            <GaugeChart id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[value, 100 - value]}
            colors={[getColor(value), '#ECF0FD']}
            percent={value / 100}
            arcPadding={0.02}
            textColor="#000"
            needleColor={getColor(value)}
            needleBaseColor="#000"
          />
          )}
        </div>

        <Typography
          style={{
            fontSize: "12px",
            marginTop: "0px",
            fontWeight: 500,
            color: "#525252",
            textAlign: "center",
          }}
          px={2}
        >
          {tier === "National" && (
            <span style={{ fontWeight: 600, color: getColor(value) }}>
              {" "}
              {value}%
            </span>
          )}{" "}
          {label}
        </Typography>

      </Box>
    </Card>
  );
};

export default SupervisoryPreview;
