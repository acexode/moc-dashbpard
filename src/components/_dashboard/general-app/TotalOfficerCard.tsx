// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
//
import { FC, useEffect, useState } from "react";
import hrIcon from "../../../assets/hr.svg";
// -------------------------------------------------------------------
interface IHumanResources {
  midIndicator: any;
  chewIndicator: any;
  tier: string
  state: string
}
const HumanResourcesCard: FC<IHumanResources> = ({
  chewIndicator,
  midIndicator,
  tier,
  state
}) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (chewIndicator && midIndicator) {
      // console.log(chewIndicator, midIndicator);
      const mid = tier === 'State' ? midIndicator.filter(e => e?.state === state)[0] : midIndicator[0]
      const chew = tier === 'State' ? chewIndicator.filter(e => e?.state === state)[0] :  chewIndicator[0]
      if(mid && chew){
        setSeries([
          {
            name: "Human Resource",
            data: [
              (mid['indicator20' + tier] * 100).toFixed(1),
              (chew['indicator21' + tier] * 100).toFixed(1),
            ],
            // Set different colors for each bar
          },
        ]);

      }else{
        setSeries([
          {
            name: "",
            data: [
              0,
              0,
            ],
            // Set different colors for each bar
          },
        ]);
      }
    }
  }, [chewIndicator, midIndicator]);

  const [options] = useState({
    chart: {
      id: "basic-bar",
      // Set the height of the chart
    },

    xaxis: {
      categories: ["Midwives >= 2", "CHEWs >= 2"],
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
    <Card style={{ height: "250px", overflow: 'visible' }} className="card">
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
        <div style={{   position: 'absolute', top: '25%', left: '10%' }}>
          <ReactApexChart options={options} series={series} type="bar" />
       
        </div>
        {/* <div style={{ position: "relative", top: "-35px", left: '30px' }}>
          <Typography
            style={{ fontSize: "12px",  color: "#212B36" }}
          >
            2 or more Midwives
          </Typography>
          <Typography
            style={{ fontSize: "12px",  color: "#212B36" }}
          >
            2 or more Chews
          </Typography>
        </div> */}
      </Box>
    </Card>
  );
};

export default HumanResourcesCard;
