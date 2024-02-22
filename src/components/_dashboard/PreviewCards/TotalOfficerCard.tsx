// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
//
import { FC, useEffect, useState } from "react";
import hrIcon from "../../../assets/hr.svg";

const HumanResourcesCardPreview = () => {
  const [options, setoptions] = useState({
    chart: {
      toolbar: {
        show: true
      }
    },

    xaxis: {
      categories: ['Midwives >= 2', 'CHEW >= 2'],
      // categories: ["2 or more Midwives","2 or more CHEWs"],
    },
    grid: {
      show: false, // Remove the grid lines
    },
    title: {
      text: "",
      floating: true,
      offsetY: -2,
      align: "right",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        barHeight: "10%",
        borderRadius: 8,
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        hideZeroBarsWhenGrouped: false,
        isDumbbell: true,
        dataLabels: {
          // position: 'top',
          maxItems: 100,
          hideOverflowingLabels: true,
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
              from: 81,
              to: 100,
              color: "#16b06a",
            },
          ],
        },
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "",
      data: [
        75,
        40,
      ],
     
    },
  ]);
  const [labels, setlabels] = useState(["", ""])
 

  


  return (
    <Card style={{ height: "308px", overflow: 'visible' }} className="card">
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
             <img src={hrIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Human Resources For Health
            </Typography>
          </div>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{   position: 'absolute', top: '25%', left: '5%' }}>
          <ReactApexChart options={options} series={series} type="bar" />
       
        </div>
  
      </Box>
    </Card>
  );
};

export default HumanResourcesCardPreview;
