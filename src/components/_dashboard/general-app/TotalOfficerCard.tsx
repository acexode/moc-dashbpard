// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
//
import { FC, useEffect, useState } from "react";
import hrIcon from "../../../assets/hr.svg";
import { indicatorSettings } from "../../../constants";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import TrendButton from "./TrendButton";
import { getIndicatorTier } from "../../../utility";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";

const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;
// -------------------------------------------------------------------
interface IHumanResources {
  tier: string
  defualtState: DefaultState
}
const HumanResourcesCard: FC<IHumanResources> = ({
  tier,
  defualtState
}) => {
  const {state, year, quarter, } = defualtState;
  const [noData, setnoData] = useState(true)
  const [options, setoptions] = useState({
    chart: {
      toolbar: {
        show: false
      }
    },

    xaxis: {
      categories: ['', ''],
      // categories: ["2 or more Midwives","2 or more CHEWs"],
    },
    grid: {
      show: false, // Remove the grid lines
    },
    title: {
      text: "",
      floating: true,
      offsetY: -2,
      align: "right",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        barHeight: "10%",
        borderRadius: 8,
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        hideZeroBarsWhenGrouped: false,
        isDumbbell: true,
        colors: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#ff2727",
            },
            {
              from: 51,
              to: 79,
              color: "#e9b600",
            },
            {
              from: 81,
              to: 100,
              color: "#16b06a",
            },
          ],
        },
      },
    },
  });
  const [indicator, setindicator] = useState(null)
  const [series, setSeries] = useState([
    {
      name: "",
      data: [
        0,
        0,
      ],
     
    },
  ]);
  const {cachedIndicators, fetchedIndicators  } = useSettings()

  useEffect(() => {
    const settings = cachedIndicators;
    setnoData(true);
    // console.log(adhocMidIndicator);
    if(settings && fetchedIndicators){
      // console.log(settings, tier);
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
      if(processed.length > 0){
        setnoData(false)
        const data = processed.map(e => e.value)
         setSeries([
          {
            name: "Human Resource",
            data,
            // Set different colors for each bar
          },
        ]);
        const opt = {
          ...options,
          xaxis: {
            categories: liveIndicators.map(e => e.shortName),
          },
          dataLabels: {
            // position: 'top',
            maxItems: 100,
            hideOverflowingLabels: true,
            formatter: function(val, opt) {
              return  val + "%"
          },
          },
        }
            setoptions(opt)

      }else{
        setnoData(true)
      }

    }
  }, [fetchedIndicators, cachedIndicators])



  


  return (
    <Card style={{ height: "308px", overflow: 'visible' }} className="card">
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
             <img src={hrIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              HR For Health
            </Typography>
            {indicator && <TrendButton indicator={indicator} title="HR For Health" />}
          </div>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {noData ? 
        <NoData /> :

        <div style={{   position: 'absolute', top: '25%', left: '5%' }}>
          <ReactApexChart options={options} series={series} type="bar" />
       
        </div>
      }
  
      </Box>
    </Card>
  );
};

export default HumanResourcesCard;
