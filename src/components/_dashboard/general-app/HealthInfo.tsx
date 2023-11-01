// @ts-nocheck

import { FC } from "react";

// material
import { Card, Typography, CardHeader, Grid, Box } from "@mui/material";
// utils

import ReactApexChart from "react-apexcharts";
import healthIcon from "../../../assets/health.svg";
import { getColor } from "../../../utility";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const HealthInfo: FC<{ healthInfoData: any }> = ({ healthInfoData }) => {
  let remaindaer = 100 - healthInfoData?.indicator25;
  const chartData = {
    options: {
      colors: [getColor(healthInfoData?.indicator25 || 0)],
      legend: {
        position: "bottom", // Place the legend at the bottom
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "60%",
            background: getColor(healthInfoData?.indicator25 || 0),
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
              show: true,
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
    series: [parseInt(healthInfoData?.indicator25 || 0)],
  };
  return (
    <Card className="card" style={{ height: "250px" }}>
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
        <Typography
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textAlign: "center",
          }}
          px={2}
        >
          <span style={{ fontWeight: 600, color: getColor(healthInfoData?.indicator25), }}>{healthInfoData?.indicator25}</span>% PHCs NHMIS Data Submission
        </Typography>

        <div style={{ width: "200px" }}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
          />
          {/* {healthInfoData?.indicator25 ? (
          ): null} */}
        </div>
      </Box>
    </Card>
  );
};

export default HealthInfo;
