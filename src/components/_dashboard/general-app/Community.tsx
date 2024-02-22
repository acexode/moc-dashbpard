// @ts-nocheck

import { FC, useEffect, useState } from "react";

// material
import { Card, Typography, CardHeader, Box, Divider } from "@mui/material";
// utils
import ReactApexChart from "react-apexcharts";
import commIcon from "../../../assets/comm.svg";
import { getColor, getIndicatorTier } from "../../../utility";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";

const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const CommunityLinkeage: FC<{
  tier: string;
  defualtState: DefaultState;

}> = ({  tier, defualtState }) => {
  const {state, year, quarter, } = defualtState;
  const {cachedIndicators, fetchedIndicators  } = useSettings()
  const [indicator, setindicator] = useState(null)
  const [noData, setnoData] = useState(true)
  const [data, setdata] = useState([]);
  useEffect(() => {
    setnoData(true)
    const settings = cachedIndicators;
    if(settings && fetchedIndicators){
      const {ltype, liveIndicators} = getLiveIndicator(settings, AllIndicators, tier, 'cl');
      setindicator(ltype)
      const labelTier = getIndicatorTier(tier);
      const processed =  processIndicators(
        fetchedIndicators,
        ltype,
        liveIndicators,
        year,
        quarter,
        labelTier,
        state,
        'cl'
      );
      if(processed.length > 0){
        setnoData(false)
        setdata(processed)

      }else{
        setnoData(true)
      }
    }
  }, [fetchedIndicators, cachedIndicators])


  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={commIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Community Linkage
            </Typography>

            {indicator && <TrendButton indicator={indicator} title="Community Linkage" />}
          </div>
        }
      />

      {noData ? <NoData /> :  data.map(e => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: data.length === 2 ? '1rem' : '',
          marginTop: data.length === 1 ? '3rem' : ''
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "15px 18px",
            borderRadius: "4px",
            color: "#fff",
            background: getColor(e.value),
          }}
        >
          {e.value}%
        </div>
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
              color: getColor(e.value),
              fontWeight: 600,
              paddingTop: "1rem",
            }}
            className="customChart"
          >
            {e.value}%
          </span>{" "}
          {e.label}
        </Typography>
      </Box>

      ))}

     
    </Card>
  );
};

export default CommunityLinkeage;
//
