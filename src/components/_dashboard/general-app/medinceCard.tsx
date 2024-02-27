// @ts-nocheck
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { getColorReverse, getIndicatorTier, getLightColorReverse, getColor, getLightColor } from "../../../utility";
import emedIcon from "../../../assets/emed.svg";
import MedicineChestIcon from "../../../assets/medicine-chest";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";
import { Icon } from "@iconify/react";
import TrendButton from "./TrendButton";
import { DefaultState, getLiveIndicator, processIndicators } from "../../../utility/processIndicator";
import NoData from "./NoData";
import EssentialMedProgress from "./EssentialMedProgress";
const today = new Date();
const cquarter = Math.floor((today.getMonth() + 3) / 3) - 1;

const MedicineCard: FC<{
  defualtState: DefaultState;

  tier: string;
}> = ({ tier, defualtState }) => {
  const {state, year, quarter, } = defualtState;
  const [valOne, setvalOne] = useState(0);
  const [progress, setprogress] = useState(0);
  const [labels, setlabels] = useState([]);
  const { cachedIndicators, fetchedIndicators } = useSettings();
  const [indicator, setindicator] = useState(null);
  const [noData, setnoData] = useState(true)
  // console.log(esentialMed, esentialMedSecond, indicatorList);
  useEffect(() => {
    const settings = cachedIndicators;
    setnoData(true)
    // console.log({fetchedIndicators, year, quarter});
    if (settings && fetchedIndicators) {
      // console.log(object);
      const essentialMed = getLiveIndicator(settings, AllIndicators, tier, 'essentialMed');
      const ssd = getLiveIndicator(settings, AllIndicators, tier, 'ssd');
      const liveIndicators = [...essentialMed.liveIndicators, ...ssd.liveIndicators]
      const ltype = essentialMed.ltype
      setindicator(ltype);
      const labelTier = getIndicatorTier(tier);
      const processed = processIndicators(
        fetchedIndicators,
        ltype,
        liveIndicators,
        year,
        quarter,
        labelTier,
        state,
        "essentialmed"
      );
      setlabels(liveIndicators.map((e) => e.shortName));
      if (processed.length > 0) {
        setnoData(false)
        setvalOne(processed[0].value);
        setprogress(processed[1].value);
      }else{
        setnoData(true)
      }
    }
  }, [fetchedIndicators, cachedIndicators]);

  const chartData = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      legend: {
        position: "bottom", // Place the legend at the bottom
      },
      colors: [getColorReverse(valOne)],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "60%",
            background: getLightColorReverse(valOne),
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: "#fff",
              fontSize: "20px",
              show: false,
              offsetY: 7,
              formatter: function (val) {
                return val ? val + "%" : 0;
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels on the slices
      },
    },
    title: {
      align: "left",
      margin: 1,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#9699a2",
      },
    },
    series: [valOne],
  };

  return (
    <Card style={{ height: "308px", paddingBottom: "10px" }} className="card">
      <CardHeader
        style={{ paddingBottom: "2PX" }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={emedIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Essential Medicine
            </Typography>
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
      >
        {noData ? <div style={{marginTop: '1.2rem'}}><NoData /></div> : <>
        
        <div
          style={{
            width: "200px",
            height: "120px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: "-15px",
          }}
          className="customChart"
        >
          {fetchedIndicators && (
            <>
              <div style={{ position: "absolute", left: "38%", top: "40%" }}>
                <MedicineChestIcon color={getColorReverse(valOne)} />
              </div>
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="radialBar"
              />
            </>
          )}
        </div>
        <Typography
          px={0}
          style={{
            fontSize: "0.7rem",
            fontWeight: 400,
            color: "#212B36",
            textAlign: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: getColorReverse(valOne),
            }}
          >
            {valOne}%
          </span>{" "}
          {labels[0]}
        </Typography>
          <EssentialMedProgress progress={progress} label={labels[1]} />
        </>}
      </Box>
    </Card>
  );
};

export default MedicineCard;
