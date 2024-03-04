// @ts-nocheck

import { FC, useEffect, useState } from "react";

// material
import { Card, Typography, CardHeader, Box, Divider } from "@mui/material";
// utils
import ReactApexChart from "react-apexcharts";
import commIcon from "../../../assets/Group 34.svg";
import staffIcon from "../../../assets/Group 36.svg";
import { getColor, getIndicatorTier } from "../../../utility";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";

const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const MocNursesMidWife: FC<{
  title: string;
  icon: string;
  color: string;
  tier: string;
  defualtState: DefaultState;

}> = ({  tier, defualtState, color, icon, title }) => {
  const {state, year, quarter, } = defualtState;
  const {cachedIndicators, fetchedIndicators  } = useSettings()
  const [indicator, setindicator] = useState(null)
  const [noData, setnoData] = useState(true)
  const [data, setdata] = useState([]);
  useEffect(() => {
    setnoData(true)
    const settings = cachedIndicators;
    if(settings && fetchedIndicators){
      const {ltype, liveIndicators} = getLiveIndicator(settings, AllIndicators, tier, 'hr');
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
        'hr'
      );
      console.log({processed, liveIndicators, fetchedIndicators});
      if(processed.length > 0){
        if(title.includes('Nurses and Midwives')){
          setdata(processed[0])
        }else{
          setdata(processed[1])

        }
        setnoData(false)

      }else{
        setnoData(true)
      }
    }
  }, [fetchedIndicators, cachedIndicators])

  const getIcon = (name) => {
    let icon = null
    switch (name) {
      case 'nurse-midwife':
        icon = staffIcon
        break;
      case 'comm':
        icon = commIcon
        break;
      default:
        icon = commIcon
        break;
    }
    return icon
  }

  return (
    <Card className="card" style={{ height: "308px" }}>

      {noData ? <NoData /> :
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop:  '4rem'
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: '68px',
            height: '62px',
            borderRadius: "4px",
            color: "#fff",
            background: `${color}`,
            paddingTop: "5px"
          }}
        >
         <img src={getIcon(icon)} />
        </div>
        <Box
            pt={3}
          px={2}
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: "center",
            position: "relative",
          }}
        >
          <span
            style={{
             fontSize: "55px",
              fontWeight: 800,
              paddingTop: "1rem",
            }}
          >
            {data?.value} %
          </span>{" "}
          <span style={{fontSize: '12px'}}>{title}</span>
        </Box>
      </Box>

      }
    </Card>
  );
};




export default MocNursesMidWife
