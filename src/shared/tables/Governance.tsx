// @ts-nocheck

import React, { useMemo ,FC} from "react";

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";

//Material UI Imports
import { darken } from "@mui/material";
import { IselectedState } from "../../components/_dashboard/general-app/MainTable";


//Mock Data
// import { demographyData } from "../../data/demographyData";

const GovernanceTable:FC<{lgasFunctionalCoordination:any,selectedState:IselectedState}> = ({lgasFunctionalCoordination=[],selectedState}) => {
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
      accessorKey: "indicator3",
      header: "Functional LGA Coordination Platforms",
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
  console.log(lgasFunctionalCoordination);
  console.log(selectedState);
const newMap = lgasFunctionalCoordination?.map((dt) =>{
  return {
    ...dt,
    indicator3: selectedState.state ?  `${(dt?.indicator3Lga *100).toFixed(1)}%` : `${(dt?.indicator3State *100).toFixed(1)}%`
  }
})

  return (
    <MaterialReactTable
      columns={columns}
      data={newMap}
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

export default GovernanceTable;
