import { Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import useSettings from "../../../hooks/useSettings";
import { PATH_DASHBOARD } from "../../../routes/paths";
import RetirementData from "./components/retirementData";

const FinanceRetirement:FC = () =>{
    const { themeStretch } = useSettings();
    return (
        <>
            <Page title={`Retirement Sheet`}>
                <Container maxWidth={themeStretch ? false : "xl"}>
                <HeaderBreadcrumbs
                    heading={`Retirement Sheet`}
                    links={[
                    { name: "Dashboard", href: PATH_DASHBOARD.financial_management.dashboard },
                    { name: `Retirement Sheet`, href: PATH_DASHBOARD.financial_management.retirement },
                    { name: "List" },
                    ]}
                />
                <Typography variant="h6" component="div">
                    
                </Typography>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <RetirementData />
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        </>
    )
}

export default FinanceRetirement