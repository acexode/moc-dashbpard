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

const HumanResourcesTable: FC<{

  selectedState: IselectedState;
  userProfile: any;
  tier: string;
}> = ({ selectedState, userProfile, tier }) => {
  const { allTiersIndicators } = useSettings();
  const [humanData, setHumanData] = useState([]);
  const [columns, setcolumns] = useState([]);
  const stateAccessorKey = [
    "indicator20State",
    "indicator21State",
    "indicator22State",
    "indicator24State",
  ];
  const lgaAccessorKey = [
    "indicator20LGA",
    "indicator21LGA",
    "indicator22LGA",
    "indicator24LGA",
  ];
  const dynamicIndicators = [
    {
      accessorKey: "",
      header: "2 or More Midwives",
      size: 150,
    },
    {
      accessorKey: "",
      header: "2 or More CHEWs",
      size: 150,
    },
    {
      accessorKey: "",
      header: "HF Engaging Adhoc Staff",
      size: 150,
    },
    {
      accessorKey: "",
      header: "Wards with CHIPS Agents",
      size: 150,
    },
  ];

  useEffect(() => {
    // console.log(allTiersIndicators);
    const filteredTiersColumn = defaultColumns.filter((column) => {
      // Filter out the "LGA" column if selectedState.state doesn't exist
      if (selectedState.state) {
        return column.accessorKey !== "state";
      }
      return column.accessorKey !== "lga";
    });
    const  handleLgaData = () =>{
      const lgadata1 = getLgaData(
        allTiersIndicators.lga.indicator20Lga,
        selectedState.state
      );
      const lgadata2 = getLgaData(
        allTiersIndicators.lga.indicator21Lga,
        selectedState.state
      );
      const lgadata3 = getLgaData(
        allTiersIndicators.lga.indicator22Lga,
        selectedState.state
      );
      const lgadata4 = getLgaData(
        allTiersIndicators.lga.indicator24Lga,
        selectedState.state
      );
      // console.log({ lgadata1, lgadata2: lgadata2 });
      const t20 = convertIndicators(lgadata1, "", tier, selectedState);
      const t21 = convertIndicators(lgadata2, "", tier, selectedState);
      const t22 = convertIndicators(lgadata3, "", tier, selectedState);
      const t24 = convertIndicators(lgadata4, "", tier, selectedState);

      const mergedArray = mergeIndicatorsArrays(
        ["year", "quarter", "state", "lga"],
        t20,
        t21,
        t22,
        t24
      ).map((e) => ({
        ...e,
        indicator20LGA: Math.floor(e?.indicator20Lga * 100),
        indicator21LGA: Math.floor(e?.indicator21Lga * 100),
        indicator22LGA: Math.floor(e?.indicator22LGA * 100),
        indicator24LGA: Math.floor(e?.indicator24LGA * 100),
      }));
      // console.log(mergedArray);
      const dcolumn = dynamicIndicators.map((e, i) => ({
        ...e,
        accessorKey: lgaAccessorKey[i],
      }));
      const col = [...filteredTiersColumn, ...dcolumn];
      setcolumns(col);
      // console.log(col);
      setHumanData(mergedArray);
      // console.log("National");
    }

    // console.log(allTiersIndicators);
    if (allTiersIndicators) {
      if (userProfile?.level === levels.national) {
        if (selectedState.national && !selectedState.state) {
          // console.log(selectedState);
          const t20 = convertIndicators(
            allTiersIndicators.state.indicator20State,
            "",
            tier,
            selectedState
          );
          const t21 = convertIndicators(
            allTiersIndicators.state.indicator21State,
            "",
            tier,
            selectedState
          );
          const t22 = convertIndicators(
            allTiersIndicators.state.indicator22State,
            "",
            tier,
            selectedState
          );
          const t24 = convertIndicators(
            allTiersIndicators.state.indicator24State,
            "",
            tier,
            selectedState
          );
          const mergedArray = mergeIndicatorsArrays(
            ["year", "quarter", "state"],
            t20,
            t21,
            t22,
            t24
          ).map((e) => ({
            ...e,
            indicator20State: Math.floor(e?.indicator20State * 100),
            indicator21State: Math.floor(e?.indicator21State * 100),
            indicator22State: Math.floor(e?.indicator22State * 100),
            indicator24State: Math.floor(e?.indicator24State * 100),
          }));
          setHumanData(mergedArray);
          const dcolumn = dynamicIndicators.map((e, i) => ({
            ...e,
            accessorKey: stateAccessorKey[i],
          }));
          // console.log(dcolumn);
          const col = [...filteredTiersColumn, ...dcolumn];
          // console.log(col);
          setcolumns(col);
          // console.log(mergedArray);
        } else if (selectedState.state) {
          // console.log("state");
          handleLgaData();
        }
      } else {
        handleLgaData()
      }
    }
  }, [selectedState, allTiersIndicators]);

  return (
    <MaterialReactTable
      columns={columns}
      data={humanData}
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
        <HandleExport
          table={table}
          columns={columns}
          data={humanData}
          tier={tier}
        />
      )}
    />
  );
};

export default HumanResourcesTable;
