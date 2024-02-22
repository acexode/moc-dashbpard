// @ts-nocheck

import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import qaIcon from "../../../assets/qa.svg";
import LinearProgress from '@mui/material/LinearProgress';
import { getColor, getIndicatorTier, getLightColor } from "../../../utility";
import { indicatorSettings } from "../../../constants";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";
interface IQuality {
  tier: string;
  defualtState: DefaultState;
}
const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const QualityAssessment: FC<IQuality> = ({ tier, defualtState }) => {
  const {state, year, quarter, } = defualtState;
  const [progress, setprogress] = useState(0)
  const [label, setlabel] = useState("")
  const {cachedIndicators, fetchedIndicators  } = useSettings()
  const [selectedIndicator, setselectedIndicator] = useState(null)
  const [noData, setnoData] = useState(true)
  useEffect(() => {
    setnoData(true)
    const settings = cachedIndicators;
    if(settings && fetchedIndicators){
      // console.log(settings, tier);
      const {ltype, liveIndicators} = getLiveIndicator(settings, AllIndicators, tier, 'qa');
      setselectedIndicator(ltype)
      const labelTier =getIndicatorTier(tier);
      const processed =  processIndicators(
        fetchedIndicators,
        ltype,
        liveIndicators,
        year,
        quarter,
        labelTier,
        state,
        'qa'
      );
      if(processed.length > 0){
        setnoData(false)
        setlabel(processed[0].label)
          setprogress(processed[0].value)

      }else{
        setnoData(true)
      }
    }
  }, [fetchedIndicators, cachedIndicators])



  return (
    <Card style={{ height: "308px", overflow: "visible" }} className="card">
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={qaIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Quality Assessment
            </Typography>
            {selectedIndicator && <TrendButton indicator={selectedIndicator} title="Quality Assessment" />}
          </div>
        }
      />

      <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
        {noData ?
        <NoData />
        : <>
        
        {fetchedIndicators && (
          // <ReactApexChart options={options} series={series} type="bar" />
        <Box sx={{ display: "flex", position: 'relative', width: '243px', background: `${getLightColor(progress)}`,  border: `1px solid ${getLightColor(progress)}`, marginTop: '2rem' }}>
          <span style={{position: 'absolute', right: '10px', top: '10px',  background: '#fff', padding: '5px 16px', borderRadius: '20px'}}>{progress}%</span>
          <span style={{position: 'absolute', left: '10px', top: '15px', fontWeight: '800', color: `${progress < 40 ? '#000' : '#fff'}`  }}> QA Score</span>
          
          <Box sx={{ height: '56px', width: `${progress }%`, background: getColor(progress),  textAlign: 'center', paddingTop: '15px', paddingLeft: '3px' }}>
           
          </Box>
          </Box>
        )}
        <Typography
              style={{ fontSize: "10px", fontWeight: 500, color: "#212B36", marginTop: '10px' }}
            >
              {label}
            </Typography>
        </>  
      }
      </Box>
    </Card>
  );
};

export default QualityAssessment;
