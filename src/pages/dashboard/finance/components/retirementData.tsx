import { Box } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { formatter } from "../../../../utility";
import TableComponent from "./tableComponent";

const RetirementData :FC = () =>{
    const columns =[
        {
          accessorKey: "state",
          header: "State",
          size: 150,
        },
        {
          accessorKey: "lga",
          header: "LGA",
          size: 150,
         
        },
        {
          accessorKey: "facility",
          header: "Facility",
          size: 150,
          Cell: ({ renderedCellValue, row }:any) => (
            <Box
            >  
              <Link style={{color:"#2f3842"}} to={`${PATH_DASHBOARD.financial_management.viewRetirement}`}>{renderedCellValue}</Link>
            </Box>
          ),
        },
        {
          accessorKey: "catchment_pop",
          header: "Catchment Pop.",
          size: 150,
        },
        {
          accessorKey: "revenue",
          header: "Revenue",
          size: 150,
          Cell: ({ renderedCellValue, row }:any) => (
            <Box
            >
              <span>{formatter.format(renderedCellValue)}</span>
            </Box>
          ),
        },
        {
          accessorKey: "expenses",
          header: "Expenses",
          size: 150,
          Cell: ({ renderedCellValue, row }:any) => (
            <Box
            >
              <span>{formatter.format(renderedCellValue)}</span>
            </Box>
          ),
        },
        {
          accessorKey: "balance",
          header: "Balance",
          size: 150,
          Cell: ({ renderedCellValue, row }:any) => (
            <Box
            >
              <span>{formatter.format(renderedCellValue)}</span>
            </Box>
          ),
        },
        {
          accessorKey: "remarks",
          header: "Remarks",
          size: 150,
        },
        {
          accessorKey: "flag",
          header: "Flag",
          size: 150,
          Cell: ({ renderedCellValue, row }:any) => (
            <Box
            >
            <span style={{color:"darkred"}}>{renderedCellValue}</span>
            </Box>
          ),
        },
        {
          accessorKey: "status",
          header: "Status",
          size: 150,
        },
      ]

      const data =[
        {
            state:"Kano",
            lga:"Dambatta",
            facility:"Gawu",
            catchment_pop:"200000",
            revenue:"120000",
            expenses:"20000",
            balance:"1000000",
            remarks:"No",
            flag:"Number of human resources not met",
            status:"Approved"
        },
        {
            state:"Kaduna",
            lga:"Kaduna North",
            facility:"Gui",
            catchment_pop:"200000",
            revenue:"120000",
            expenses:"20000",
            balance:"1000000",
            remarks:"No",
            flag:"Number of human resources not met",
            status:"Rejected"
        },

      ]
    return (
        <>
         <TableComponent columns={columns} data={data} />
        </>
    )
}

export default RetirementData