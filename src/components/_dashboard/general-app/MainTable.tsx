import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HumanResourcesTable from "../../../shared/tables/humanResources";
import FinanceManagementTable from "../../../shared/tables/financeTable";
import { Card } from "@mui/material";
import QualityAssessmentTable from "../../../shared/tables/QualityAssessment";
import EssentialMedicineTable from "../../../shared/tables/EssentialMed";
import GovernanceTable from "../../../shared/tables/Governance";
import CommunityLinkeageTable from "../../../shared/tables/Community";
import HealthInformationTable from "../../../shared/tables/HealthInfo";
// import { useAuthUserContext } from "../../../context/authUser.context";
import InfraEquimentTable from "../../../shared/tables/InfraEquiment";
import ServiceSelectionTable from "../../../shared/tables/ServiceSelection";
import tokenService from "../../../services/tokenService";


function CustomTabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface IselectedState {
  national: string,
  state: string,
  lga: string,
  year:number,
  quarter:number
}
const TableTabs:React.FC<{indicators:any,lgaindicators:any,meIndicators:any, tier: string,selectedState:IselectedState}> = ({lgaindicators,meIndicators,tier,selectedState}) => {
  const [value, setValue] = React.useState(0);
  // const {
  //   userState: { userProfile },
  // } = useAuthUserContext();
  const userProfile = tokenService.getUser()

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };


  return (
    <Card>
    <Box sx={{ width: "100%",p:2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider",overflowX:"auto" }}>
     
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: 'hsl(150, 100%, 34%)', 
                overflowX:"auto"
            },
          }}
        >
          <Tab label="Human Resources For Health" {...a11yProps(0)} />
          <Tab label="Financial Management" {...a11yProps(1)} />
          <Tab label="Quality Assessment" {...a11yProps(2)} />
          <Tab label="Essential Medicine" {...a11yProps(3)} />
          <Tab label="Governance" {...a11yProps(4)} />
          <Tab label="Health Information Systems" {...a11yProps(5)} />
          <Tab label="Community Linkage" {...a11yProps(6)} />
          <Tab label="Infrastructure & Equipment " {...a11yProps(7)} />
          <Tab label="Service Selection & Design" {...a11yProps(8)} />
        </Tabs>
       
      </Box>
      <CustomTabPanel value={value} index={0}>
          <HumanResourcesTable userProfile={userProfile} selectedState={selectedState} tier={tier}  />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <FinanceManagementTable userProfile={userProfile} selectedState={selectedState} tier={tier} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
          <QualityAssessmentTable userProfile={userProfile} selectedState={selectedState} tier={tier} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <EssentialMedicineTable userProfile={userProfile} selectedState={selectedState} tier={tier} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GovernanceTable  userProfile={userProfile} selectedState={selectedState} tier={tier} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
          <HealthInformationTable userProfile={userProfile} selectedState={selectedState} tier={tier}  />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <CommunityLinkeageTable userProfile={userProfile} selectedState={selectedState} tier={tier}   />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <InfraEquimentTable userProfile={userProfile} selectedState={selectedState} tier={tier} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        <ServiceSelectionTable userProfile={userProfile} selectedState={selectedState} tier={tier} />
      </CustomTabPanel>
    </Box>
    </Card>
  );
}

export default TableTabs
