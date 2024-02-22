// @ts-nocheck
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
//
// ----------------------------------------------------------------------
import monIcon from "../../../assets/mon.svg";
import { getColor, getIndicatorTier } from "../../../utility";
import useSettings from "../../../hooks/useSettings";
import { AllIndicators } from "../../settings/allIndicators";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";
const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;
interface IFinancial {
  tier: string;
  defualtState: DefaultState;
}

const FinancialCard: FC<IFinancial> = ({
  tier,
  defualtState
}) => {
  const {state, year, quarter, } = defualtState;
  const { cachedIndicators, fetchedIndicators } = useSettings();
  const [indicator, setindicator] = useState(null);
  const [data, setdata] = useState([]);
  const [noData, setnoData] = useState(true)
  useEffect(() => {
    setnoData(true)
    const settings = cachedIndicators;
    if (settings && fetchedIndicators) {
      const {ltype, liveIndicators} = getLiveIndicator(settings, AllIndicators, tier, 'finance');
      const labelTier =getIndicatorTier(tier);
      setindicator(ltype);
      const processed =  processIndicators(
        fetchedIndicators,
        ltype,
        liveIndicators,
        year,
        quarter,
        labelTier,
        state,
        'finances'
      );
      // console.log({processed, liveIndicators, fetchedIndicators});
      if(processed.length > 0){
        setnoData(false)
        setdata(processed)
      }else{
        setnoData(true)
      }
    }
  }, [fetchedIndicators, cachedIndicators]);


  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={monIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Financial Management
            </Typography>
            {indicator && (
              <TrendButton indicator={indicator} title="Financial Management" />
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
          mt: noData ? 1 : 6,
        }}
        px={3}
      >
        {noData ? <NoData /> : data.map(d => (
          <>
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            marginTop: ".5rem",
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <>
              <div
                key={index}
                className="contentBox"
                style={{
                  backgroundColor:
                    index < d.value / 10 ? getColor(d.value) : "#D3D3D3",
                }}
              />
            </>
          ))}
        </div>
        <Typography
          style={{
            fontSize: "0.7rem",
            fontWeight: 400,
            color: "#525252",
            marginBottom: "1.2rem",
          }}
        >
          {parseInt(d.value || 0)}% {d.label}
        </Typography>
          </>
        ))}
      </Box>
    </Card>
  );
};

export default FinancialCard;
