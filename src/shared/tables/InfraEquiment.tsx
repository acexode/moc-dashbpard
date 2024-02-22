// @ts-nocheck

import React, { useMemo ,FC, useEffect, useState} from "react";

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";

//Material UI Imports
import { darken } from "@mui/material";
import { IselectedState } from "../../components/_dashboard/general-app/MainTable";
import HandleExport from "./handleExport";
import useSettings from "../../hooks/useSettings";
import { levels } from "../../constants";
import { convertIndicators } from "../../utility/setStateFunc";
import { getLgaData } from "../../utility";
import { mergeIndicatorsArrays } from "../../utility/mergeIndicators";
import { defaultColumns } from "./defaultColumns";


//Mock Data
// import { demographyData } from "../../data/demographyData";

const InfraEquimentTable:FC<{selectedState:IselectedState, userProfile: any, tier: string}> = ({selectedState, userProfile, tier}) => {
    const {allTiersIndicators} = useSettings()
  const [data, setdata] = useState([])
  const stateAccessorKey = ['indicator26State','indicator27State']
  const lgaAccessorKey = ['indicator26LGA','indicator27LGA']

  const dynamicIndicators = [
    {
        accessorKey: "",
        header: "PHCs that carried out repairs with BHCPF",
        size: 150,
      },
      {
        accessorKey: "",
        header: "PHCs that purchased equipment with BHCPF",
        size: 150,
      },
  ]
  const [columns, setcolumns] = useState([])



  

  useEffect(()=>{
    const filteredTiersColumn = defaultColumns.filter((column) => {
        // Filter out the "LGA" column if selectedState.state doesn't exist
        if(selectedState.state){
          return  column.accessorKey !== "state"
        }
        return column.accessorKey !== "lga"
      });

      const handleLgaData = () => {
        const lgadata1 = getLgaData(allTiersIndicators.lga.indicator26Lga, selectedState.state)
        const lgadata2 = getLgaData(allTiersIndicators.lga.indicator27Lga, selectedState.state)
        console.log({lgadata1, lgadata2: lgadata2});
        const t26 = convertIndicators(lgadata1, "", tier, selectedState)
        const t27 = convertIndicators(lgadata2, "", tier, selectedState)
        const mergedArray = mergeIndicatorsArrays( ['year', 'quarter', 'state', 'lga'], t26, t27,).map(e => ({
            ...e,
            indicator26LGA: Math.floor(e?.indicator26LGA * 100),
            indicator27LGA: Math.floor(e?.indicator27LGA * 100)
        }));
        console.log(mergedArray);
        const dcolumn = dynamicIndicators.map((e, i) => ({...e, accessorKey: lgaAccessorKey[i]}))
        const col = [...filteredTiersColumn, ...dcolumn]
        setcolumns(col)
        setdata(mergedArray)
      }

    if(userProfile?.level === levels.national){
      if(selectedState.national && !selectedState.state){
        console.log(selectedState);
        const t26 = convertIndicators(allTiersIndicators.state.indicator26State, "", tier, selectedState)
        const t27 = convertIndicators(allTiersIndicators.state.indicator27State, "", tier, selectedState)
        const mergedArray = mergeIndicatorsArrays(['year', 'quarter', 'state'], t26, t27,).map(e => ({
            ...e,
            indicator26State: Math.floor(e?.indicator26State * 100),
            indicator27State: Math.floor(e?.indicator27State * 100)
        }));
        setdata(mergedArray)
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
      
  },[selectedState, allTiersIndicators])
  useEffect(()=>{
    console.log(selectedState);
    console.log(allTiersIndicators);
    // if(proportionSPHCB){
    //   console.log(proportionSPHCB);
    //   const dataArray = proportionSPHCB?.map((dt) => ({
    //     ...dt,
    //     proportionSPHCB: selectedState.state ? `${(dt?.indicator7Lga * 100).toFixed(1)}%`: `${(dt?.indicator7State * 100).toFixed(1)}%`
    //   }))
    //   console.log(dataArray);
    //   setFinanceData(dataArray)
    // }
  },[allTiersIndicators, selectedState])
 

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
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
        <HandleExport table={table} columns={columns} data={data} tier={tier} />
      )}
    />
  );
};

export default InfraEquimentTable;
