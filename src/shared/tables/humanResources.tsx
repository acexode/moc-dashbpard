// @ts-nocheck

import React, { useMemo, FC, useEffect, useState } from "react";

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";

//Material UI Imports
import { darken } from "@mui/material";
import { IselectedState } from "../../components/_dashboard/general-app/MainTable";

const HumanResourcesTable: FC<{
  midIndicator: any;
  chewIndicator: any;
  selectedState: IselectedState;
}> = ({ chewIndicator, midIndicator, selectedState }) => {
  const [humanData, setHumanData] = useState([]);
  const columns = useMemo(() =>
    [
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
      {
        accessorKey: "lga",
        header: "LGA",
        size: 150,
      },
      {
        accessorKey: "midwives",
        header: "2 or More Midwives",
        size: 150,
      },
      {
        accessorKey: "chews",
        header: "2 or More CHEWs",
        size: 150,
      },
      {
        accessorKey: "year",
        header: "Year",
        size: 150,
      },
      {
        accessorKey: "quarter",
        header: "Quarter",
        size: 150,
      },
    ].filter((column) => {
      // Filter out the "LGA" column if selectedState.state doesn't exist
      if (selectedState.state) {
        return column.accessorKey !== "state";
      }
      return column.accessorKey !== "lga";
    })
  );

  useEffect(() => {
    if (chewIndicator && midIndicator) {
      const combinedArray = midIndicator?.map((item) => {
        const matchingItem = chewIndicator?.find(
          (x) =>
            x.state === item.state &&
            x.year === item.year &&
            x.quarter === item.quarter &&
            x?.lga === item?.lga
        );

        return {
          year: item.year,
          quarter: item.quarter,
          state: item.state,
          lga: item?.lga ?? "",
          midwives: selectedState.state
            ? `${(item.indicator20Lga * 100).toFixed(1)}%`
            : `${(item.indicator20State * 100).toFixed(1)}%`,
          chews: matchingItem
            ? selectedState.state
              ? `${(matchingItem.indicator21Lga * 100).toFixed(1)}%`
              : `${(matchingItem.indicator21State * 100).toFixed(1)}%`
            : 0,
        };
      });

      setHumanData(combinedArray);
    }
  }, [midIndicator, chewIndicator]);

  return (
    <MaterialReactTable
      columns={columns}
      data={humanData}
      enableFullScreenToggle={false}
      muiTablePaperProps={{
        elevation: 0,
        sx: {
          borderRadius: "0",
          border: "1px dashed #e0e0e0",
        },
      }}
      muiTableBodyProps={{
        sx: (theme) => ({
          "& tr:nth-of-type(odd)": {
            backgroundColor: darken(theme.palette.background.default, 0.1),
          },
        }),
      }}
    />
  );
};

export default HumanResourcesTable;
