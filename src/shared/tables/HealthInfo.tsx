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

const HealthInformationTable: FC<{
  selectedState: IselectedState;
  userProfile: any;
  tier: string;
}> = ({  selectedState, userProfile, tier }) => {
  const [healthData, setHealthData] = useState([]);
  const {allTiersIndicators} = useSettings()
  const [humanData, setHumanData] = useState([]);
  const [columns, setcolumns] = useState([])
  const stateAccessorKey = ['indicator25State']
  const lgaAccessorKey = ['indicator25LGA']
  const dynamicIndicators =  [
      {
        accessorKey: "",
        header: "PHCs Submitting NHMIS Data",
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
    const handleLgaData = () => {
      const lgadata1 = getLgaData(allTiersIndicators.lga.indicator25Lga, selectedState.state)
          
      console.log({lgadata1});
      const t25 = convertIndicators(lgadata1, "", tier, selectedState)
     

      const mergedArray = mergeIndicatorsArrays(['year', 'quarter', 'state', 'lga'], t25).map(e => ({
          ...e,
          indicator25LGA: Math.floor(e?.indicator25Lga * 100),
         
      }));
      console.log(mergedArray);
      const dcolumn = dynamicIndicators.map((e, i) => ({...e, accessorKey: lgaAccessorKey[i]}))
      const col = [...filteredTiersColumn, ...dcolumn]
      setcolumns(col)
      setHealthData(mergedArray)
    }
    console.log(allTiersIndicators);
    if(allTiersIndicators){

      if(userProfile?.level === levels.national){
        if(selectedState.national && !selectedState.state){
          console.log(selectedState);
          const t25 = convertIndicators(allTiersIndicators.state.indicator25State, "", tier, selectedState)
          console.log({t25,  merged: mergeIndicatorsArrays( ['year', 'quarter', 'state'], t25, )});
          const mergedArray = mergeIndicatorsArrays(['year', 'quarter', 'state'], t25 ).map(e => ({
              ...e,
              indicator25State: Math.floor(e?.indicator25State * 100),
              
          }));
          setHealthData(mergedArray)
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
      enableFullScreenToggle={false}
      data={healthData}
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
        <HandleExport table={table} columns={columns} data={healthData} tier={tier} />
      )}
    />
  );
};

export default HealthInformationTable;
