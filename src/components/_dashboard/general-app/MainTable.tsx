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
import { useAuthUserContext } from "../../../context/authUser.context";
import { levels } from "../../../constants";
import { getLgaData } from "../../../utility";


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
const TableTabs:React.FC<{indicators:any,lgaindicators:any,meIndicators:any,convertIndicators:any,selectedState:IselectedState}> = ({lgaindicators,meIndicators,convertIndicators,selectedState}) => {
  const [value, setValue] = React.useState(0);
  const [midIndicator, setMidIndicator] = React.useState(null);
  const [chewIndicator, setChewIndicator] = React.useState(null);
  const [financialData, setFinancialData] = React.useState(null);
  const [qualityData, setQualityData] = React.useState(null);
  const [essentialData, setEssentialData] = React.useState(null);
  const [essentialDataSecond, setEssentialDataSecond] = React.useState(null);
  const [governanceData, setGovernanceData] = React.useState(null);
  const [healthData, setHealthData] = React.useState(null);
  const [commLinkeageData, setCommLinkeageData] = React.useState(null);
  const [commLinkeageDataSecond, setCommLinkeageDataSecond] = React.useState(null);
  const {
    userState: { userProfile },
  } = useAuthUserContext();

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  React.useEffect(()=>{
    if(userProfile?.level === levels.national){
      if(selectedState.national && !selectedState.state){
        setMidIndicator(meIndicators?.State?.indicator20State)
        setChewIndicator(meIndicators?.State?.indicator21State)
        setFinancialData(meIndicators?.State?.indicator7State)
        setQualityData(meIndicators?.State?.indicator39State)
        setEssentialData(meIndicators?.State?.indicator17State)
        setEssentialDataSecond(meIndicators?.State?.indicator28State)
        setGovernanceData(lgaindicators?.State?.indicator3State)
        setHealthData(meIndicators?.State?.indicator25State)
        setCommLinkeageData(meIndicators?.State?.indicator35State)
        setCommLinkeageDataSecond(meIndicators?.State?.indicator36State)
      }
      else if(selectedState.state){
        const {state} = selectedState
        setMidIndicator(getLgaData(meIndicators?.Lga?.indicator20Lga, state))
        setChewIndicator(getLgaData(meIndicators?.Lga?.indicator21Lga, state))
        setFinancialData(getLgaData(meIndicators?.Lga?.indicator7Lga, state))
        setQualityData(getLgaData(meIndicators?.Lga?.indicator39Lga, state))
        setEssentialData(getLgaData(meIndicators?.Lga?.indicator17Lga, state))
        setEssentialDataSecond(getLgaData(meIndicators?.Lga?.indicator28Lga, state))
        setGovernanceData(getLgaData(lgaindicators?.Lga?.indicator3Lga, state))
        setHealthData(getLgaData(meIndicators?.Lga?.indicator25Lga, state))
        setCommLinkeageData(getLgaData(meIndicators?.Lga?.indicator35Lga, state))
        console.log(meIndicators?.Lga);
        setCommLinkeageDataSecond(getLgaData(meIndicators?.Lga?.indicators36Lga, state))
      }
    }else{
      let userState = userProfile?.name?.split(" ")[0]
      let midIndi =  meIndicators?.Lga?.indicator20Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setMidIndicator(midIndi)
      let chewIndi = meIndicators?.Lga?.indicator21Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setChewIndicator(chewIndi)
      let financialIndi = meIndicators?.Lga?.indicator7Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setFinancialData(financialIndi)
      let qualityIndi = meIndicators?.Lga?.indicator39Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setQualityData(qualityIndi)
      let essentialIndi = meIndicators?.Lga?.indicator17Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setEssentialData(essentialIndi)
      let essentialSecIndi = meIndicators?.Lga?.indicator28Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setEssentialDataSecond(essentialSecIndi)
      let goverIndi = meIndicators?.Lga?.indicator3Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setGovernanceData(goverIndi)
      let healthIndi = meIndicators?.Lga?.indicator25Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setHealthData(healthIndi)
      let commIndi = meIndicators?.Lga?.indicator35Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setCommLinkeageData(commIndi)
      let commIndiSecond = meIndicators?.Lga?.indicator36Lga?.filter((dt: { state: any; }) => dt?.state === userState)
      setCommLinkeageDataSecond(commIndiSecond)
    }
      
  },[selectedState,meIndicators,lgaindicators])

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
          {/* <Tab label="Supervisory" {...a11yProps(5)} /> */}
          <Tab label="Health Information Systems" {...a11yProps(5)} />
          <Tab label="Community Linkeage" {...a11yProps(6)} />
        </Tabs>
       
      </Box>
      <CustomTabPanel value={value} index={0}>
          <HumanResourcesTable midIndicator={convertIndicators(midIndicator)} chewIndicator={convertIndicators(chewIndicator)} selectedState={selectedState} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <FinanceManagementTable proportionSPHCB={convertIndicators(financialData)} selectedState={selectedState} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
          <QualityAssessmentTable indicator={convertIndicators(qualityData)} selectedState={selectedState} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <EssentialMedicineTable indicator={convertIndicators(essentialData)} secondIndicator={convertIndicators(essentialDataSecond)} selectedState={selectedState} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GovernanceTable lgasFunctionalCoordination={convertIndicators(governanceData)} selectedState={selectedState} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={5}>
        <SupervisoryTable supportiveSupervision={convertIndicators(indicators?.indicator32)} />
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={5}>
          <HealthInformationTable indicator={convertIndicators(healthData)} selectedState={selectedState}  />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <CommunityLinkeageTable indicator={convertIndicators(commLinkeageData)} secondIndicator={convertIndicators(commLinkeageDataSecond)} selectedState={selectedState} />
      </CustomTabPanel>
    </Box>
    </Card>
  );
}


export default TableTabs
