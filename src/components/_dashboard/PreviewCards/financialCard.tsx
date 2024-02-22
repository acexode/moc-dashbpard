// @ts-nocheck
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";
import { useState } from "react";
//
// ----------------------------------------------------------------------
import monIcon from "../../../assets/mon.svg";
import { getColor } from "../../../utility";



const FinancialPreviewCard = () => {
  const [value, setValue] = useState(90);
  const [phc, setPhc] = useState(40);
  const tier = "National"

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
            marginTop: "1rem",
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

export default FinancialPreviewCard;
