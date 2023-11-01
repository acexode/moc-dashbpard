import { FC, useEffect, useState } from "react";
import useSettings from "../../hooks/useSettings";
import { Box, Container, Grid, Typography } from "@mui/material";
import Page from "../../components/Page";

import {
  ServicesCard,
  HumanResourcesCard,
  UserWelcome,
  FinancialCard,
  BHCPFTable,
  DeliveryCard,
} from "../../components/_dashboard/general-app";

// import GovernmentStructure from "../../components/_dashboard/general-app/SettlementReportTable";
import MedicineCard from "../../components/_dashboard/general-app/medinceCard";
import SelectDropDownCard from "../../components/_dashboard/general-app/selectdropdown";
import { useAuthUserContext } from "../../context/authUser.context";
// import SwiperCard from "../../components/_dashboard/general-app/swiperCard";
import { IServiceCard } from "../../db/types";
import axiosInstance from "../../services/api_service";
// import { removeDuplicatesByFacility, removeDuplicatesByLocation, returnPercentage } from "../../utility/dataFormatter";
import { PATH_DASHBOARD } from "../../routes/paths";
import { levels } from "../../constants";
// import PerformanceIndicators from "../../components/_dashboard/general-app/indicators";
// import QualityAssessment from "../../components/_dashboard/general-app/QualityAssessment";
// import Supervisory from "../../components/_dashboard/general-app/Supervisory";
import CommunityLinkeage from "../../components/_dashboard/general-app/Community";
import HealthInfo from "../../components/_dashboard/general-app/HealthInfo";
// import Trend from "../../components/_dashboard/general-app/Trend";
import TableTabs from "../../components/_dashboard/general-app/MainTable";
import Trend from "../../components/_dashboard/general-app/Trend";
import QualityAssessment from "../../components/_dashboard/general-app/QualityAssessment";
import GovernmentStructure from "../../components/_dashboard/general-app/SettlementReportTable";
import Supervisory from "../../components/_dashboard/general-app/Supervisory";
import { AllStates } from "../../db/states";
const today = new Date();
const quarter = Math.floor((today.getMonth() + 3) / 3) - 1
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
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
const GeneralApp: FC = () => {
  const { themeStretch } = useSettings();
  const [totalLgas, setTotalLgas] = useState(0);
  const [tab, setTab] = useState(0);
  const [totalFacilities, setFacilities] = useState(0);
  const [totalWards, setWards] = useState(0);
  const [totalStateAssessed, setTotalStateAssessed] = useState<any>(null);
  const [totalLgaAssessed, setTotalLgaAssessed] = useState<any>(null);
  const [totalHfAssessed, setTotalHfAssessed] = useState<any>(null);
  const [totalStateAssessedCount, setTotalStateAssessedCount] = useState("");
  const [totalLgaAssessedCount, setTotalLgaAssessedCount] = useState("");
  const [totalHfAssessedCount, setTotalHfAssessedCount] = useState("");
  const [loading, setLoading] = useState(true);
  const [assessloading, setAssessLoading] = useState(true);
  const [facilitiesFetched, setFacilitiesFetched] = useState(false);
  const [indicators, setIndicators] = useState<any>(null);
  const [lgaindicators, setLgaIndicators] = useState<any>(null);
  const [meIndicators, setMeIndicators] = useState<any>(null);
  const [healthInfoData, setHealthInfoData] = useState<any>(null);
  const [esentialMed, setEsentialMed] = useState<any>(null);
  const [esentialMedSecond, setEsentialMedSecond] = useState<any>(null);
  const [communityLinkeageData, setCommunityLinkeageData] = useState<any>(null);
  const [stateNumber, setstateNumber] = useState(0)
  const [userData, setuserData] = useState<any>(null);
  const [tier, settier] = useState('National')
  const [communityLinkeageDataSecond, setCommunityLinkeageDataSecond] =
    useState<any>(null);

  const [selectedState, setSelectedState] = useState({
    national: "National",
    state: "",
    lga: "",
    year: 2023,
    quarter: quarter === 0 ? 1 : quarter,
  });

  const {
    userState: { userProfile },
  } = useAuthUserContext();

  const [lgalocationUrl, setlgalocationUrl] = useState<any>();
  const [hflocationUrl, sethflocationUrl] = useState<any>();
  const [facilityUrl, setfacilityUrl] = useState<any>();
  useEffect(() => {
    setuserData(userProfile);
    // console.log(selectedState);
    let level = userProfile?.level;
    let locationId = userProfile?.locationId;
    if (level === "National" && selectedState.state) {
      level = "State";
      locationId = AllStates.filter(e => e.label === selectedState.state)[0].id;
      setuserData({...userProfile, level, locationId})
    } else {
      level = userProfile?.level;
      locationId = userProfile?.locationId;
      setuserData(userProfile)
    }
    // console.log(level);
    let lgaUrl =
      level === levels.national
        ? "locations/lgas"
        : level === levels.state && `locations/states/${locationId}`;
    let hfUrl =
      level === levels.national
        ? "locations/wards"
        : level === levels.state
        ? `locations/wards/state/${locationId}`
        : `locations/lgas/${userData?.id}`;
    let fUrl =
      level === levels.national
        ? "facilities"
        : level === levels.state
        ? `locations/facilities/state/${locationId}`
        : `locations/Lga/${locationId}/facilities`;
    setfacilityUrl(fUrl);
    setlgalocationUrl(lgaUrl);
    sethflocationUrl(hfUrl);
  }, [userProfile, selectedState]);



  useEffect(() => {
    setstateNumber(userData?.level === levels.national ? 37 : 1)
    if (lgalocationUrl) {
      const fetchData = async () => {
        try {
          const [lgasRes, wardsRes, facilitiesRes] = await Promise.all([
            axiosInstance.get(`${lgalocationUrl}`),
            axiosInstance.get(`${hflocationUrl}`),
            axiosInstance.get(`${facilityUrl}`),
          ]);
          // console.log(lgalocationUrl, lgasRes.data);
          if (userData?.level === levels.lga) {
            setTotalLgas(1);
          } else {
            setTotalLgas(lgasRes?.data?.length);
          }
          setWards(wardsRes?.data?.length);
          setFacilities(facilitiesRes?.data?.length);
          setFacilitiesFetched(true);
        } catch (error) {
          setFacilities(0);
          console.log(error);
          setFacilitiesFetched(false);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [lgalocationUrl, userData]);

  let assessUrl = "assessments/m-and-e/count/all";
  useEffect(() => {
    if (userData) {
      axiosInstance
        .get(assessUrl)
        .then((res) => {
          if (userData?.level === levels.national) {
            setTotalStateAssessed(res.data?.stateAssessmentCounts);
            setTotalLgaAssessed(res.data?.lgaAssessmentCounts);
            setTotalHfAssessed(res?.data?.hfAssessmentCounts);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setAssessLoading(false);
        });
    }
  }, [userData]);

  useEffect(() => {
    if(userData){
      let statesAssessUrl = `state-assessments/count/state/${userData?.locationId}`;
      let lgAssessUrl = `lga-assessments/count/lga/${userData?.locationId}`;
      let meAssessUrl = `assessments/m-and-e/count/hf/${userData?.locationId}`;
      const fetchData = async () => {
        try {
          const [resStateAssess, resLgaAssess, resMeAssess] = await Promise.all([
            axiosInstance.get(`${statesAssessUrl}`),
            axiosInstance.get(`${lgAssessUrl}`),
            axiosInstance.get(`${meAssessUrl}`),
          ]);
          if (userData?.level === levels.state) {
            setTotalStateAssessed(
              resStateAssess.data?.stateAssessmentCounts ?? []
            );
            setTotalLgaAssessed(resLgaAssess.data?.lgaAssessmentCounts ?? []);
            setTotalHfAssessed(resMeAssess?.data?.lgaCounts ?? []);
          } else {
            setTotalStateAssessed(resStateAssess.data?.stateAssessmentCounts);
            setTotalLgaAssessed(resLgaAssess.data?.lgaAssessmentCounts);
            setTotalHfAssessed(resMeAssess?.data?.hfAssessmentCounts);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setAssessLoading(false);
        }
      };
      if (userData?.level !== levels.national) {
        fetchData();
      }

    }
  }, [userData]);

  useEffect(() => {
    if (totalLgaAssessed || totalStateAssessed || totalHfAssessed) {
      let currentState = totalStateAssessed?.filter(
        (state: { year: number; quarter: number }) =>
          state?.year === selectedState.year &&
          state?.quarter === selectedState.quarter
      );
      setTotalStateAssessedCount(currentState[0]?.count ?? 0);
      let currentLga = totalLgaAssessed?.filter(
        (state: { year: number; quarter: number }) =>
          state?.year === selectedState.year &&
          state?.quarter === selectedState.quarter
      );
      setTotalLgaAssessedCount(currentLga[0]?.count ?? 0);
      let currentHF = totalHfAssessed?.filter(
        (state: { year: number; quarter: number }) =>
          state?.year === selectedState.year &&
          state?.quarter === selectedState.quarter
      );
      setTotalHfAssessedCount(currentHF[0]?.count ?? 0);
    }
  }, [totalLgaAssessed, totalStateAssessed, totalHfAssessed, selectedState]);
  console.log(indicators);
  useEffect(() => {
    const fetchStateIndicator = async () => {
      try {
        const result = await axiosInstance.get(
          "state-assessment-indicators/proportion"
        );
        setIndicators(result?.data);
        // console.log("state",result?.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchStateIndicator();
    const fetchLgaIndicator = async () => {
      try {
        const result = await axiosInstance.get(
          "lga-assessment-indicators/proportion"
        );
        setLgaIndicators(result?.data);
        // console.log("lga",result?.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchLgaIndicator();
    const fetchMeIndicator = async () => {
      try {
        const result = await axiosInstance.get(
          "me-assessment-indicators/proportion"
        );

        setMeIndicators(result?.data);
        // console.log("me data",result?.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeIndicator();
  }, []);

  useEffect(() => {

    if (meIndicators) {
      if (selectedState.lga) {
        settier('Lga');
        let val = meIndicators?.Lga?.indicator25Lga?.filter(
          (dt: { lga: string; year: number; quarter: number }) =>
            dt?.lga === selectedState?.lga &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newVal = {
          ...val[0],
          indicator25:
            val?.length > 0 ? Math.round(val[0]?.indicator25Lga * 100) : 0,
        };
        setHealthInfoData(newVal);
        let stockVal = meIndicators?.Lga?.indicator17Lga?.filter(
          (dt: { lga: string; year: number; quarter: number }) =>
            dt?.lga === selectedState?.lga &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newStockVal = {
          ...stockVal[0],
          indicator17:
            stockVal?.length > 0
              ? Math.round(stockVal[0]?.indicator17Lga * 100)
              : 0,
        };
        setEsentialMed(newStockVal);
        let provVal = meIndicators?.Lga?.indicator28Lga?.filter(
          (dt: { lga: string; year: number; quarter: number }) =>
            dt?.lga === selectedState?.lga &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newProvVal = {
          ...provVal[0],
          indicator28:
            provVal?.length > 0
              ? Math.round(provVal[0]?.indicator28Lga * 100)
              : 0,
        };
        setEsentialMedSecond(newProvVal);
        let commVal = meIndicators?.Lga?.indicator35Lga?.filter(
          (dt: { lga: string; year: number; quarter: number }) =>
            dt?.lga === selectedState?.lga &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newcommVal = {
          ...commVal[0],
          indicator35:
            commVal?.length > 0
              ? Math.round(commVal[0]?.Indicator35Lga * 100)
              : 0,
        };
        setCommunityLinkeageData(newcommVal);
        let commValSecond = meIndicators?.Lga?.indicator36Lga?.filter(
          (dt: { lga: string; year: number; quarter: number }) =>
            dt?.lga === selectedState?.lga &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        if (commValSecond !== undefined) {
          let newcommValSecond = {
            ...commValSecond[0],
            indicator36:
              commValSecond?.length > 0
                ? Math.round(commValSecond[0]?.indicator36Lga * 100)
                : 0,
          };
          setCommunityLinkeageDataSecond(newcommValSecond);
        }
      } else if (selectedState.state && !selectedState.lga) {
        settier('State')
        console.log(selectedState.state,'state');
        console.log(meIndicators);
        let stateVal = meIndicators?.State?.indicator25State?.filter(
          (dt: { state: string; year: number; quarter: number }) =>
            dt?.state === selectedState.state &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newVal = {
          ...stateVal[0],
          indicator25:
            stateVal?.length > 0
              ? Math.round(stateVal[0]?.indicator25State * 100)
              : 0,
        };
        setHealthInfoData(newVal);
        let stateStockVal = meIndicators?.State?.indicator17State?.filter(
          (dt: { state: string; year: number; quarter: number }) =>
            dt?.state === selectedState.state &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newStockVal = {
          ...stateStockVal[0],
          indicator17:
            stateStockVal?.length > 0
              ? Math.round(stateStockVal[0]?.indicator17State * 100)
              : 0,
        };
        setEsentialMed(newStockVal);
        let stateProvVal = meIndicators?.State?.indicator28State?.filter(
          (dt: { state: string; year: number; quarter: number }) =>
            dt?.state === selectedState.state &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newProvVal = {
          ...stateProvVal[0],
          indicator28:
            stateProvVal?.length > 0
              ? Math.round(stateProvVal[0]?.indicator28State * 100)
              : 0,
        };
        setEsentialMedSecond(newProvVal);
        let stateCommVal = meIndicators?.State?.indicator35State?.filter(
          (dt: { state: string; year: number; quarter: number }) =>
            dt?.state === selectedState.state &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newCommVal = {
          ...stateCommVal[0],
          indicator35:
            stateCommVal?.length > 0
              ? Math.round(stateCommVal[0]?.Indicator35State * 100)
              : 0,
        };
        setCommunityLinkeageData(newCommVal);
        let stateCommValSecond = meIndicators?.State?.indicator36State?.filter(
          (dt: { state: string; year: number; quarter: number }) =>
            dt?.state === selectedState.state &&
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newCommValSecond = {
          ...stateCommValSecond[0],
          indicator36:
            stateCommValSecond?.length > 0
              ? Math.round(stateCommValSecond[0]?.indicator36State * 100)
              : 0,
        };
        setCommunityLinkeageDataSecond(newCommValSecond);
      } else {
        console.log('National');
        settier('National');
        let natVal = meIndicators?.National?.indicator25National?.filter(
          (dt: { year: number; quarter: number }) =>
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newVal = {
          ...natVal[0],
          indicator25:
            natVal?.length > 0
              ? Math.round(natVal[0]?.indicator25National * 100)
              : 0,
        };
        setHealthInfoData(newVal);
        let natStockVal = meIndicators?.National?.indicator17National?.filter(
          (dt: { year: number; quarter: number }) =>
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newStockVal = {
          ...natStockVal[0],
          indicator17:
            natStockVal?.length > 0
              ? Math.round(natStockVal[0]?.indicator17National * 100)
              : 0,
        };
        setEsentialMed(newStockVal);
        let natprovVal = meIndicators?.National?.indicator28National?.filter(
          (dt: { year: number; quarter: number }) =>
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newprovVal = {
          ...natprovVal[0],
          indicator28:
            natprovVal?.length > 0
              ? Math.round(natprovVal[0]?.indicator28National * 100)
              : 0,
        };
        setEsentialMedSecond(newprovVal);
        let natCommVal = meIndicators?.National?.indicator35National?.filter(
          (dt: { year: number; quarter: number }) =>
            dt?.year === selectedState.year &&
            dt?.quarter === selectedState.quarter
        );
        let newCommVal = {
          ...natCommVal[0],
          indicator35:
            natCommVal?.length > 0
              ? Math.round(natCommVal[0]?.Indicator35National * 100)
              : 0,
        };
        setCommunityLinkeageData(newCommVal);
        let natCommValSecond =
          meIndicators?.National?.indicator36National?.filter(
            (dt: { year: number; quarter: number }) =>
              dt?.year === selectedState.year &&
              dt?.quarter === selectedState.quarter
          );
        let newCommValSecond = {
          ...natCommValSecond[0],
          indicator36:
            natCommValSecond?.length > 0
              ? Math.round(natCommValSecond[0]?.indicator36National * 100)
              : 0,
        };
        setCommunityLinkeageDataSecond(newCommValSecond);
      }
    }
  }, [meIndicators, selectedState]);

  const cardData: IServiceCard[] = [
    // {
    //   color: "#26b76e",
    //   title:"Feedback Date",
    //   value:`Q${selectedState.quarter}, ${selectedState.year}`,
    //   show:false,
    //   isString:true

    // },
    {
      color: "#536cbe",
      classname: "card-greenish",
      title: "No Of States",
      value: stateNumber,
      show: false,
    },
    {
      color: "#4ca8ff",
      classname: "card-goldish",
      title: "Total No Of LGAs",
      value: totalLgas,
      show: false,
    },
    // {
    //   color: "#4ca8ff",
    //   title:"No Of Wards",
    //   value:totalWards,
    // show:false

    // },
    {
      color: "#ff825c",
      classname: "card-bluish",
      title: "No. of Facilities",
      value: totalFacilities,
      show: false,
    },
  ];

  const assessmentData: IServiceCard[] = [
    {
      color: "#004b50",
      title: "States Assessed",
      value: totalStateAssessedCount,
      sub: stateNumber,
      classname: "card-greenish",
      subTitle: "Total No. Of States",
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.state,
    },
    {
      color: "#7a4100",
      title: "LGAs Assessed",
      value: totalLgaAssessedCount,
      classname: "card-goldish",
      subTitle: "Total No. Of LGAs",
      sub: totalLgas,
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.lga,
    },
    {
      color: "#003768",
      title: "HFs Assessed",
      value: totalHfAssessedCount,
      classname: "card-blueish",
      sub: totalFacilities,
      subTitle: "Total No. of Facilities",
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.hf,
    },
  ];

  function convertIndicators(indicator: any, field='') {
    const level = tier === 'National' ? indicator?.National : tier === 'State' ? indicator?.State : indicator?.Lga
    if(field !== '' && level){
      const i = level[field + tier]
      // console.log(i, field, field + tier);
      return i?.filter(
        (dt: { year: number; quarter: number }) =>
          dt?.year === selectedState.year && dt?.quarter === selectedState.quarter
      );
    }else{
      return indicator?.filter(
        (dt: { year: number; quarter: number }) =>
          dt?.year === selectedState.year && dt?.quarter === selectedState.quarter
      );

    }
  }

  const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
    console.log(newValue);
    setTab(newValue);
  };

  console.log({meIndicators,lgaindicators,indicators})

  return (
    <Page title="General: App | BHCPF">
      <Container maxWidth={themeStretch ? false : "xl"}>
      <Grid item xs={12} md={12}>
            <SelectDropDownCard
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              tab={tab}
              setTab={handleTabChange}
            />
          </Grid>
      <CustomTabPanel  value={tab} index={0}>
          
       
        <Grid container spacing={1}>
          {/* <Grid item xs={12} md={12}>
            <UserWelcome displayName={userData?.name} />
          </Grid> */}
          {/* <Grid item xs={12} md={4}>
            <SwiperCard />
          </Grid> */}



          {assessmentData?.map((dt, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ServicesCard
                color={dt?.color}
                title={dt?.title}
                value={dt?.value}
                classname={dt?.classname}
                sub={dt?.sub}
                subTitle={dt?.subTitle}
                show={dt?.show}
                isString={dt?.isString}
                path={dt?.path}
                loading={assessloading}
              />
            </Grid>
          ))}

          {/* <Grid item xs={12} md={12} lg={6}>
            <Trend />
          </Grid> */}

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <MedicineCard
              esentialMed={esentialMed}
              esentialMedSecond={esentialMedSecond}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={3}>
            <FinancialCard
              proportionSPHCB={convertIndicators(
                meIndicators, 'indicator7'
              )}
              proportionPHC={convertIndicators(
                indicators, 'indicator5'
              )}
              tier={tier}
              state={selectedState.state}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={3}>
            <HumanResourcesCard
              midIndicator={convertIndicators(
                meIndicators, 'indicator20'
              )}
              chewIndicator={convertIndicators(
                meIndicators,'indicator21'
              )}
              tier={tier}
              state={selectedState.state}
            />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <HealthInfo healthInfoData={healthInfoData} />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={3}>
            <GovernmentStructure
              data={convertIndicators(
                lgaindicators, 'indicator3'
              )}
              data2={convertIndicators(
                indicators, 'indicator1'
              )}
              data3={convertIndicators(
                indicators, 'indicators2'
              )}
              tier={tier}
              state={selectedState.state}
            />
          </Grid>

          <Grid item xs={12} md={6} sm={6} lg={3}>
            <QualityAssessment
              indicator={convertIndicators(
                meIndicators, 'indicator39'
              )}
              tier={tier}
              state={selectedState.state}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={3}>
            <CommunityLinkeage
              communityLinkeageData={communityLinkeageData}
              communityLinkeageDataSecond={communityLinkeageDataSecond}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={3}>
            <Supervisory
              supportiveSupervision={convertIndicators(
                indicators, 'indicator32'
              )}
              tier={tier}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TableTabs
              selectedState={selectedState}
              convertIndicators={convertIndicators}
              indicators={indicators}
              lgaindicators={lgaindicators}
              meIndicators={meIndicators}
            />
          </Grid>
          {/* <Grid item xs={12} md={12} lg={12}>
            <Trend />
             <PerformanceIndicators />
          </Grid> */}
        </Grid>
        </CustomTabPanel>
        <CustomTabPanel  value={tab} index={1}>NPHCDA</CustomTabPanel>
        <CustomTabPanel  value={tab} index={2}>NHIA</CustomTabPanel>
        <CustomTabPanel  value={tab} index={3}>EMT</CustomTabPanel>
      
      </Container>

    </Page>
  );
};

export default GeneralApp;
