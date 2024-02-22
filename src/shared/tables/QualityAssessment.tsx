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

const QualityAssessmentTable: FC<{
  selectedState: IselectedState;
  userProfile: any;
  tier: string;
}> = ({ selectedState, userProfile, tier }) => {
  const [qualityData, setQualityData] = useState([]);
  const {allTiersIndicators} = useSettings()
  const [columns, setcolumns] = useState([])
  const stateAccessorKey = ['indicator37State','indicator38State', 'indicator39State', ]
  const lgaAccessorKey = ['indicator37LGA', 'indicator38LGA', 'indicator39LGA']
  const dynamicIndicators =  [
    {
      accessorKey: "",
      header: "Quality Assessment Conducted",
      size: 150,
    },
    {
      accessorKey: "",
      header: "Completed at least 50% Activities in Business Plan",
      size: 150,
    },
    {
      accessorKey: "",
      header: "QA Score > 80",
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
      const lgadata1 = getLgaData(allTiersIndicators.lga.indicator37Lga, selectedState.state)
          const lgadata2 = getLgaData(allTiersIndicators.lga.indicator38Lga, selectedState.state)
          const lgadata3 = getLgaData(allTiersIndicators.lga.indicator39Lga, selectedState.state)
          console.log({lgadata1, lgadata2});
          const t37 = convertIndicators(lgadata1, "", tier, selectedState)
          const t38 = convertIndicators(lgadata2, "", tier, selectedState)
          const t39 = convertIndicators(lgadata3, "", tier, selectedState)
      console.log(t39);
          const mergedArray = mergeIndicatorsArrays(['year', 'quarter', 'state', 'lga'], t37,t38,t39).map(e => ({
              ...e,
              indicator37LGA: Math.floor(e?.indicator37Lga * 100),
              indicator38LGA: Math.floor(e?.indicator38Lga * 100),
              indicator39LGA: Math.floor(e?.indicator39Lga * 100),

          }));
          console.log(mergedArray);
          const dcolumn = dynamicIndicators.map((e, i) => ({...e, accessorKey: lgaAccessorKey[i]}))
          const col = [...filteredTiersColumn, ...dcolumn]
          setcolumns(col)
          setQualityData(mergedArray)
    }

    console.log(allTiersIndicators);
    if(allTiersIndicators){

      if(userProfile?.level === levels.national){
        if(selectedState.national && !selectedState.state){
          console.log(selectedState);
          const t37 = convertIndicators(allTiersIndicators.state.indicator37State, "", tier, selectedState)
          const t38 = convertIndicators(allTiersIndicators.state.indicator38State, "", tier, selectedState)
          const t39 = convertIndicators(allTiersIndicators.state.indicator39State, "", tier, selectedState)
          console.log({t37,t38,t39, merged: mergeIndicatorsArrays( ['year', 'quarter', 'state'], t37,t38,t39)});
          const mergedArray = mergeIndicatorsArrays(['year', 'quarter', 'state'], t37,t38,t39 ).map(e => ({
              ...e,
              indicator37State: Math.floor(e?.indicator37State * 100),
              indicator38State: Math.floor(e?.indicator38State * 100),
              indicator39State: Math.floor(e?.indicator39State * 100),
          }));
          setQualityData(mergedArray)
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
        handleLgaData()
        console.log('National');
      }
    }
    
  }, [selectedState, allTiersIndicators]);

  return (
    <MaterialReactTable
      columns={columns}
      data={qualityData}
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
        <HandleExport table={table} columns={columns} data={qualityData} tier={tier} />
      )}
    />
  );
};

export default QualityAssessmentTable;
