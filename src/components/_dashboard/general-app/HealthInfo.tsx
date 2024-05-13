// @ts-nocheck

import { FC, useState, useEffect } from "react";

// material
import { Card, Typography, CardHeader, Grid, Box } from "@mui/material";
// utils

import ReactApexChart from "react-apexcharts";
import healthIcon from "../../../assets/health.svg";

import { getColor, getIndicatorTier, getLightColor } from "../../../utility";
import SvgIconStyle from "../../SvgIconStyle";
import NoteIcon from "../../../assets/notes";
import { indicatorSettings } from "../../../constants";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const HealthInfo: FC<{
  tier: string;
  defualtState: DefaultState;
}> = ({ tier, defualtState }) => {
  const {state, year, quarter, } = defualtState;
  const [first, setfirst] = useState(0);
  const [label, setlabel] = useState("");
  const { cachedIndicators, fetchedIndicators } = useSettings();
  const [indicator, setindicator] = useState(null);
  const [noData, setnoData] = useState(true)

  useEffect(() => {
    const settings = cachedIndicators;
    setnoData(true)
    if (settings && fetchedIndicators) {
      const {ltype, liveIndicators} = getLiveIndicator(settings, AllIndicators, tier, 'his');
      setindicator(ltype);
      const labelTier = getIndicatorTier(tier);
      const processed = processIndicators(
        fetchedIndicators,
        ltype,
        liveIndicators,
        year,
        quarter,
        labelTier,
        state,
        "his"
      )
      if (processed.length > 0) {
        setnoData(false)
        const val = processed[0];
        setfirst(val.value);
        setlabel(val.label);
      }else{
        setnoData(true)
      }
    }
  }, [fetchedIndicators, cachedIndicators]);

  const chartData = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: [getColor(first || 0)],
      legend: {
        position: "bottom", // Place the legend at the bottom
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "60%",
            background: getLightColor(first || 0),
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
    series: [parseInt(first || 0)],
  };
  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={healthIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Health Information Systems
            </Typography>
            {indicator && (
              <TrendButton indicator={indicator} title="Health Information Systems" />
            )}
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
        {noData ? <NoData /> : 
        <>
        
        <div
          style={{
            width: "200px",
            height: "120px",
            position: "relative",
            top: "10px",
          }}
        >
          <div style={{ position: "absolute", left: "35%", top: "43%" }}>
            <NoteIcon color={getColor(first || 0)} />
          </div>
          {/* <img
            src={noteIcon}
            style={{
              width: "24px",
              position: "absolute",
              top: "50%",
              left: "47%",
              zIndex: "100",
            }}
          /> */}
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
          />
          {/* {first ? (
          ): null} */}
        </div>
        <Typography
          style={{
            fontSize: "0.7rem",
            fontWeight: 400,
            textAlign: "center",
          }}
          px={2}
          pt={3}
        >
          <span
            style={{
              fontWeight: 400,
              color: getColor(first),
            }}
          >
            {first}
          </span>
          % {label}
        </Typography>
        </>
        }
      </Box>
    </Card>
  );
};

export default HealthInfo;
