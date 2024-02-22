// @ts-nocheck
// @ts-nocheck

import React, { useMemo, FC, useEffect, useState } from "react";

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from "material-react-table";

//Material UI Imports
import { darken } from "@mui/material";
import { IselectedState } from "../../components/_dashboard/general-app/MainTable";
import HandleExport from "./handleExport";
import { defaultColumns, financeDynamicIndicators } from "./defaultColumns";
import useSettings from "../../hooks/useSettings";
import { convertIndicators } from "../../utility/setStateFunc";
import { mergeIndicatorsArrays } from "../../utility/mergeIndicators";
import { levels } from "../../constants";
import { getLgaData } from "../../utility";

//Mock Data
// import { demographyData } from "../../data/demographyData";

const FinanceManagementTable: FC<{
  selectedState: IselectedState;
  userProfile: any;
  tier: string;
}> = ({ selectedState, userProfile, tier }) => {
  const [financeData, setFinanceData] = useState([]);
  const { allTiersIndicators } = useSettings();
  const [columns, setcolumns] = useState([]);
  const stateAccessorKey = [
    "indicator6State",
    "indicator7State",
    "indicator10State",
    "indicator12State",
    "indicator13State",
    "indicator14State",
    "indicator15State",
  ];
  const lgaAccessorKey = [
    "indicator6LGA",
    "indicator7LGA",
    "indicator10LGA",
    "indicator12LGA",
    "indicator13LGA",
    "indicator14LGA",
    "indicator15LGA",
  ];
  const dynamicIndicators = financeDynamicIndicators;

  useEffect(() => {
    const filteredTiersColumn = defaultColumns.filter((column) => {
      // Filter out the "LGA" column if selectedState.state doesn't exist
      if (selectedState.state) {
        return column.accessorKey !== "state";
      }
      return column.accessorKey !== "lga";
    });
    const handleLgaData = () => {
      console.log(allTiersIndicators);
      const lgadata6 = getLgaData(
        allTiersIndicators.lga.indicator6LGA,
        selectedState.state
      );
      const lgadata7 = getLgaData(
        allTiersIndicators.lga.indicator7Lga,
        selectedState.state
      );
      const lgadata10 = getLgaData(
        allTiersIndicators.lga.indicator10Lga,
        selectedState.state
      );
      const lgadata12 = getLgaData(
        allTiersIndicators.lga.indicator12Lga,
        selectedState.state
      );
      const lgadata13 = getLgaData(
        allTiersIndicators.lga.indicator13Lga,
        selectedState.state
      );
      const lgadata14 = getLgaData(
        allTiersIndicators.lga.indicator14Lga,
        selectedState.state
      );
      const lgadata15 = getLgaData(
        allTiersIndicators.lga.indicator15Lga,
        selectedState.state
      );

      console.log({ lgadata6, lgadata7, lgadata15 });
      const t6 = convertIndicators(lgadata6, "", tier, selectedState);
      const t7 = convertIndicators(lgadata7, "", tier, selectedState);
      const t10 = convertIndicators(lgadata10, "", tier, selectedState);
      const t12 = convertIndicators(lgadata12, "", tier, selectedState);
      const t13 = convertIndicators(lgadata13, "", tier, selectedState);
      const t14 = convertIndicators(lgadata14, "", tier, selectedState);
      const t15 = convertIndicators(lgadata15, "", tier, selectedState);
        console.log(t15);
      const mergedArray = mergeIndicatorsArrays(
        ["year", "quarter", "state", "lga"],
        t6,
        t7,
        t10,
        t12,
        t13,
        t14,
        t15
      ).map((e) => ({
        ...e,
        indicator6LGA: Math.floor(e?.indicator6LGA * 100),
        indicator7LGA: Math.floor(e?.indicator7Lga * 100),
        indicator10LGA: Math.floor(e?.indicator10LGA * 100),
        indicator12LGA: Math.floor(e?.indicator12LGA * 100),
        indicator13LGA: Math.floor(e?.indicator13LGA * 100),
        indicator14LGA: Math.floor(e?.indicator14LGA * 100),
        indicator15LGA: Math.floor(e?.Indicator15LGA * 100),
      }));
      console.log(mergedArray);
      const dcolumn = dynamicIndicators.map((e, i) => ({
        ...e,
        accessorKey: lgaAccessorKey[i],
      }));
      const col = [...filteredTiersColumn, ...dcolumn];
      setcolumns(col);
      setFinanceData(mergedArray);
    }
    if (allTiersIndicators) {
      if (userProfile?.level === levels.national) {
        if (selectedState.national && !selectedState.state) {
          console.log(selectedState);
          const t6 = convertIndicators(
            allTiersIndicators.state.indicator6State,
            "",
            tier,
            selectedState
          );
          const t7 = convertIndicators(
            allTiersIndicators.state.indicator7State,
            "",
            tier,
            selectedState
          );
          const t10 = convertIndicators(
            allTiersIndicators.state.indicator10State,
            "",
            tier,
            selectedState
          );
          const t12 = convertIndicators(
            allTiersIndicators.state.indicator12State,
            "",
            tier,
            selectedState
          );
          const t13 = convertIndicators(
            allTiersIndicators.state.indicator13State,
            "",
            tier,
            selectedState
          );
          const t14 = convertIndicators(
            allTiersIndicators.state.indicator14State,
            "",
            tier,
            selectedState
          );
          const t15 = convertIndicators(
            allTiersIndicators.state.indicator15State,
            "",
            tier,
            selectedState
          );
          console.log({
            t6,
            t7,
            t10,
            t12,
            t13,
            t14,
            t15,
            merged: mergeIndicatorsArrays(
              ["year", "quarter", "state"],
              t6,
              t7,
              t10,
              t12,
              t13,
              t14,
              t15
            ),
          });
          const mergedArray = mergeIndicatorsArrays(
            ["year", "quarter", "state"],
            t6,
            t7,
            t10,
            t12,
            t13,
            t14,
            t15
          ).map((e) => ({
            ...e,
            indicator6State: Math.floor(e?.indicator6State * 100),
            indicator7State: Math.floor(e?.indicator7State * 100),
            indicator10State: Math.floor(e?.indicator10State * 100),
            indicator12State: Math.floor(e?.indicator12State * 100),
            indicator13State: Math.floor(e?.indicator13State * 100),
            indicator14State: Math.floor(e?.indicator14State * 100),
            indicator15State: Math.floor(e?.indicator15State * 100),
          }));
          setFinanceData(mergedArray);
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
      data={financeData}
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
        <HandleExport table={table} columns={columns} data={financeData} tier={tier} />
      )}
    />
  );
};

export default FinanceManagementTable;
