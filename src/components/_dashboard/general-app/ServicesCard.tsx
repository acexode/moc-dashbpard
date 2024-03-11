// @ts-nocheck

import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";
import trendingUpFill from "@iconify/icons-eva/trending-up-fill";
import trendingDownFill from "@iconify/icons-eva/trending-down-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Typography, Stack, Skeleton } from "@mui/material";
// utils
import { useNavigate } from "react-router-dom";

import { fNumber, formatter, fPercent } from "../../../utility/index";
import { FC } from "react";
import wallet from "../../../assets/wallet.svg";
import treeStructure from "../../../assets/tree-structure.svg";
import treeStruct from "../../../assets/tree-struct.svg";
import box from "../../../assets/box.svg";

// ----------------------------------------------------------------------
const BorderBoxStyle = styled("div")(({ theme, color }: any) => ({
  borderTopLeftRadius: "2px",
  borderTopRightRadius: "2px",
  borderBottomLeftRadius: "2px",
  borderBottomRightRadius: "2px",
  borderLeft: `4px solid ${color}`,
  padding: "10px",
  color: color,
}));

const IconWrapperStyle = styled("div")(({ color, icon }: any) => ({
  position: 'absolute',
  right: '10px',
  top: '1.5rem',
  width: 26,
  height: 26,
  display: "flex",
  borderRadius: "4px",
  paddingTop:  icon ===  'wallet' || icon === 'box' ? '2px' : '5px',
  paddingLeft: icon ===  'wallet' || icon === 'box' ? '2px' : '7px',
  // alignItems: "center",
  // justifyContent: "center",
  color:{color},
  backgroundColor: alpha(color, 0.16),
}));

// ----------------------------------------------------------------------

const PERCENT = 2.6;
const CHART_DATA = [{ data: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26] }];

const ServicesCard: FC<IServiceCard> = ({
  title,
  icon,
  color,
  value,
  show,
  classname,
  path,
  loading,
  sub,
  subTitle,
  showFCT,
  user,
  isMoney,
}) => {
  const theme = useTheme();
  let navigate = useNavigate();
  const onNavigate = () => {
    console.log(path);
    // navigate(path)
  };

  const chartOptions = {
    colors: color,
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
    tooltip: {
      enabled: false,
    },
  };
  const getIcon = (img) => {
    let icon = null
    switch (img) {
      case 'wallet':
        icon = wallet
        break;
      case 'tree-structure':
        icon = treeStructure
        break;
      case 'tree-struct':
        icon = treeStruct
        break;
      case 'box':
        icon = box
        break;
      default:
        icon = treeStruct
        break;
    }
    return icon
  }

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        cursor: "pointer",
        height: "140px",
        maxHeight: "140px",
      }}
      onClick={onNavigate}
    >
      <Stack direction="row" sx={{ flexGrow: 1 }}>
        <BorderBoxStyle color={color}>
          <Typography sx={{ fontSize: "10px" }}>State</Typography>
          <Typography variant="h3">
            {!loading ? (
              isMoney ? (
                formatter.format(value)
              ) : (
                value  + '%'
              )
            ) : (
              <Skeleton variant="rectangular" width={100} height={30} />
            )}
          </Typography>
          {/* <Typography component="h2" sx={{position: 'absolute', top: '63px', left: '35px'}} variant="subtitle2">{title}</Typography> */}
        </BorderBoxStyle>
        <Box sx={{ flexGrow: 1, padding: "5px", paddingTop: "2rem" }}>
          <Typography style={{ fontSize: "10px" }} variant="span">
            {!loading ? (
              <>
                {subTitle}
                {/* {showFCT && (
                  <span>{user.level === "National" && "(including FCT)"}</span>
                )} */}
              </>
            ) : (
              <Skeleton variant="rectangular" width={100} height={30} />
            )}
          </Typography>
        </Box>
        <IconWrapperStyle
         color={color}
         icon={icon}
        >
          <img  width={26}
            height={26} alt="screen" src={getIcon(icon)} />
          {/* <Icon
            width={16}
            height={16}
            icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
          /> */}
        </IconWrapperStyle>
      </Stack>
    </Card>
  );
};

export default ServicesCard;
