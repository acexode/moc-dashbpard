// @ts-nocheck

import { FC, useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
// material
import { Card, Typography, CardHeader, Box, Divider } from "@mui/material";
// utils
import ReactApexChart from "react-apexcharts";
import superIcon from "../../../assets/super.svg";
import { getColor, getIndicatorTier } from "../../../utility";
import { AllIndicators } from "../../settings/allIndicators";
import { indicatorSettings } from "../../../constants";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";

interface ISupervisory {
  defualtState: DefaultState;
  tier: string;
}
const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const Supervisory: FC<ISupervisory> = ({ tier, defualtState }) => {
  const {state, year, quarter, } = defualtState;
  const [value, setValue] = useState();
  const [label, setlabel] = useState("");
  const { cachedIndicators, fetchedIndicators } = useSettings();
  const [indicator, setindicator] = useState(null);
  const [noData, setnoData] = useState(true)

  useEffect(() => {
    setnoData(true)
    const settings = cachedIndicators;
    if (settings && fetchedIndicators) {
      // console.log(settings, tier);
      const {ltype, liveIndicators} = getLiveIndicator(settings, AllIndicators, tier, 'supervision');
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
        "supervision"
      );
      if (processed.length > 0) {
        setnoData(false)
        setlabel(processed[0].label);
        setValue(processed[0].value);
      }else{
        setnoData(true);
      }
    }
  }, [fetchedIndicators, cachedIndicators]);

  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={superIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Supervision
            </Typography>
            {indicator && (
              <TrendButton indicator={indicator} title="Supervision" />
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
        {noData ?
        <NoData />
        : <>
        
        <div style={{ width: "200px", marginTop: "10px" }}>
          {}
          {/* {value && tier === "National" && ( */}
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[value, 100 - value]}
              colors={[getColor(value), "#ECF0FD"]}
              percent={value / 100}
              arcPadding={0.02}
              textColor="#000"
              needleColor={getColor(value)}
              needleBaseColor="#000"
            />
          {/* )} */}
        </div>

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
            <span style={{ fontWeight: 600, color: getColor(value) }}>
              {" "}
              {value}%
            </span>
          )}{" "}
          {label}
        </Typography>
        </>
      }
      </Box>
    </Card>
  );
};

export default Supervisory;
