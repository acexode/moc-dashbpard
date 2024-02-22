// @ts-nocheck

import { FC, useState, useEffect } from "react";

// material
import { Card, Typography, CardHeader, Grid, Box } from "@mui/material";
// utils

import ReactApexChart from "react-apexcharts";
import healthIcon from "../../../assets/health.svg";

import { getColor, getIndicatorTier, getLightColor, getYearAndQuarter } from "../../../utility";
import SvgIconStyle from "../../SvgIconStyle";
import NoteIcon from "../../../assets/notes";
import { indicatorSettings } from "../../../constants";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import {
  DefaultState,
  getLiveIndicator,
  processIndicators,
} from "../../../utility/processIndicator";
import NoData from "./NoData";
import { getDHISData } from "../../../apis/dhis";

const RiskFactors: FC<{
  tier: string;
  defualtState: DefaultState;
}> = ({ tier, defualtState }) => {
  const { state, year, quarter } = defualtState;
  const [first, setfirst] = useState(0);
  const [label, setlabel] = useState("");
  const { cachedIndicators, fetchedIndicators } = useSettings();
  const [indicator, setindicator] = useState(null);
  const [noData, setnoData] = useState(true);
  const [series, setseries] = useState([{data: []}])
  const ids = [
    "BFeSKtHhPKi",
    "UVw96W1kcja",
    "BfcCmnKw8Ck",
    "k2Ncm24FnEA",
    "Jc1WjNKrObY",
  ];
  useEffect(() => {
    const fetchData = async () => {
      setnoData(true);
      const {year, quarter} = getYearAndQuarter()
      const yearQuarter = year + 'Q' + quarter
      const response = await getDHISData();
      console.log(response);
      const seriesData = response.data[0].filter((r) => ids.includes(r.dataElementId) && r.period === yearQuarter).map(e => e.sumValue);
      console.log(seriesData, yearQuarter);
      setseries([
        {
          data: seriesData,
        },
      ])
      setnoData(false);
    };

    fetchData();

  }, []);

  const chartData = {
    series: [
      {
        data: [400, 430, 448, 470, 540],
      },
    ],
    options: {
      chart: {
        type: "bar",
        // height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          //   horizontal: true,
        },
      },
      colors: ["#0A4DB1"],
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [
          "Penta 3",
          "BCG Given",
          "Diarrhoea cases",
          "Deliveries by SBA",
          "General Attendance",
        ],
      },
      title: {
        text: "Risk Factors (Prevalence) RMNCH+AN",
        align: "center",
        floating: true,
      },
    },
  };

  return (
    <Card className="card" style={{ height: "308px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {indicator && (
              <TrendButton
                indicator={indicator}
                title="Health Information Systems"
              />
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
        {noData ? (
          <NoData />
        ) : (
          <>
            <div
              style={{
                width: "65%",
                height: "350px",
                position: "relative",
                top: "10px",
              }}
            >
              <ReactApexChart
                options={chartData.options}
                series={series}
                type="bar"
              />
            </div>
          </>
        )}
      </Box>
    </Card>
  );
};

export default RiskFactors;
