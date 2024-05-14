//@ts-nocheck
import React from "react";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";

interface HandleExportProps {
  table: any;
  columns: any[];
  data: any[];
  tier: string;
}

const HandleExport: React.FC<HandleExportProps> = ({
  table,
  columns,
  data,
  tier,
}) => {
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: columns.map((c) => c.header),
  };
  function mapDataHeaders(data, columns) {
    const mappedData = {};

    columns.forEach((column) => {
      if (data.hasOwnProperty(column.accessorKey)) {
        mappedData[column.header] = data[column.accessorKey];
      }
    });

    return mappedData;
  }

  const handleExportData = () => {
    const mappedData = data.map((e) => {
      const {
        quarter: Quarter,
        state: State,
        lga: Lga,
        year: Year,
        ...rest
      } = e;
      const ncol = mapDataHeaders(rest, columns);

      if (tier === "State") {
        return { Lga, Quarter, Year, ...ncol };
      } else {
        return { State, Quarter, Year, ...ncol };
      }
    });


    const csv = generateCsv(csvOptions)(mappedData);
    download(csvOptions)(csv);
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}>
      
      {/* <Button
        color="primary"
        onClick={handleExportData}
        startIcon={<FileDownloadIcon />}
        variant="contained"
      >
        Export Data NOTE: // UNCOMMENT THIS TO SHOW THE EXPORT BUTTON
      </Button> */}
     
    </Box>
  );
};

export default HandleExport;
