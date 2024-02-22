import { FC } from "react";
import Page from "../../../components/Page";
import {
    Container,
    Grid,
    Typography,
  } from "@mui/material";
import {useParams} from "react-router-dom"  
import useSettings from "../../../hooks/useSettings";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import NationalBusinessPlan from "./components/nationalBusinessPlan";
import StateBusinessPlan from "./components/stateBusinessPlan";
import LgaBusinessPlan from "./components/lgaBusinessPlan";

const BusinessPlan:FC = () =>{
    const { themeStretch } = useSettings();
    const {state,lga}  = useParams()
  
    return (
        <Page title={`Business Plan Governance`}>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading={`Business Plan`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.financial_management.dashboard },
              { name: `Business Plan`, href: PATH_DASHBOARD.financial_management.business_plan },
              { name: "List" },
            ]}
          />
          <Typography variant="h6" component="div">
            
          </Typography>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                  { !state ?  <NationalBusinessPlan /> : 
                   state && !lga ? <StateBusinessPlan /> :
                   <LgaBusinessPlan />}
                </Grid>
            </Grid>
        </Container>
      </Page>
    )
}

export default BusinessPlan