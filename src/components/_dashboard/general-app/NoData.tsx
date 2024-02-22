// @ts-nocheck
import { useEffect, useState } from "react";
import { getColor } from "../../../utility";
import noDataImg from "../../../assets/no-data.png";
import useSettings from "../../../hooks/useSettings";
import { Skeleton } from "@mui/material";

const NoData = () => {
  const { fetchedIndicators } = useSettings();
  const [fetching, setfetching] = useState(true);
  useEffect(() => {
    setfetching(true);
    if (fetchedIndicators) {
      setfetching(false);
    } else {
      setfetching(true);
    }
  }, [fetchedIndicators]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      {fetching ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={210}
          height={118}
        />
      ) : (
        <>
          <img style={{ width: "25%", height: "10%" }} src={noDataImg} />
          <span style={{ fontWeight: 600, color: getColor(80) }}>No Data</span>
        </>
      )}
    </div>
  );
};

export default NoData;
