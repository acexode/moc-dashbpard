// @ts-nocheck

import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import qaIcon from "../../../assets/qa.svg";
interface IQuality {
  indicator: any;
  tier: string;
  state: string;
}

const QualityAssessment: FC<IQuality> = ({ indicator, tier, state }) => {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    if (indicator) {
      const i =
        tier === "State"
          ? indicator.filter((e) => e?.state === state)[0]
          : indicator[0];
      if (i) {
        setSeries([
          {
            name: "Quality Assessment",
            data: [parseInt(i["indicator39" + tier] * 100)],
            // Set different colors for each bar
          },
        ]);
      } else {
        setSeries([
          {
            name: "Quality Assessment",
            data: [0],
            // Set different colors for each bar
          },
        ]);
      }
    }
  }, [indicator]);
  const [options] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["> 80%"],
    },
    grid: {
      show: false, // Remove the grid lines
    },
    title: {
      text: "Latest QA scores",
      floating: true,
      offsetY: -2,
      align: "center",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          total: {
            enabled: true,
            // formatter: (val) => val + '%',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#373d3f",
              fontSize: "16px",
              fontWeight: 800,
            },
          },
        },
        colors: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#ff2727",
            },
            {
              from: 51,
              to: 79,
              color: "#e9b600",
            },
            {
              from: 80,
              to: 100,
              color: "#16b06a",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return val + "%";
      },
      style: {
        fontSize: "16px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
  });

  return (
    <Card style={{ height: "250px", overflow: "visible" }} className="card">
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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {indicator && (
          <ReactApexChart options={options} series={series} type="bar" />
        )}
        {/* <div >
          </div> */}
      </Box>
    </Card>
  );
};

export default QualityAssessment;
