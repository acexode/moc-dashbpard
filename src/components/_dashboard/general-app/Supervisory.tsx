// @ts-nocheck

import { FC, useEffect, useState } from "react";

// material
import { Card, Typography, CardHeader, Box, Divider } from "@mui/material";
// utils
import ReactApexChart from "react-apexcharts";
import superIcon from "../../../assets/super.svg";
import { getColor } from "../../../utility";

interface ISupervisory {
  supportiveSupervision: any;
  tier: string;
}

const Supervisory: FC<ISupervisory> = ({ supportiveSupervision, tier }) => {
  const [value, setValue] = useState();
  console.log(supportiveSupervision);
  useEffect(() => {
    if (supportiveSupervision) {
      setValue(parseInt(supportiveSupervision[0]?.indicator32National * 100));
    }
  }, [supportiveSupervision]);
  const chartData = {
    options: {
      colors: [getColor(value)],

      legend: {
        position: "bottom", // Place the legend at the bottom
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "60%",
            background: getColor(value),
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
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shade: "dark",
      //     type: "vertical",
      //     gradientToColors: ["#E9B601"],
      //     stops: [0, 100]
      //   }
      // },
    },
    series: [value], // Replace with your data values
  };
  return (
    <Card className="card" style={{ height: "250px" }}>
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
            <span style={{ fontWeight: 600, color: getColor(value) }}> {value}%</span>
          )}
          {' '}Supervisory Visits Conducted by States (SPHCB/A) to PHCs
        </Typography>

        <div style={{ width: "200px" }}>
          {}
          {value && tier === "National" && (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="radialBar"
            />
          )}
        </div>
      </Box>
    </Card>
  );
};

export default Supervisory;
