// @ts-nocheck
import React, { useEffect, useState, FC } from "react";
import ReactApexChart from "react-apexcharts";
import useSettings from "../../../hooks/useSettings";
import { AllIndicators } from "../../settings/allIndicators";

import { ButtonGroup, Button, Typography } from "@mui/material";
import palette from "../../../theme/palette";
import { DefaultState } from "../../../utility/processIndicator";
import NoData from "./NoData";

interface DataItem {
  year: number;
  quarter: number;
  state: number;
}
const date = new Date();
const currentYear = date.getFullYear();
const prevYear = date.getFullYear() - 1;
const categories = [1, 2, 3, 4, 1, 2, 3, 4].map((e, i) =>
  i < 4 ? prevYear + ` ~ Q${e}` : currentYear + ` ~ Q${e}`
);

const TrendChart: FC<{ selectedState: DefaultState }> = ({ selectedState }) => {
  const [options, setoptions] = useState({
    chart: {
      height: 150,
      stacked: false,
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#FF1654", "#247BA0", "#e9b600"],
    stroke: {
      width: [4, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "10%",
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FF1654",
        },
        labels: {
          style: {
            colors: "#FF1654",
          },
        },
        // title: {
        //   text: "Series A",
        //   style: {
        //     color: "#FF1654",
        //   },
        // },
      },
      {
        opposite: false,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
          color: "#247BA0",
        },
        labels: {
          style: {
            colors: "#247BA0",
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        show: true,
      },
    },
    legend: {
      horizontalAlign: "center",
      offsetX: 100,
    },
  });
  const [series, setseries] = useState([]);
  const { selectedIndicator, fetchedIndicators } = useSettings();
  const [chartType, setchartType] = useState("line");
  const [noData, setnoData] = useState(true);
  const handleFilterByYear = (data: DataItem[], state: string) => {
    console.log(data);
    if (data) {
      return data.filter((item: DataItem) => {
        const { year } = item;
        if (state.length > 0) {
          console.log("state");
          if (
            item.state === state &&
            (year === currentYear || year === prevYear)
          ) {
            return true;
          }
          // return false;
        } else {
          console.log("national");
          if (year === currentYear || year === prevYear) {
            return true;
          }
          return false;
        }
      });
    } else {
      return [];
    }
  };
  useEffect(() => {
    console.log(selectedIndicator);
    if (selectedIndicator !== null && selectedIndicator.length > 0) {
      const obj: [] = selectedIndicator.map((s: any) => {
        for (const key in fetchedIndicators) {
          if (key === s) {
            return fetchedIndicators[s];
          }
        }
      });

      const label = selectedIndicator.map((e) => {
        const i = AllIndicators.filter(
          (s) => s.indicatorNational === e || s.indicatorState === e
        ).map((e) => e.shortName);
        return i[0];
      });

      // Use Array.filter to filter the array and keep only one object per unique year
      const filteredData = obj.map((e) =>
        handleFilterByYear(e, selectedState.state)
      );
      const len = filteredData.flat().length;
      console.log(filteredData, len);
      if (filteredData && len > 0) {
        setnoData(false);
        const cyear = filteredData[0].filter((e) => e.year === currentYear);
        const pyear = filteredData[0].filter((e) => e.year === prevYear);
        const cat = [];
        console.log({ cyear, pyear, selectedState });
        if (pyear.length > 0) {
          cat.push(...categories.slice(0, 4));
        }
        if (cyear.length > 0) {
          cat.push(...categories.slice(4));
        }
        const opt = {
          ...options,
          xaxis: {
            categories: cat,
          },
        };
        setoptions(opt);

        const seriesData = filteredData.map((e, i: number) => {
          return {
            name: label[i],
            data: e
              .map((d: any) =>
                d[selectedIndicator[i]]
                  ? Math.floor(d[selectedIndicator[i]] * 100)
                  : 0
              )
              .slice(0, 5),
          };
        });
        setseries(seriesData);
        console.log({
          filteredData,
          obj,
          opt,
          cat,
          seriesData,
          fetchedIndicators,
          label,
          selectedIndicator,
        });
        // console.log(seriesData[0]);
      } else {
        setnoData(true);
        console.log("No data");
      }
    }
  }, [fetchedIndicators, chartType]);

  const handleChartType = (ctype) => {
    console.log(ctype);
    setchartType(ctype);
  };

  return (
    <div style={{ maxWidth: "750px" }}>
      {noData ? (
        <div style={{marginBottom: '2rem'}}><NoData /></div>
      ) : (
        <div>
          <ButtonGroup
            variant="outlined"
            color="secondary"
            aria-label="outlined secondary button group"
          >
            <Button
              onClick={() => handleChartType("bar")}
              disabled={chartType === "bar"}
              sx={{
                background: "#247BA0",
                "&:hover": {
                  // Define the hover styles here
                  backgroundColor: "#3e4f61",
                },
              }}
            >
              Bar
            </Button>
            <Button
              disabled={chartType === "line"}
              onClick={() => handleChartType("line")}
              sx={{
                background: "#247BA0",
                "&:hover": {
                  // Define the hover styles here
                  backgroundColor: "#3e4f61",
                },
              }}
            >
              Line
            </Button>
          </ButtonGroup>

          <ReactApexChart options={options} series={series} type={chartType} />
          {series.length === 1 && (
            <Typography
              px={2}
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                color: "#212B36",
                textAlign: "center",
                position: "relative",
                // right: 0,
                // top: -27,
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#FF1654",
                  textAlign: "center",
                  paddingTop: "1rem",
                }}
                className="customChart"
              >
                {series[0].name}
              </span>{" "}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendChart;
