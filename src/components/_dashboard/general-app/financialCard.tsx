// @ts-nocheck
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
//
// ----------------------------------------------------------------------
import monIcon from "../../../assets/mon.svg";
import { getColor } from "../../../utility";

interface IFinancial {
  proportionSPHCB: any;
  proportionPHC: any;
  tier: string;
  state: string;
}

const FinancialCard: FC<IFinancial> = ({
  proportionSPHCB,
  proportionPHC,
  tier,
  state,
}) => {
  const [value, setValue] = useState();
  const [phc, setPhc] = useState();
  useEffect(() => {
    console.log(proportionPHC, proportionSPHCB);
    if (proportionSPHCB && tier) {
      const i =
        tier === "State"
          ? proportionSPHCB.filter((e) => e?.state === state)[0]
          : proportionSPHCB[0];
      if (i) {
        setValue(i["indicator7" + tier] * 100)
      } else {
        setValue(0);
      }
    }
    if(proportionPHC && tier){
      const p =
        tier === "State"
          ? proportionPHC?.filter((e) => e?.state === state)[0]
          : proportionPHC[0];
      console.log(p, p.indicator5State * 100);
      if(p){
        setPhc(p?.indicator5State * 100);
      } else {
        setPhc(0);
      }
    }
  }, [proportionSPHCB]);
  return (
    <Card className="card" style={{ height: "250px" }}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <img src={monIcon} alt="" />
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
              Financial Management
            </Typography>
          </div>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
        }}
        px={3}
      >
        {tier === "National" && (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <>
                {/* {phc} */}
                  <div
                    key={index}
                    className="contentBox"
                    style={{
                      backgroundColor:
                        index < phc / 10 ? getColor(phc) : "#D3D3D3",
                    }}
                  />
                </>
              ))}
            </div>

            <Typography
              style={{ fontSize: "0.7rem", fontWeight: 400, color: "#525252" }}
            >
              <span style={{ color: getColor(100) }}>{parseInt(phc || 0)}%</span> SPHCB receiving
              quarterly allocation
            </Typography>
          </>
        )}

        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            marginTop: "2rem",
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <>
              <div
                key={index}
                className="contentBox"
                style={{
                  backgroundColor:
                    index < value / 10 ? getColor(value) : "#D3D3D3",
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
            marginBottom: "1.5rem",
          }}
        >
          {parseInt(value || 0)}% PHCs receiving quarterly allocation
        </Typography>
      </Box>
    </Card>
  );
};

export default FinancialCard;
