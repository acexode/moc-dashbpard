import { FC, useEffect, useState } from "react";
import {  Container, Grid } from "@mui/material";

import { useAuthUserContext } from "../../context/authUser.context";
import { IServiceCard } from "../../db/types";
import { levels } from "../../constants";
import { AllStates } from "../../db/states";
import { fetchLGAFacilityWard } from "../../utility/dashboard-fetch";
import { categorizeIndicators } from "../../utility/processIndicator";
import { getUrls, getYearAndQuarter } from "../../utility";
import {
  createAssessmentData,
  createNPHCDAAssessmentData,
  fetchAllDasboardIndicators,
  fetchAssessmentData,
  handleAssessedDataUpdate,
  handleAssessmentDataFetch,
  updateAssessmentCounts,
} from "../../utility/setStateFunc";
import {
  ServicesCard,
  HumanResourcesCard,
  FinancialCard,
} from "../../components/_dashboard/general-app";

import Page from "../../components/Page";
import MedicineCard from "../../components/_dashboard/general-app/medinceCard";
import SelectDropDownCard from "../../components/_dashboard/general-app/selectdropdown";
import CommunityLinkeage from "../../components/_dashboard/general-app/Community";
import HealthInfo from "../../components/_dashboard/general-app/HealthInfo";
import TableTabs from "../../components/_dashboard/general-app/MainTable";
import QualityAssessment from "../../components/_dashboard/general-app/QualityAssessment";
import GovernmentStructure from "../../components/_dashboard/general-app/SettlementReportTable";
import Supervisory from "../../components/_dashboard/general-app/Supervisory";
import TrendsModal from "../../components/_dashboard/general-app/TrendsModal";
import useSettings from "../../hooks/useSettings";
import ServiceCardNPHCDA from "../../components/_dashboard/general-app/ServiceCard-NPHCDA";
import Settings from "../../layouts/dashboard/settings";
import Logo from "../../components/Logo";
import NoticeBackdrop from "../../components/_dashboard/general-app/NoticeBackdrop";

const NPHCDADashboard: FC = () => {
  const { themeStretch, setfetchedIndicators, setAllTierIndicators } =
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
        setfetchedIndicators({
          ...meIndicators.National,
          ...lgaindicators.National,
          ...indicators.National,
        });
        settier("National");
      }
    }
  }, [meIndicators, selectedState]);

  const assessmentData: IServiceCard[] = createNPHCDAAssessmentData(
    totalStateAssessedCount,
    stateNumber,
    totalLgaAssessedCount,
    totalLgas,
    totalHfAssessedCount,
    totalFacilities
  );

  return (
    <Page title="General: App | BHCPF">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <NoticeBackdrop text="Data is currently being verified" />
        <Grid container spacing={2}>
          {assessmentData?.map((dt, index) => (
            <Grid item xs={12} md={3} key={index}>
              <ServiceCardNPHCDA
                color={dt?.color}
                title={dt?.title}
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

          <Grid item xs={12} md={3}>
            <SelectDropDownCard
              selectedState={selectedState}
              setSelectedState={setSelectedState}
            />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <MedicineCard tier={tier} defualtState={selectedState} />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <GovernmentStructure tier={tier} defualtState={selectedState} />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <HumanResourcesCard defualtState={selectedState} tier={tier} />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={3}>
            <CommunityLinkeage tier={tier} defualtState={selectedState} />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={3}>
            <HealthInfo tier={tier} defualtState={selectedState} />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <FinancialCard tier={tier} defualtState={selectedState} />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <QualityAssessment tier={tier} defualtState={selectedState} />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <Supervisory tier={tier} defualtState={selectedState} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TableTabs
              selectedState={selectedState}
              tier={tier}
              indicators={indicators}
              lgaindicators={lgaindicators}
              meIndicators={meIndicators}
            />
          </Grid>
          <TrendsModal selectedState={selectedState} />
        </Grid>
      </Container>
      <Settings />
    </Page>
  );
};

export default NPHCDADashboard;
