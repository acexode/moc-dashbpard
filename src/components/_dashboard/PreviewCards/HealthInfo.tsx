// @ts-nocheck

import { FC, useState, useEffect } from "react";

// material
import { Card, Typography, CardHeader, Grid, Box } from "@mui/material";
// utils

import ReactApexChart from "react-apexcharts";
import healthIcon from "../../../assets/health.svg";

import { getColor, getLightColor } from "../../../utility";
import SvgIconStyle from "../../SvgIconStyle";
import NoteIcon from "../../../assets/notes";
import { indicatorSettings } from "../../../constants";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const HealthInfoPreview = () => {
  const [first, setfirst] = useState(70)
  const [label, setlabel] = useState("PHCs Submitting NHMIS Data")



  const chartData = {
    options: {
      chart: {
        toolbar: {
          show: true
        }
      },
      colors: [getColor(first || 0)],
      legend: {
        position: "bottom", // Place the legend at the bottom
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "60%",
            background: getLightColor(first || 0),
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: "#fff",
              fontSize: "20px",
              show: false,
              offsetY: 7,
              formatter: function (val) {
                return val ? val + "%" : 0;
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels on the slices
        background: {
          enabled: true,
          foreColor: "#fff",
          padding: 4,
          borderRadius: 2,
        },
      },
    },
    series: [parseInt(first || 0)],
  };
  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={healthIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Health Information Systems
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
        

        <div style={{ width: "200px", height: "120px", position: 'relative', top: "10px" }}>
          
          <div style={{ position: "absolute", left: "35%", top: "43%"}}>
            <NoteIcon color={getColor(first || 0)} />
          </div>
          {/* <img
            src={noteIcon}
            style={{
              width: "24px",
              position: "absolute",
              top: "50%",
              left: "47%",
              zIndex: "100",
            }}
          /> */}
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
          />
          {/* {first ? (
          ): null} */}
        </div>
        <Typography
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textAlign: "center",

          }}
          px={2}
          pt={3}
        >
          <span
            style={{
              fontWeight: 600,
              color: getColor(first),
            }}
          >
            {first}
          </span>
          % {label}
        </Typography>
      </Box>
    </Card>
  );
};

export default HealthInfoPreview;
