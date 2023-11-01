// @ts-nocheck

import React, { useMemo ,FC, useEffect, useState} from "react";

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";

//Material UI Imports
import { darken } from "@mui/material";
import { IselectedState } from "../../components/_dashboard/general-app/MainTable";


//Mock Data
// import { demographyData } from "../../data/demographyData";

const CommunityLinkeageTable:FC<{indicator:any,secondIndicator:any,selectedState:IselectedState}> = ({indicator,secondIndicator,selectedState}) => {
  const [commData,setCommData] = useState([])
  console.log({indicator,secondIndicator,selectedState})
  const columns = useMemo(() => [
    {
      accessorKey: "state", //access nested data with dot notation
      header: "State",
      size: 150,
    },
    {
      accessorKey: "lga", //access nested data with dot notation
      header: "LGA",
      size: 150,
    },
    {
      accessorKey: "indicator", //access nested data with dot notation
      header: "PHCs that conducted senitization and awareness creation services",
      size: 150,
    },
    {
      accessorKey: "secondIndicator", //access nested data with dot notation
      header: "PHCs with functional WDCs",
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
    if(selectedState.state){
      return  column.accessorKey !== "state"
    }
    return column.accessorKey !== "lga"
  }));
  useEffect(()=>{
    if(indicator){
      const combinedArray = indicator?.map((item) => {
        const matchingItem = secondIndicator?.find((x) =>
          x.state === item.state &&
          x.year === item.year &&
          x.quarter === item.quarter &&
          x?.lga === item?.lga
        );
      
        return {
          year: item.year,
          quarter: item.quarter,
          state: item.state,
          lga: item.lga,
          indicator: selectedState.state
  ? `${((item.Indicator35Lga || 0) * 100).toFixed(1)}%`
  : `${((item.Indicator35State || 0) * 100).toFixed(1)}%`,
          secondIndicator: matchingItem ? (selectedState.state ? `${(matchingItem.indicator36Lga *100).toFixed(1)}%`: `${(matchingItem.indicator36State *100).toFixed(1)}%`) : 0,
        };
      });
      setCommData(combinedArray)
    }
  },[indicator])
  return (
    <MaterialReactTable
      columns={columns}
      data={commData}
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

export default CommunityLinkeageTable;
