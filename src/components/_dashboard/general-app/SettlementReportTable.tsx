// @ts-nocheck

import { FC, useEffect, useState } from "react";

// material
import { Card, Typography, CardHeader, Grid, Box } from "@mui/material";
// utils
import govIcon from "../../../assets/Governance.svg";
import { IGovernaceStructure, IGovernaceStructure2 } from "../../../db/types";
import ReactApexChart from "react-apexcharts";
import { getColor, getIndicatorTier, getLightColor } from "../../../utility";
import { indicatorSettings } from "../../../constants";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface ISettlementReportTable {
  data?: IGovernaceStructure[];
  data2?: IGovernaceStructure2[];
  data3?: any;
  data4?: any;
  defualtState: DefaultState;
  tier: string;
}

const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const GovernmentStructure: FC<ISettlementReportTable> = ({
  defualtState,
  tier,
}) => {
  const {state, year, quarter, } = defualtState;
  const {cachedIndicators, fetchedIndicators  } = useSettings()
  const [values, setvalues] = useState([])
  const [indicator, setindicator] = useState(null);
  const [noData, setnoData] = useState(true)
  useEffect(() => {
    setnoData(true)
    const settings = cachedIndicators;
    if (settings && fetchedIndicators) {
      const {ltype, liveIndicators} = getLiveIndicator(settings, AllIndicators, tier, 'governance');
      const labelTier =getIndicatorTier(tier);
      const processed =  processIndicators(
        fetchedIndicators,
        ltype,
        liveIndicators,
        year,
        quarter,
        labelTier,
        state,
        'governance'
      );
      if(processed.length > 0){
        setnoData(false)
        setvalues(processed)
        setindicator(ltype)

      }else{
        setnoData(true)
      }
   }
  }, [cachedIndicators, fetchedIndicators]);

  const convertToNumber = (e) => Math.floor(e * 100)
  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        style={{ paddingBottom: "2px" }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={govIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Governance
            </Typography>
            <TrendButton indicator={indicator} title="Governance" />
          </div>
        }
      />
      <Box sx={{ px: 2, mt: values.length === 3 ? 1 : 5 }}>
        {noData ? <NoData/> : values.map(v => (
          <div className="boxContainer">
            
            <Typography
              style={{ fontSize: "0.8rem", fontWeight: 400, color: "#525252" }}
            >
             {v.label}
            </Typography>
            <div
              className="badge"
              style={{
                background: `#fff`,
                border: `2px solid #f1f1f1`,
                color: `${getColor(v[v.indicatorName])}`,
              }}
            >
              {v.value}%
            </div>
          </div>
        ))}
       
     
        {/* <button onClick={()=> console.log(value4)}>Click</button> */}
      </Box>
    </Card>
  );
};

export default GovernmentStructure;
