import { Card, CardHeader, Box, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { getColorReverse, getIndicatorTier, getLightColorReverse, getColor, getLightColor } from "../../../utility";
interface IEssentialMedProgress{
    progress: number;
    label: string
}
const EssentialMedProgress: FC<IEssentialMedProgress> = ({progress, label}) => {
  return (
    <div>
                {progress ? (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              width: "243px",
              background: `${getLightColor(progress)}`,
              border: `1px solid ${getLightColor(progress)}`,
              marginTop: ".8rem",
              borderRadius: "16px",
              height: "31px",
            }}
          >
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "3px",
                background: "#fff",
                padding: "5px 16px",
                borderRadius: "20px",
                fontSize: "10px",
              }}
            >
              {progress}%
            </span>
            {/* <span style={{position: 'absolute', left: '10px', top: '15px', fontWeight: '800', color: `${progress < 40 ? '#000' : '#fff'}`  }}> QA Score</span> */}

            <Box
              sx={{
                height: "31px",
                width: `${progress}%`,
                background: getColor(progress),
                textAlign: "center",
                borderRadius: "16px",
                fontWeight: "800",
                fontSize: "10px",
                paddingTop: "3px",
                color: "white",
              }}
            ></Box>
          </Box>
        ) : <div style={{marginTop: '15px'}}></div>}
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
            color: getColor(progress),
          }}
        >
          {progress}%
        </span>{" "}
        {label}
      </Typography>
    </div>
  )
}

export default EssentialMedProgress
