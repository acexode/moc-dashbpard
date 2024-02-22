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

//Mock Data
// import { demographyData } from "../../data/demographyData";

const EssentialMedicineTable: FC<{
  selectedState: IselectedState;
  userProfile: any;
  tier: string;
}> = ({ selectedState, userProfile, tier }) => {
  const { allTiersIndicators } = useSettings();
  const [essentialMedData, setEssentialMedData] = useState([]);
  const [columns, setcolumns] = useState([]);
  const stateAccessorKey = [
    "indicator17State",
    "indicator18State",
    "indicator19State",
  ];
  const lgaAccessorKey = ["indicator17LGA", "indicator18LGA", "indicator19LGA"];
  const dynamicIndicators = [
    {
      accessorKey: "",
      header: "Stockout of Essential (tracer) Drugs ",
      size: 150,
    },
    {
      accessorKey: "",
      header: "Purchasing Essential Drugs from DMA/Accredited Pharmacy",
      size: 150,
    },
    {
      accessorKey: "",
      header: "Received Essential Drugs Donations From Other Sources",
      size: 150,
    },
  ];
  useEffect(() => {
    console.log(allTiersIndicators);
    const filteredTiersColumn = defaultColumns.filter((column) => {
      // Filter out the "LGA" column if selectedState.state doesn't exist
      if (selectedState.state) {
        return column.accessorKey !== "state";
      }
      return column.accessorKey !== "lga";
    });

    const handleLgaData = () => {
      const lgadata1 = getLgaData(
        allTiersIndicators.lga.indicator17Lga,
        selectedState.state
      );
      const lgadata2 = getLgaData(
        allTiersIndicators.lga.indicator18Lga,
        selectedState.state
      );
      const lgadata3 = getLgaData(
        allTiersIndicators.lga.indicator19Lga,
        selectedState.state
      );

      console.log({ lgadata1, lgadata2 });
      const t17 = convertIndicators(lgadata1, "", tier, selectedState);
      const t18 = convertIndicators(lgadata2, "", tier, selectedState);
      const t19 = convertIndicators(lgadata3, "", tier, selectedState);

      const mergedArray = mergeIndicatorsArrays(
        ["year", "quarter", "state", "lga"],
        t17,
        t18,
        t19
      ).map((e) => ({
        ...e,
        indicator17LGA: Math.floor(e?.indicator17Lga * 100),
        indicator18LGA: Math.floor(e?.indicator18Lga * 100),
        indicator19LGA: Math.floor(e?.indicator19LGA * 100),
      }));
      console.log(mergedArray);
      const dcolumn = dynamicIndicators.map((e, i) => ({
        ...e,
        accessorKey: lgaAccessorKey[i],
      }));
      const col = [...filteredTiersColumn, ...dcolumn];
      setcolumns(col);
      setEssentialMedData(mergedArray);
    }

    console.log(allTiersIndicators);
    if (allTiersIndicators) {
      if (userProfile?.level === levels.national) {
        if (selectedState.national && !selectedState.state) {
          console.log(selectedState);
          const t17 = convertIndicators(
            allTiersIndicators.state.indicator17State,
            "",
            tier,
            selectedState
          );
          const t18 = convertIndicators(
            allTiersIndicators.state.indicator18State,
            "",
            tier,
            selectedState
          );
          const t19 = convertIndicators(
            allTiersIndicators.state.indicator19State,
            "",
            tier,
            selectedState
          );
          console.log({
            t18,
            t17,
            t19,
            merged: mergeIndicatorsArrays(
              ["year", "quarter", "state"],
              t17,
              t18,
              t19
            ),
          });
          const mergedArray = mergeIndicatorsArrays(
            ["year", "quarter", "state"],
            t17,
            t18,
            t19
          ).map((e) => ({
            ...e,
            indicator17State: Math.floor(e?.indicator17State * 100),
            indicator18State: Math.floor(e?.indicator18State * 100),
            indicator19State: Math.floor(e?.indicator19State * 100),
          }));
          setEssentialMedData(mergedArray);
          const dcolumn = dynamicIndicators.map((e, i) => ({
            ...e,
            accessorKey: stateAccessorKey[i],
          }));
          const col = [...filteredTiersColumn, ...dcolumn];
          setcolumns(col);
          console.log(mergedArray);
        } else if (selectedState.state) {
          console.log("state");
          handleLgaData()
        }
      } else {
        console.log("National");
        handleLgaData()
      }
    }
  }, [selectedState, allTiersIndicators]);

  return (
    <MaterialReactTable
      columns={columns}
      data={essentialMedData}
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
        <HandleExport table={table} columns={columns} data={essentialMedData} tier={tier} />
      )}
    />
  );
};

export default EssentialMedicineTable;
