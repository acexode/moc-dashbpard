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
import MocAxiosInstance from "../../../services/moc_service";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const indicatorLabel = [
    {
        label: 'Total amount budgeted for BHCPF (1% of CRF)',
        value: 0,
        key: 'totalBuget'
    },
    {
        label: 'Percentage of annual BHCPF budget released',
        value: 0,
        key: 'budgetPercentInc'
    },
    {
        label: 'Percentage of annual increase in national BHCPF population coverage',
        value: 0,
        key: 'coveragePercenttInc'
    }
]
interface IMocKPIAnswers {
  data?: IGovernaceStructure[];
  data2?: IGovernaceStructure2[];
  data3?: any;
  data4?: any;
  defualtState: DefaultState;
  tier: string;
}

const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const MocKPIAnswers: FC<IMocKPIAnswers> = ({
  defualtState,
  tier,
}) => {
  const {state, year, quarter, } = defualtState;
  const {cachedIndicators, fetchedIndicators  } = useSettings()
  const [values, setvalues] = useState(indicatorLabel)
  const [indicator, setindicator] = useState(null);
  const [noData, setnoData] = useState(true)
  const fetchKPIs = () => {
    setnoData(true);

    MocAxiosInstance.get("moc-kpis")
      .then((res) => {
        console.log(res.data.data);
        const {data} = res.data
        const kpi2024 = data.filter(e => e.year === today.getFullYear())[0]
        console.log(kpi2024);
        const mapKpi = indicatorLabel.map(i => {
          for(let [key, val] of Object.entries(kpi2024)){
              if(key === i.key){
                return {...i, value: val}
              }
          }
        })
        console.log(mapKpi);
        setvalues(mapKpi)
        // setQuestions(res?.data.data);
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setnoData(false);
      });
  };
  useEffect(() => {
    fetchKPIs();
  }, []);

  const convertToNumber = (e) => Math.floor(e * 100)
  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        style={{ paddingBottom: "2px" }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            
            <TrendButton indicator={indicator} title="Governance" />
          </div>
        }
      />
      <Box sx={{ px: 2, mt:  5 }}>
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
                color: '#2A2A2A',
                width: 'auto'
              }}
            >
              {v.value}
            </div>
          </div>
        ))}
       
     
        {/* <button onClick={()=> console.log(value4)}>Click</button> */}
      </Box>
    </Card>
  );
};




export default MocKPIAnswers
