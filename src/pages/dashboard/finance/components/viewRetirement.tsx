// @ts-nocheck

import { Box, Card, CardHeader, Container, Typography } from "@mui/material";
import { FC } from "react";
import { Grid } from "@mui/material";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import useSettings from "../../../../hooks/useSettings";
import TableComponent from "./tableComponent";
import { formatter } from "../../../../utility";

const ViewRetirement:FC = () =>{
    const { themeStretch } = useSettings();
    const columns =[
        {
          accessorKey: "source",
          header: "Source",
          size: 150,
        },
        {
          accessorKey: "amount",
          header: "Amount",
          size: 150,
          Cell: ({ renderedCellValue, row }:any) => (
            <Box
            >
              <span>{formatter.format(renderedCellValue)}</span>
            </Box>
          ),
        },
        {
          accessorKey: "description",
          header: "Description",
          size: 150,
        },
       
        {
          accessorKey: "date",
          header: "Date",
          size: 150,
        },
      ]

      const data =[
        {
            source:"BHCPF",
            amount:"1000000",
            description:"na",
            date:"2021-03-01",
        },
      ]
    const breakDownColumns =[
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
            accessorKey: "amount",
            header: "Amount",
            size: 150,
            Cell: ({ renderedCellValue, row }:any) => (
              <Box
              >
                <span>{formatter.format(renderedCellValue)}</span>
              </Box>
            ),
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
       
        {
          accessorKey: "date",
          header: "Date",
          size: 150,
        },
      ]

      const breakDownData =[
        {
            item:"Drugs and Medical Commodities",
            description:"cap Amoxicillin",
            quantity:"10",
            amount:"1000",
            total:"10000",
            date:"2021-03-01",
        },
        {
            item:"Transportation",
            description:"out reach	",
            quantity:"2",
            amount:"5000",
            total:"10000",
            date:"2021-03-01",
        },
      ]
    const overviewColumns =[
        {
          accessorKey: "item",
          header: "Item",
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
        }
      ]

      const overviewData =[
        {
            item:"Drugs and Medical Commodities",
            total:"10000",
        },
        {
            item:"Transportation",
            total:"10000",
        },
        {
            item:"Utility and Maintenance",
            total:"10000",
        },
        {
            item:"Fuelling",
            total:"10000",
        },
        {
            item:"Waste Management",
            total:"10000",
        },
        {
            item:"Meeting Support",
            total:"10000",
        },
      ]

    return (
        <Page title={`Retirement Sheet`}>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading={`Retirement Sheet`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.financial_management.root },
              { name: `Retirement Sheet`, href: PATH_DASHBOARD.financial_management.retirement },
              { name: "List" },
            ]}
          />
          <Typography variant="h6" component="div">
            
          </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Card sx={{p:2}} >
                        <CardHeader
                            
                            title={
                            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                                <Typography
                                style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
                                >
                                Revenue Report
                                </Typography>
                            </div>
                            }
                        />
                        <TableComponent columns={columns} data={data} />
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Card sx={{p:2}} >
                        <CardHeader
                            
                            title={
                            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                                <Typography
                                style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
                                >
                                Expense BreakDown Report
                                </Typography>
                            </div>
                            }
                        />
                        <TableComponent columns={breakDownColumns} data={breakDownData} />
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Card sx={{p:2}} >
                        <CardHeader
                            
                            title={
                            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                                <Typography
                                style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
                                >
                                Expense OverView Report
                                </Typography>
                            </div>
                            }
                        />
                        <TableComponent columns={overviewColumns} data={overviewData} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
      </Page>
    )
}

export default ViewRetirement