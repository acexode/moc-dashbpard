import { FC, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";

import { useAuthUserContext } from "../../context/authUser.context";
import { indicatorSettings, levels } from "../../constants";
import { AllStates } from "../../db/states";
import { fetchLGAFacilityWard } from "../../utility/dashboard-fetch";
import { categorizeIndicators } from "../../utility/processIndicator";
import { getUrls, getYearAndQuarter } from "../../utility";

import {
  fetchAllDasboardIndicators,
  fetchAssessmentData,
  handleAssessedDataUpdate,
  handleAssessmentDataFetch,
  serviceCardData,
  updateAssessmentCounts,
} from "../../utility/setStateFunc";
import {
  ServicesCard,
} from "../../components/_dashboard/general-app";

import Page from "../../components/Page";
import TrendsModal from "../../components/_dashboard/general-app/TrendsModal";
import useSettings from "../../hooks/useSettings";
import MocFinance from "../../components/_dashboard/general-app/MocFinance";
import MocNursesMidWife from "../../components/_dashboard/general-app/MocCard";
import MocKPIAnswers from "../../components/_dashboard/general-app/MocKPIAnswers";
import RiskFactors from "../../components/_dashboard/general-app/RiskFactors";
import MOCDateFilter from "../../components/_dashboard/general-app/MOCDateFilter";
import { indicatorBoard } from "../../components/settings/board";
import { MIconButton } from "../../components/@material-extend";
import { Icon } from "@iconify/react";
import exportOutline from '@iconify/icons-eva/upload-outline';
import { handleDownloadPdf } from "../../utility/handleDownloadPDF";

const GeneralApp: FC = () => {

  const { themeStretch, setfetchedIndicators, setAllTierIndicators, handleIndicatorUpdates, printDocRef } =
    useSettings();
  const [totalLgas, setTotalLgas] = useState(0);
  const [totalFacilities, setFacilities] = useState(0);
  const [totalStateAssessed, setTotalStateAssessed] = useState<any>(null);
  const [totalLgaAssessed, setTotalLgaAssessed] = useState<any>(null);
  const [totalHfAssessed, setTotalHfAssessed] = useState<any>(null);
  const [totalStateAssessedCount, setTotalStateAssessedCount] = useState("");
  const [totalLgaAssessedCount, setTotalLgaAssessedCount] = useState("");
  const [totalHfAssessedCount, setTotalHfAssessedCount] = useState("");
  const [assessloading, setAssessLoading] = useState(true);
  const [indicators, setIndicators] = useState<any>(null);
  const [lgaindicators, setLgaIndicators] = useState<any>(null);
  const [meIndicators, setMeIndicators] = useState<any>(null);
  const [stateNumber, setstateNumber] = useState(0);
  const [userData, setuserData] = useState<any>(null);
  const [tier, settier] = useState("National");
  const [lgalocationUrl, setlgalocationUrl] = useState<any>();
  const [hflocationUrl, sethflocationUrl] = useState<any>();
  const [facilityUrl, setfacilityUrl] = useState<any>();
  const { year, quarter } = getYearAndQuarter();
  const [selectedState, setSelectedState] = useState({
    national: "National",
    state: "",
    lga: "",
    year,
    quarter,
  });

  const {
    userState: { userProfile },
  } = useAuthUserContext();

  useEffect(() => {
    setuserData(userProfile);
    let level = userProfile?.level;
    let locationId = userProfile?.locationId;
    if (level === "National" && selectedState.state) {
      level = "State";
      locationId = AllStates.filter((e) => e.label === selectedState.state)[0]
        .id;
      setuserData({ ...userProfile, level, locationId });
    } else {
      level = userProfile?.level;
      locationId = userProfile?.locationId;
      setuserData(userProfile);
    }
    const { lgaUrl, hfUrl, fUrl } = getUrls(
      level,
      locationId,
      userProfile,
      levels
    );
    setfacilityUrl(fUrl);
    setlgalocationUrl(lgaUrl);
    sethflocationUrl(hfUrl);
  }, [userProfile, selectedState]);

  useEffect(() => {
    setstateNumber(userData?.level === levels.national ? 37 : 1);
    if (lgalocationUrl) {
      const handleDataFetch = async () => {
        try {
          const data = await fetchLGAFacilityWard(
            lgalocationUrl,
            hflocationUrl,
            facilityUrl,
            userData,
            levels
          );
          setTotalLgas(data?.totalLgas);
          setFacilities(data?.facilities);
        } catch (error) {
          setFacilities(0);
        }
      };
      handleDataFetch();
    }
  }, [lgalocationUrl, userData]);

  useEffect(() => {
    if (userData) {
      const handleAssessmentDataFetch = async () => {
        try {
          setAssessLoading(true);
          const assessmentData = await fetchAssessmentData();
          updateAssessmentCounts(
            assessmentData,
            setTotalStateAssessed,
            setTotalLgaAssessed,
            userData,
            levels,
            setTotalHfAssessed
          );
        } catch (error) {
          console.log(error);
        } finally {
          setAssessLoading(false);
        }
      };
      handleAssessmentDataFetch();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      if (userData?.level !== levels.national) {
        handleAssessmentDataFetch(
          userData,
          setAssessLoading,
          levels,
          setTotalStateAssessed,
          setTotalLgaAssessed,
          setTotalHfAssessed
        );
      }
    }
  }, [userData]);
  useEffect(() => {
    if (!localStorage.getItem(indicatorSettings)) {
      handleIndicatorUpdates(indicatorBoard);
    }
  }, []);

  useEffect(() => {
    handleAssessedDataUpdate(
      totalLgaAssessed,
      totalStateAssessed,
      totalHfAssessed,
      selectedState,
      setTotalStateAssessedCount,
      setTotalLgaAssessedCount,
      setTotalHfAssessedCount
    );
  }, [totalLgaAssessed, totalStateAssessed, totalHfAssessed, selectedState]);

  useEffect(() => {
    fetchAllDasboardIndicators(
      setIndicators,
      setLgaIndicators,
      setMeIndicators
    );
  }, []);
  useEffect(() => {
    if (meIndicators) {
      const categories = categorizeIndicators(
        meIndicators,
        lgaindicators,
        indicators
      );
      setAllTierIndicators(categories);
      if (selectedState.lga) {
        settier("Lga");
      } else if (selectedState.state && !selectedState.lga) {
        setfetchedIndicators({
          ...meIndicators?.State,
          ...lgaindicators?.State,
          ...indicators?.State,
        });
        settier("State");
      } else {
        console.log({
          ...meIndicators.National,
          ...lgaindicators.National,
          ...indicators.National,
        });
        setfetchedIndicators({
          ...meIndicators.National,
          ...lgaindicators.National,
          ...indicators.National,
        });
        settier("National");
      }
    }
  }, [meIndicators, selectedState]);


  const mocServiceCard = serviceCardData(selectedState.year, selectedState.quarter)

  return (
    <Page title="General: App | BHCPF">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={1} mt={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3">
          MOC BHCPF Dashboard
          </Typography>
          </Grid>
        <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
        
        <MIconButton style={{width: '170px', border: '1px solid #222736', borderRadius: '5px', color: '#222736', }}  onClick={() =>handleDownloadPdf(printDocRef)}>
        Export  <Icon icon={exportOutline} width={30} height={30} style={{marginLeft: '5px'}} />
      </MIconButton>
          </Grid>
        {/* <MOCDateFilter
              selectedState={selectedState}
              setSelectedState={setSelectedState}
            /> */}
          {mocServiceCard?.map((dt, index) => (
            <Grid item xs={12} md={3} key={index}>
              <ServicesCard
                color={dt?.color}
                title={dt?.title}
                icon={dt?.icon}
                value={dt?.value}
                classname={dt?.classname}
                sub={dt?.sub}
                subTitle={dt?.subTitle}
                show={dt?.show}
                showFCT={dt?.showFCT}
                isString={dt?.isString}
                path={dt?.path}
                loading={assessloading}
                user={userData}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={6} sm={6} lg={6}>
            <MocFinance tier={tier} defualtState={selectedState} />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <MocNursesMidWife
              tier={tier}
              defualtState={selectedState}
              color="#e8e0f2"
              icon="nurse-midwife"
              title="Minimum of two (2) midwives deployed by SPHCB/LGA"
            />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <MocNursesMidWife
              tier={tier}
              defualtState={selectedState}
              color="#d6eccf"
              icon="comm"
              title="Minimum of two (2) CHEWs deployed by SPHCB/LGA"
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <MocKPIAnswers tier={tier} defualtState={selectedState} />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <RiskFactors tier={tier} defualtState={selectedState} />
          </Grid>

          <TrendsModal selectedState={selectedState} />
        </Grid>
      </Container>
    </Page>
  );
};

export default GeneralApp;
