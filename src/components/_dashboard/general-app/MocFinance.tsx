// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { getIndicatorTier, getColor } from "../../../utility";

import walletIcon from "../../../assets/wallet2.png";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";

import TrendButton from "./TrendButton";
import {
  DefaultState,
  getLiveIndicator,
  processIndicators,
} from "../../../utility/processIndicator";
import NoData from "./NoData";
import styled from "@emotion/styled";
import { indicatorBoard } from "../../settings/board";

const IconContainer = styled("div")(({}) => ({
  position: "absolute",
  left: "15%",
  top: "12%",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  backgroundColor: "#F5F8FE",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const MocFinance: FC<{
  defualtState: DefaultState;

  tier: string;
}> = ({ tier, defualtState }) => {
  const { state, year, quarter } = defualtState;
  const { cachedIndicators, fetchedIndicators } = useSettings();
  const [indicator, setindicator] = useState(null);
  const [data, setdata] = useState({});

  const [noData, setnoData] = useState(true);
  useEffect(() => {
    // setnoData(true)
    const settings = cachedIndicators || indicatorBoard ;
    console.log(settings);
    if (settings && fetchedIndicators) {
      const { ltype, liveIndicators } = getLiveIndicator(
        settings,
        AllIndicators,
        tier,
        "finance"
      );
      const labelTier = getIndicatorTier(tier);
      setindicator(ltype);
      const processed = processIndicators(
        fetchedIndicators,
        ltype,
        liveIndicators,
        year,
        quarter,
        labelTier,
        state,
        "finances"
      );
      const labels = processed.map((e) => e.label);
      if (processed.length > 0) {
        const series = processed.map((e) => e.value);

        setdata({
          series: series,
          options: {
            labels: labels,

            colors: ["#f94f4f", "#1b3568"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 500,
                    height: 500,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        });
        setnoData(false);
      } else {
        setnoData(true);
      }
    }
  }, [fetchedIndicators, cachedIndicators]);

  return (
    <Card style={{ height: "308px", paddingBottom: "10px" }} className="card">
      <CardHeader
        style={{ paddingBottom: "2PX" }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {indicator && (
              <TrendButton indicator={indicator} title="Essential Medicine" />
            )}
          </div>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: "0",
        }}
        px={2}
        pt={5}
      >
        {noData ? (
          <div style={{ marginTop: "1.2rem" }}>
            <NoData />
          </div>
        ) : (
          <>
            <Box
              sx={{
                width: "500px",
                height: "500px",
                position: "relative",
              }}
            >
              <IconContainer>
                <img style={{ width: "50px" }} src={walletIcon} />
              </IconContainer>
              <ReactApexChart
                options={data?.options}
                series={data?.series}
                type="donut"
              />
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default MocFinance;
