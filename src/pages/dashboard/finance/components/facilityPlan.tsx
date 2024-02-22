// @ts-nocheck

import { Box, Container, Typography } from "@mui/material";
import { FC } from "react";
import { Grid } from "@mui/material";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import useSettings from "../../../../hooks/useSettings";
import TableComponent from "./tableComponent";
import { formatter } from "../../../../utility";

const FacilityPlan:FC = () =>{
    const { themeStretch } = useSettings();
    const columns =[
        {
          accessorKey: "item",
          header: "Item",
          size: 150,
        },
        {
          accessorKey: "description",
          header: "Description",
          size: 150,
        },
       
        {
          accessorKey: "quantity",
          header: "Quantity",
          size: 150,
        },
        {
          accessorKey: "total",
          header: "Total",
          size: 150,
          Cell: ({ renderedCellValue, row }:any) => (
            <Box
            >
              <span>{formatter.format(renderedCellValue)}</span>
            </Box>
          ),
        },
      ]

      const data =[
        {
            item:"Medicine",
            description:"Cap Amoxicillin",
            quantity:"20",
            total:200000,
        },
        {
            item:"Repairs",
            description:"Door",
            quantity:"",
            total:40000,
        },
        {
            item:"Utilities and Maintenance	",
            description:"NEPA and water bord",
            quantity:"",
            total:200000,
            
        },
      ]
      // Calculate the total amount
  const totalAmount = data?.reduce((acc, row) => acc + parseInt(row?.total || 0, 10), 0);

  // Add a new row for the total amount
  const newData = [...data, { item: 'Total Amount', total: totalAmount.toString() }];

    return (
        <Page title={`Business Plan Facility`}>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading={`Business Plan`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.financial_management.root },
              { name: `Business Plan`, href: PATH_DASHBOARD.financial_management.business_plan },
              { name: "List" },
            ]}
          />
          <Typography variant="h6" component="div">
            
          </Typography>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                <TableComponent columns={columns} data={newData} />
                </Grid>
            </Grid>
        </Container>
      </Page>
    )
}

export default FacilityPlan