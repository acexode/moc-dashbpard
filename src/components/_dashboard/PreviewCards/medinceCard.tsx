// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { getColor, getLightColor } from "../../../utility";
//
import emedIcon from "../../../assets/emed.svg";
import medChest from "../../../assets/medicine-chest.svg";
import MedicineChestIcon from "../../../assets/medicine-chest";

const MedicinePreviewCard = () => {
  const [valOne, setvalOne] = useState(90)
  const [progress, setprogress] = useState(60);
  const [labels, setlabels] = useState(["Stockout of Essential (tracer) Drugs", "100% Providing BMPHS"])

  const chartData = {
    options: {
      chart: {
        toolbar: {
          show: true
        }
      },
      legend: {
        position: "bottom", // Place the legend at the bottom
      },
      colors: [getColor(valOne)],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "60%",
            background: getLightColor(valOne),
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
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shade: "dark",
      //     type: "vertical",
      //     gradientToColors: ["#87D4F9"],
      //     stops: [0, 100]
      //   }
      // },
      // labels: ['PHCs that submitted NHMIS data'],
      dataLabels: {
        enabled: false, // Disable data labels on the slices
      },
    },
    title: {
      align: "left",
      margin: 1,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#9699a2",
      },
    },
    series: [valOne],
  };

  return (
    <Card style={{ height: "308px", paddingBottom: "10px" }} className="card">
      <CardHeader
        style={{ paddingBottom: "2PX" }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={emedIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Essential Medicine
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
          paddingBottom: "0",
        }}
        px={2}
      >
        <div
          style={{
            width: "200px",
            height: "120px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: "-10px",
          }}
          className="customChart"
        >

            <>
              <div style={{ position: "absolute", left: "38%", top: "40%" }}>
                <MedicineChestIcon
                  color={getColor(valOne)}
                />
              </div>
              {/* <img
                src={medChest}
                style={{
                  width: "44px",
                  position: "absolute",
                  top: "40%",
                  left: "40%",
                  zIndex: "100",
                }}
              /> */}
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="radialBar"
              />
            </>

        </div>
        <Typography
          px={0}
          style={{
            fontSize: "0.7rem",
            fontWeight: 400,
            color: "#212B36",
            textAlign: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: getColor(valOne),
            }}
          >
            {valOne}%
          </span>{" "}
          {labels[0]}
        </Typography>
        {progress && (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              width: "243px",
              background: `${getLightColor(progress)}`,
              border: `1px solid ${getLightColor(progress)}`,
              marginTop: "1.2rem",
              borderRadius: "16px",
              height: "31px",
            }}
          >
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "3px",
                background: "#fff",
                padding: "5px 16px",
                borderRadius: "20px",
                fontSize: "10px",
              }}
            >
              {progress}%
            </span>
            {/* <span style={{position: 'absolute', left: '10px', top: '15px', fontWeight: '800', color: `${progress < 40 ? '#000' : '#fff'}`  }}> QA Score</span> */}

            <Box
              sx={{
                height: "31px",
                width: `${progress}%`,
                background: getColor(progress),
                textAlign: "center",
                borderRadius: "16px",
                fontWeight: "800",
                fontSize: "10px",
                paddingTop: "3px",
                color: 'white'
              }}
            >
              
            </Box>
          </Box>
          
        )}
      </Box>
      <Typography
          px={0}
          style={{
            fontSize: "0.7rem",
            fontWeight: 400,
            color: "#212B36",
            textAlign: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: getColor(progress),
            }}
          >
            {progress}%
          </span>{" "}
          {labels[1]}
        </Typography>
    </Card>
  );
};

export default MedicinePreviewCard;
