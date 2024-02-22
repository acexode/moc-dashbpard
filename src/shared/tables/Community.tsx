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

const CommunityLinkeageTable: FC<{
  selectedState: IselectedState;
  userProfile: any;
  tier: string;
}> = ({ selectedState, userProfile, tier }) => {
  const [commData, setCommData] = useState([]);
  const { allTiersIndicators } = useSettings();
  const [columns, setcolumns] = useState([]);
  const stateAccessorKey = ["indicator35State", "indicator36State"];
  const lgaAccessorKey = ["indicator35LGA", "indicator36LGA"];
  const dynamicIndicators = [
    {
      accessorKey: "",
      header:
        "PHCs that Conducted Sensitization and Awareness Creation Services",
      size: 150,
    },
    {
      accessorKey: "",
      header: "PHCs with Functional WDCs",
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
        allTiersIndicators.lga.indicator35Lga,
        selectedState.state
      );
      const lgadata2 = getLgaData(
        allTiersIndicators.lga.indicator36Lga,
        selectedState.state
      );

      console.log({ lgadata1, lgadata2: lgadata2 });
      const t35 = convertIndicators(lgadata1, "", tier, selectedState);
      const t36 = convertIndicators(lgadata2, "", tier, selectedState);

      const mergedArray = mergeIndicatorsArrays(
        ["year", "quarter", "state", "lga"],
        t35,
        t36
      ).map((e) => ({
        ...e,
        indicator35LGA: Math.floor(e?.indicator35Lga * 100),
        indicator36LGA: Math.floor(e?.indicator36Lga * 100),
      }));
      console.log(mergedArray);
      const dcolumn = dynamicIndicators.map((e, i) => ({
        ...e,
        accessorKey: lgaAccessorKey[i],
      }));
      const col = [...filteredTiersColumn, ...dcolumn];
      setcolumns(col);
      setCommData(mergedArray);
    }

    console.log(allTiersIndicators);
    if (allTiersIndicators) {
      if (userProfile?.level === levels.national) {
        if (selectedState.national && !selectedState.state) {
          console.log(selectedState);
          const t35 = convertIndicators(
            allTiersIndicators.state.indicator35State,
            "",
            tier,
            selectedState
          );
          const t36 = convertIndicators(
            allTiersIndicators.state.indicator36State,
            "",
            tier,
            selectedState
          );
          console.log({
            t36,
            t35,
            merged: mergeIndicatorsArrays(
              ["year", "quarter", "state"],
              t35,
              t36
            ),
          });
          const mergedArray = mergeIndicatorsArrays(
            ["year", "quarter", "state"],
            t35,
            t36
          ).map((e) => ({
            ...e,
            indicator35State: Math.floor(e?.indicator35State * 100),
            indicator36State: Math.floor(e?.indicator36State * 100),
          }));
          setCommData(mergedArray);
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
      renderTopToolbarCustomActions={({ table }) => (
        <HandleExport table={table} columns={columns} data={commData} tier={tier} />
      )}
    />
  );
};

export default CommunityLinkeageTable;
