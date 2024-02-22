// @ts-nocheck

import React, { useMemo, FC, useEffect, useState } from "react";

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";

//Material UI Imports
import { darken } from "@mui/material";
import { IselectedState } from "../../components/_dashboard/general-app/MainTable";
import HandleExport from "./handleExport";
import { defaultColumns } from "./defaultColumns";
import useSettings from "../../hooks/useSettings";
import { convertIndicators } from "../../utility/setStateFunc";
import { mergeIndicatorsArrays } from "../../utility/mergeIndicators";
import { levels } from "../../constants";
import { getLgaData } from "../../utility";


const GovernanceTable: FC<{
  selectedState: IselectedState;
  userProfile: any;
  tier: string;
}> = ({ selectedState, userProfile, tier }) => {
  const {allTiersIndicators} = useSettings()
  const [governanceData, setGovernanceData] = useState([]);
  const [columns, setcolumns] = useState([])
  const stateAccessorKey = ['indicator3State','indicator4State']
  const lgaAccessorKey = ['indicator4LGA']

  const dynamicIndicators =  [
      {
        accessorKey: "",
        header: "LGA Coordination Platforms",
        size: 150,
      },
      {
        accessorKey: "",
        header: "PHCs Coordination Platforms",
        size: 150,
      },
    ]

  
    useEffect(() => {
    console.log(allTiersIndicators);
    const filteredTiersColumn = defaultColumns.filter((column) => {
      // Filter out the "LGA" column if selectedState.state doesn't exist
      if(selectedState.state){
        return  column.accessorKey !== "state"
      }
      return column.accessorKey !== "lga"
    });

    console.log(allTiersIndicators);
    const handleLgaData = () => {
      const lgadata1 = getLgaData(allTiersIndicators.lga.indicator4LGA, selectedState.state)

      console.log({lgadata1});
      const t4 = convertIndicators(lgadata1, "", tier, selectedState)
      const mergedArray = t4.map(e => ({
          ...e,
          indicator4LGA: Math.floor(e?.indicator4LGA * 100),
      }));
      console.log(mergedArray);
      const dcolumn = dynamicIndicators.map((e, i) => ({...e, accessorKey: lgaAccessorKey[i]}))
      const col = [...filteredTiersColumn, ...dcolumn]
      setcolumns(col)
      setGovernanceData(mergedArray)
    }
    if(allTiersIndicators){

      if(userProfile?.level === levels.national){
        if(selectedState.national && !selectedState.state){
          console.log(selectedState);
          const t3 = convertIndicators(allTiersIndicators.state.indicator3State, "", tier, selectedState)
          const t4 = convertIndicators(allTiersIndicators.state.indicator4State, "", tier, selectedState)
          console.log({t3,t4, merged: mergeIndicatorsArrays( ['year', 'quarter', 'state'], t3, t4)});
          const mergedArray = mergeIndicatorsArrays(['year', 'quarter', 'state'],  t3, t4 ).map(e => ({
              ...e,
              indicator3State: Math.floor(e?.indicator3State * 100),
              indicator4State: Math.floor(e?.indicator4State * 100),
             
          }));
          setGovernanceData(mergedArray)
          const dcolumn = dynamicIndicators.map((e, i) => ({...e, accessorKey: stateAccessorKey[i]}))
          const col = [...filteredTiersColumn, ...dcolumn]
          setcolumns(col)
          console.log(mergedArray);
        }
        else if(selectedState.state){
          console.log('state');
          handleLgaData()
          
        }
      }else{
        console.log('National');
        handleLgaData()
      }
    }
    
  }, [selectedState, allTiersIndicators]);

  return (
    <MaterialReactTable
      columns={columns}
      data={governanceData}
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
        <HandleExport table={table} columns={columns} data={governanceData} tier={tier} />
      )}
    />
  );
};

export default GovernanceTable;
