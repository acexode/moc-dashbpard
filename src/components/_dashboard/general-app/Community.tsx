// @ts-nocheck

import { FC } from "react";

// material
import { Card, Typography, CardHeader, Box, Divider } from "@mui/material";
// utils
import ReactApexChart from "react-apexcharts";
import commIcon from "../../../assets/comm.svg";
import { getColor } from "../../../utility";

const CommunityLinkeage: FC<{
  communityLinkeageData: any;
  communityLinkeageDataSecond: any;
}> = ({ communityLinkeageData, communityLinkeageDataSecond }) => {
  let remainder = 100 - communityLinkeageData?.indicator35;
  console.log( communityLinkeageData, communityLinkeageDataSecond);
  const chartData = {
    options: {
      colors: [getColor(communityLinkeageData?.indicator35 || 0), "#b3c0cd"],
      labels: ["Cricket"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 7,
            size: "60%",
            background: getColor(communityLinkeageData?.indicator35 || 0),
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
            background: {
              padding: 10,
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
      legend: {
        position: "top", // Place the legend at the bottom
      },
    },
    series: [communityLinkeageData?.indicator35 || 0], // Replace with your data values
  };
  return (
    <Card className="card" style={{ height: "250px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={commIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Community Linkeage
            </Typography>
          </div>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            px={2}
            style={{
              fontSize: "0.7rem",
              fontWeight: 400,
              color: "#212B36",
              textAlign: "start",
              position: "relative",
              // right: 0,
              // top: -27,
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: getColor(communityLinkeageData?.indicator35),
                fontWeight: 600,
                paddingTop: "1rem",
              }}
            >
              {communityLinkeageData?.indicator35}%
            </span>{" "}
            PHCs conducting Awareness Campaigns
          </Typography>
          <div
            style={{
              width: "200px",
              height: "100px",
              display: "flex",
              justifyContent: "end",
              marginLeft: "4rem",
              position: "relative",
              top: "-15px",
              left: "-20px",
            }}
          >
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="radialBar"
            />
            {/* {communityLinkeageData?.indicator35 && (
            )} */}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          {/* <div className="progress-box">
            <div
              className="progress-bar"
              style={{
                width: `${communityLinkeageDataSecond?.indicator36}%`,
                background:
                  communityLinkeageDataSecond?.indicator36 < 50
                    ? "#C5C5C5"
                    : communityLinkeageDataSecond?.indicator36 > 51 &&
                      communityLinkeageDataSecond?.indicator36 < 79
                    ? "#e9b600"
                    : "#212B36",
              }}
            >
              {communityLinkeageDataSecond?.indicator36}%
            </div>
          </div> */}
          {/* <Typography
            style={{
              fontSize: "0.72rem",
              fontWeight: 400,
              color: "#525252",
              textAlign: "center",
            }}
            px={1}
          >
            {" "}
            Functional Ward Development Committees
          </Typography> */}
        </div>
      </Box>
      <Divider style={{ marginTop: "10px" }} />
      <Typography
        style={{
          fontSize: "14px",
          marginTop: "5px",
          fontWeight: 500,
          color: "#525252",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "16px",

            fontWeight: 800,
            color: getColor(communityLinkeageDataSecond?.indicator36),
            textAlign: "center",
          }}
        >
          {" "}
          {communityLinkeageDataSecond?.indicator36}%
        </span>{" "}
        PHCs with Functional WDC
      </Typography>
    </Card>
  );
};

export default CommunityLinkeage;
//
