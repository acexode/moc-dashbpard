// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
//
import { FC, useState } from "react";
 // -------------------------------------------------------------------
interface IHumanResources {

}
const BarComponent: FC<IHumanResources> = ({

}) => {
  const [series, setSeries] = useState([
    {
        name: "",
        data: [
          20,
          50,
          60,80
        ],
        // Set different colors for each bar
      },
  ]);


  const [options] = useState({

    xaxis: {
      categories: ["Plan Submitted", "Plan Not Submitted","Retirement Submitted","Retirement Not Submitted"],
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
    chart: {
      toolbar: {
        show: false,
        offsetY: 30
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        barHeight: "10%",
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



  return (
    <Card style={{ height: "300px", overflow: 'visible' }} className="card">
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
           
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
             Budgeting
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
        <div style={{   position: 'absolute', top: '25%', left: '10%' }}>
          <ReactApexChart options={options} series={series} type="bar" height="200px" />
       
        </div>
       
      </Box>
    </Card>
  );
};

export default BarComponent;
