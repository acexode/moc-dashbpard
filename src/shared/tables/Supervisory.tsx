// @ts-nocheck

import React, { useMemo ,FC, useState, useEffect} from "react";

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";

//Material UI Imports
import { darken } from "@mui/material";


//Mock Data

const SupervisoryTable:FC<{supportiveSupervision:any}> = ({supportiveSupervision}) => {
  const [supervisoryData,setSupervisoryData] = useState([])

  const columns = useMemo(() => [
    {
      accessorKey: "state", //access nested data with dot notation
      header: "State",
      size: 150,
    },
    {
      accessorKey: "supportiveSupervision", //access nested data with dot notation
      header: "PHCs visited by State/LGHA team for supportive supervision",
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

  ]);

  useEffect(()=>{
    if(supportiveSupervision){
      const dataArray = Object.entries(supportiveSupervision).map(([state, supportiveSupervision]) => ({
        state,
        supportiveSupervision: `${Math.round(supportiveSupervision * 100)}%`,
      }));
      setSupervisoryData(dataArray)
    }
  },[supportiveSupervision])

  return (
    <MaterialReactTable
      columns={columns}
      data={supervisoryData}
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
      renderTopToolbarCustomActions={({ table }) => (
        <HandleExport table={table} columns={columns} data={supervisoryData} tier={tier} />
      )}
    />
  );
};

export default SupervisoryTable;
