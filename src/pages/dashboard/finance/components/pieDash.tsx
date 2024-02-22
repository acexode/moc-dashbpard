// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
//
import { FC, useState } from "react";
 // -------------------------------------------------------------------
interface IHumanResources {

}
const PieComponent: FC<IHumanResources> = ({

}) => {
  const [series, setSeries] = useState([20,50,60]);
  const [options] = useState({
    chart: {
      id: "donut-chart", // Change the chart ID to "donut-chart" for the donut chart
    },
  
    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Set the size of the donut chart
        },
      },
    },
  
    labels: ["Approved", "Rejected", "Pending Review"], // Use labels instead of categories for donut chart
  
    title: {
      text: "",
      floating: true,
      offsetY: -2,
      align: "right",
    },
    
    dataLabels: {
      enabled: false,
      formatter: function (val, opts) {
        return opts.w.config.labels[opts.seriesIndex] + ": " + val + "%";
      },
    },
  
    colors: ["#ff2727", "#e9b600", "#16b06a"], // Use colors directly instead of defining ranges
  });
  

  return (
    <Card style={{ height: "300px", overflow: 'visible' }} className="card">
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
           
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
             Business Plan
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
          <ReactApexChart options={options} series={series} type="donut" width="100%" />
       
        </div>
       
      </Box>
    </Card>
  );
};

export default PieComponent;
