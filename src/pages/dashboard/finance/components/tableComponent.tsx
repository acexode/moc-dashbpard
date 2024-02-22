import { FC } from "react";
import { MaterialReactTable } from "material-react-table";
import { darken } from "@mui/material";

const TableComponent: FC<{
  data: any;
  columns: any;
  isLoading?:boolean
}> = ({columns,data,isLoading}) => {
 

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableFullScreenToggle={false}
      state={{isLoading}}
     
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
    />
  );
};

export default TableComponent;
