// @ts-nocheck

import { FC, useEffect, useState } from "react";

// material
import { Card, Typography, CardHeader, Grid, Box } from "@mui/material";
// utils
import govIcon from "../../../assets/Governance.svg";
import { IGovernaceStructure, IGovernaceStructure2 } from "../../../db/types";
import ReactApexChart from "react-apexcharts";
import { getColor, getLightColor } from "../../../utility";
import { indicatorSettings } from "../../../constants";
import { AllIndicators } from "../../settings/allIndicators";
import useSettings from "../../../hooks/useSettings";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface ISettlementReportTable {
  data?: IGovernaceStructure[];
  data2?: IGovernaceStructure2[];
  data3?: any;
  data4?: any;
  state: string;
  tier: string;
}

const GovernmentStructurePreview = () => {
  const [value, setValue] = useState(85);
  const [value2, setValue2] = useState(90);
  const [value3, setValue3] = useState(40);
  const [labels, setlabels] = useState([]);
  const tier = "National";


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
          </div>
        }
      />
      <Box sx={{ px: 2, mt: 1 }}>
        {tier === "National" && (
          <div className="boxContainer">
            <Typography
              style={{ fontSize: "0.8rem", fontWeight: 400, color: "#525252" }}
            >
              State Support Funding
            </Typography>
            <div
              className="badge"
              style={{
                background: `${getLightColor(value2)}`,
                color: `${getColor(value2)}`,
              }}
            >
              {value2 >= 0 ? value2 : ""}%
            </div>
          </div>
        )}
        {tier === "National" && (
          <div className="boxContainer">
            <Typography
              style={{ fontSize: "0.8rem", fontWeight: 400, color: "#525252" }}
            >
              State Coordination Platforms
            </Typography>
            <div
              className="badge"
              style={{
                background: `${getLightColor(value3)}`,
                color: `${getColor(value3)}`,
              }}
            >
              {value3 >= 0 ? value3 : ""}%
            </div>
          </div>
        )}
        <div
          style={{ marginTop: `${tier !== "National" ? "30%" : ""}` }}
          className="boxContainer"
        >
          <Typography
            style={{ fontSize: "0.8rem", fontWeight: 400, color: "#525252" }}
          >
            LGA Coordination Platforms
          </Typography>
          <div
            className="badge"
            style={{
              background: `${getLightColor(value)}`,
              color: `${getColor(value)}`,
            }}
          >
            {value >= 0 ? value : ""}%
          </div>
        </div>
        {/* <button onClick={()=> console.log(value4)}>Click</button> */}
      </Box>
    </Card>
  );
};

export default GovernmentStructurePreview;
