// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC } from "react";
import { getColor } from "../../../utility";
//
import emedIcon from "../../../assets/emed.svg";

const MedicineCard: FC<{ esentialMed: any; esentialMedSecond: any }> = ({
  esentialMed,
  esentialMedSecond,
}) => {
  // console.log(esentialMed, esentialMedSecond);
  // let remainder = 100 - esentialMed?.indicator17
  let stockOutRemainder = 100 - esentialMedSecond?.indicator28;
  const chartData = {
    options: {
      colors: ["#134082", "#BED2F1"],

      legend: {
        position: "bottom", // Place the legend at the bottom
      },
      colors: [getColor(esentialMedSecond?.indicator28)],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "60%",
            background: getColor(esentialMedSecond?.indicator28),
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
    series: [esentialMedSecond?.indicator28],
  };

  return (
    <Card style={{ height: "250px", paddingBottom: "10px" }} className="card">
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
          <span style={{ fontSize: "12px", fontWeight: 600, color: getColor(esentialMedSecond?.indicator28) }}>
            {esentialMedSecond?.indicator28}%
          </span>{" "}
          PHCs providing BMPHS
        </Typography>
        <div
          style={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: "-10px",
          }}
        >
          {esentialMed && esentialMedSecond && (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="radialBar"
            />
          )}
        </div>

        <div
          className="medCon"
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            bottom: "20px",
          }}
        >
          {esentialMed?.indicator17 && (
            <div
              className="stockBox"
              style={{
                background:
                  esentialMed?.indicator17 <= 50
                    ? "#ff4747"
                    : esentialMed?.indicator17 > 51 &&
                      esentialMed?.indicator17 <= 79
                    ? "#e9b600"
                    : "#134082",
              }}
            >
              <span
                style={{ fontSize: "16px", color: "#fff", fontWeight: 800 }}
              >
                {esentialMed?.indicator17}%
              </span>
              <span className="stockText">No Stock Out</span>
            </div>
          )}
        </div>
      </Box>
    </Card>
  );
};

export default MedicineCard;
