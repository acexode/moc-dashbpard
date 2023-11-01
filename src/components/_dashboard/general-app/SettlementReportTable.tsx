// @ts-nocheck

import { FC, useEffect, useState } from "react";

// material
import {
  Card,
  Typography,
  CardHeader,
  Grid,
  Box,
} from "@mui/material";
// utils
import govIcon from "../../../assets/Governance.svg";
import { IGovernaceStructure, IGovernaceStructure2 } from "../../../db/types";
import ReactApexChart from "react-apexcharts";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface ISettlementReportTable {
  data?: IGovernaceStructure[];
  data2?: IGovernaceStructure2[];
  data3?:any;
  state: string
  tier: string
}

const GovernmentStructure: FC<ISettlementReportTable> = ({ data=[], data2=[],data3 = [], state, tier }) => {
const [value,setValue] = useState()
const [value2,setValue2] = useState()
const [value3,setValue3] = useState()
useEffect(()=>{
    if(data || data2){
      const i = tier === 'State' ? data.filter(e => e?.state === state)[0] : data[0]
      if(i){
        setValue((i['indicator3' + tier] *
          100).toFixed(0))
      }else{
        setValue(0)
      }
       
        setValue2((data2[0]?.indicator1National * 100).toFixed(0))
        setValue3((data3[0]?.indicator2National * 100).toFixed(0))
    }
},[data,data2])
  const chartData = {
    options: {
      colors: ['#25b76e'], 
    
      legend: {
        position: 'bottom', // Place the legend at the bottom
      },
      labels: ['Proportion of states with functional coordination platforms established at state level'],
      dataLabels: {
        enabled: false, // Disable data labels on the slices
      },

    },
    series: [70], // Replace with your data values
  };

  return (
    <Card className="card" style={{height: '250px'}}>
       <CardHeader style={{paddingBottom: '2px'}} title={
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
           <img src={govIcon} alt="" />
        <Typography style={{ fontSize: '0.9rem', fontWeight:500, color:"#212B36" }}>
        Governance
        </Typography>

        </div>
      }  />
      <Box sx={{px:2,mt:1}}>
       {tier === 'National' && <div className="boxContainer">
          <Typography style={{ fontSize: '0.8rem', fontWeight:400, color:"#525252" }}>State Support Funding</Typography>
            <div className="badge">
            {value2 >= 0 ? value2: ''}%
            </div>
       </div>}
       {tier === 'National' && <div className="boxContainer">
          <Typography style={{ fontSize: '0.8rem', fontWeight:400, color:"#525252" }}>State Coordination Platforms</Typography>
            <div className="badge">
            {value3 >= 0 ? value3: ''}%
            </div>
       </div>}
       <div style={{marginTop: `${tier !== 'National' ? '30%' : ''}`}} className="boxContainer">
          <Typography style={{ fontSize: '0.8rem', fontWeight:400, color:"#525252" }}>LGA Coordination Platforms</Typography>
            <div className="badge">
            { value >= 0 ? value: '' }%
            </div>
       </div>
      </Box>
    </Card>
  );
};

export default GovernmentStructure;
