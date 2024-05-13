// @ts-nocheck

import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";
import trendingUpFill from "@iconify/icons-eva/trending-up-fill";
import trendingDownFill from "@iconify/icons-eva/trending-down-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Typography, Stack ,Skeleton} from "@mui/material";
// utils
import {  useNavigate } from "react-router-dom";

import { fNumber, formatter, fPercent } from "../../../utility/index";
import { FC } from "react";
import logo from "../../../assets/Vector1.png";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }: any) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

const PERCENT = 2.6;
const CHART_DATA = [{ data: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26] }];

const ServiceCardNPHCDA: FC<IServiceCard> = ({ title, color, value, show,classname,path,loading, sub, subTitle, showFCT, user,isMoney }) => {
  const theme = useTheme();
  let navigate = useNavigate();
  const onNavigate = () => console.log('navigate') // navigate(path)


  const chartOptions = {
    colors: color,
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <Card className={` ${classname}`} sx={{ display: "flex", alignItems: "center", p:2,cursor:"pointer", height: '140px', maxHeight: '140px' }} onClick={onNavigate}>
      <div style={{position: 'absolute', right: '0px', width: '30%'}}>
      <img src={logo} alt=""  />
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
        >
          {show && (
            <>
              <IconWrapperStyle
                sx={{
                  ...(PERCENT < 0 && {
                    color: "error.main",
                    bgcolor: alpha(theme.palette.error.main, 0.16),
                  }),
                }}
              >
                <Icon
                  width={16}
                  height={16}
                  icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
                />
              </IconWrapperStyle>
              <Typography component="span" variant="subtitle2">
                {PERCENT > 0 && "+"}
                {fPercent(PERCENT)}
              </Typography>
            </>
          )}
        </Stack>

        <Typography variant="h4">
        {!loading ? (
        (isMoney?  formatter.format(value) :value)
        ) : (
          <Skeleton variant="rectangular" width={100} height={30} />
        )}
        </Typography>
        <Typography variant="span">
        {!loading ? (
         <>{subTitle } {" "} {sub} {showFCT && <span style={{fontSize: '12px'}}>{user.level === 'National' && '(including FCT)'}</span>}</> 
        ) : (
          <Skeleton variant="rectangular" width={100} height={30} />
        )}
        </Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={CHART_DATA}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
};



export default ServiceCardNPHCDA
