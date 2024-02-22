// @ts-nocheck

import { AllIndicators } from "../components/settings/allIndicators";
import { assessUrl } from "../constants";
import useSettings from "../hooks/useSettings";
import { PATH_DASHBOARD } from "../routes/paths";
import axiosInstance from "../services/api_service";
import { staticCardData } from "./serviceCard";

export const fetchAssessmentData = async () => {
  try {
    const res = await axiosInstance.get(assessUrl);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAssessmentCounts = (
  data: any,
  setTotalStateAssessed: any,
  setTotalLgaAssessed: any,
  userData: any,
  levels: any,
  setTotalHfAssessed: any
) => {
  if (userData?.level === levels.national) {
    setTotalStateAssessed(data?.stateAssessmentCounts);
    setTotalLgaAssessed(data?.lgaAssessmentCounts);
    setTotalHfAssessed(data?.hfAssessmentCounts);
  }
};

// FETCH AND SET ASSESMENT

const fetchAssessmentCounts = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleAssessmentDataFetch = async (
  userData: any,
  setAssessLoading: any,
  levels: any,
  setTotalStateAssessed: any,
  setTotalLgaAssessed: any,
  setTotalHfAssessed: any
) => {
  try {
    setAssessLoading(true);

    const statesAssessUrl = `state-assessments/count/state/${userData?.locationId}`;
    const lgAssessUrl = `lga-assessments/count/lga/${userData?.locationId}`;
    const meAssessUrl = `assessments/m-and-e/count/hf/${userData?.locationId}`;

    const [resStateAssess, resLgaAssess, resMeAssess] = await Promise.all([
      fetchAssessmentCounts(statesAssessUrl),
      fetchAssessmentCounts(lgAssessUrl),
      fetchAssessmentCounts(meAssessUrl),
    ]);

    if (userData?.level === levels.state) {
      setTotalStateAssessed(resStateAssess?.stateAssessmentCounts ?? []);
      setTotalLgaAssessed(resLgaAssess?.lgaAssessmentCounts ?? []);
      setTotalHfAssessed(resMeAssess?.lgaCounts ?? []);
    } else {
      setTotalStateAssessed(resStateAssess?.stateAssessmentCounts);
      setTotalLgaAssessed(resLgaAssess?.lgaAssessmentCounts);
      setTotalHfAssessed(resMeAssess?.hfAssessmentCounts);
    }
  } catch (error) {
    // Handle error as needed
  } finally {
    setAssessLoading(false);
  }
};

// handle assessed Data

const filterAssessedData = (data: any, selectedState: any) => {
  return data?.filter(
    (state: any) =>
      state?.year === selectedState.year &&
      state?.quarter === selectedState.quarter
  );
};

const setAssessedCount = (filteredData: any, setCount: any) => {
  setCount(filteredData[0]?.count ?? 0);
};

export const handleAssessedDataUpdate = (
  totalLgaAssessed: any,
  totalStateAssessed: any,
  totalHfAssessed: any,
  selectedState: any,
  setTotalStateAssessedCount: any,
  setTotalLgaAssessedCount: any,
  setTotalHfAssessedCount: any
) => {
  if (totalLgaAssessed || totalStateAssessed || totalHfAssessed) {
    const currentState = filterAssessedData(totalStateAssessed, selectedState);
    setAssessedCount(currentState, setTotalStateAssessedCount);

    const currentLga = filterAssessedData(totalLgaAssessed, selectedState);
    setAssessedCount(currentLga, setTotalLgaAssessedCount);

    const currentHF = filterAssessedData(totalHfAssessed, selectedState);
    setAssessedCount(currentHF, setTotalHfAssessedCount);
  }
};

// fetch and set assesment indicator

const fetchAssessmentIndicators = async (
  endpoint: string,
  setIndicators: any
) => {
  try {
    const result = await axiosInstance.get(endpoint);
    setIndicators(result?.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllDasboardIndicators = async (
  setIndicators: any,
  setLgaIndicators: any,
  setMeIndicators: any
) => {
  await Promise.all([
    fetchAssessmentIndicators(
      "state-assessment-indicators/proportion",
      setIndicators
    ),
    fetchAssessmentIndicators(
      "lga-assessment-indicators/proportion",
      setLgaIndicators
    ),
    fetchAssessmentIndicators(
      "me-assessment-indicators/proportion",
      setMeIndicators
    ),
  ]);
};

// set state for indicators

const filterDataByState = (
  indicatorData: { [x: string]: { [x: string]: any[] } },
  selectedState: {
    tier: string | number;
    lga: any;
    state: any;
    year: any;
    quarter: any;
  },
  indicatorKey: string
) => {
  return indicatorData[selectedState.tier]?.[indicatorKey]?.filter(
    (dt: { lga: any; state: any; year: any; quarter: any }) =>
      dt?.lga === selectedState.lga &&
      dt?.state === selectedState.state &&
      dt?.year === selectedState.year &&
      dt?.quarter === selectedState.quarter
  );
};

const setIndicatorValues = (
  filteredData: string | any[],
  setFunction: (arg0: any) => void,
  indicatorKey: string
) => {
  if (filteredData) {
    const newValue = {
      ...filteredData[0],
      [indicatorKey]:
        filteredData.length > 0
          ? Math.round(filteredData[0]?.[indicatorKey] * 100)
          : 0,
    };
    setFunction(newValue);
  }
};

export const handleIndicatorUpdate = (
  meIndicators: any,
  selectedState: any,
  settier: any,
  setHealthInfoData: any,
  setEsentialMed: any,
  setEsentialMedSecond: any,
  setCommunityLinkeageData: any,
  setCommunityLinkeageDataSecond: any
) => {
  if (meIndicators) {
    if (selectedState.lga) {
      settier("Lga");

      const healthInfoData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator25Lga"
      );
      setIndicatorValues(healthInfoData, setHealthInfoData, "indicator25Lga");

      const essentialMedData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator17Lga"
      );
      setIndicatorValues(essentialMedData, setEsentialMed, "indicator17Lga");

      const essentialMedSecondData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator28Lga"
      );
      setIndicatorValues(
        essentialMedSecondData,
        setEsentialMedSecond,
        "indicator28Lga"
      );

      const communityLinkeageData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator35Lga"
      );
      setIndicatorValues(
        communityLinkeageData,
        setCommunityLinkeageData,
        "indicator35Lga"
      );

      const communityLinkeageDataSecond = filterDataByState(
        meIndicators,
        selectedState,
        "indicator36Lga"
      );
      setIndicatorValues(
        communityLinkeageDataSecond,
        setCommunityLinkeageDataSecond,
        "indicator36Lga"
      );
    } else if (selectedState.state && !selectedState.lga) {
      settier("State");

      const healthInfoData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator25State"
      );
      setIndicatorValues(healthInfoData, setHealthInfoData, "indicator25State");

      const essentialMedData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator17State"
      );
      setIndicatorValues(essentialMedData, setEsentialMed, "indicator17State");

      const essentialMedSecondData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator28State"
      );
      setIndicatorValues(
        essentialMedSecondData,
        setEsentialMedSecond,
        "indicator28State"
      );

      const communityLinkeageData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator35State"
      );
      setIndicatorValues(
        communityLinkeageData,
        setCommunityLinkeageData,
        "indicator35State"
      );

      const communityLinkeageDataSecond = filterDataByState(
        meIndicators,
        selectedState,
        "indicator36State"
      );
      setIndicatorValues(
        communityLinkeageDataSecond,
        setCommunityLinkeageDataSecond,
        "indicator36State"
      );
    } else {
      settier("National");

      const healthInfoData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator25National"
      );
      setIndicatorValues(
        healthInfoData,
        setHealthInfoData,
        "indicator25National"
      );

      const essentialMedData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator17National"
      );
      setIndicatorValues(
        essentialMedData,
        setEsentialMed,
        "indicator17National"
      );

      const essentialMedSecondData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator28National"
      );
      setIndicatorValues(
        essentialMedSecondData,
        setEsentialMedSecond,
        "indicator28National"
      );

      const communityLinkeageData = filterDataByState(
        meIndicators,
        selectedState,
        "indicator35National"
      );
      setIndicatorValues(
        communityLinkeageData,
        setCommunityLinkeageData,
        "indicator35National"
      );

      const communityLinkeageDataSecond = filterDataByState(
        meIndicators,
        selectedState,
        "indicator36National"
      );
      setIndicatorValues(
        communityLinkeageDataSecond,
        setCommunityLinkeageDataSecond,
        "indicator36National"
      );
    }
  }
};

// assestment data array

export const createAssessmentData = (
  totalStateAssessedCount: any,
  stateNumber: any,
  totalLgaAssessedCount: any,
  totalLgas: any,
  totalHfAssessedCount: any,
  totalFacilities: any
) => {
  return [
    {
      color: "#0EB10A",
      title: "States Assessed",
      icon: "wallet",
      value: totalStateAssessedCount,
      sub: stateNumber,
      classname: "card-greenish",
      subTitle: "Number of states receiving DFF Disbursements from NPHCDA",
      showFCT: true,
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.state,
    },
    {
      color: "#00A8BF",
      title: "LGAs Assessed",
      icon: "tree-structure",
      value: totalLgaAssessedCount,
      classname: "card-goldish",
      subTitle:
        "State where all LGAs have at least 1 Functional SHC benefitting from BHCPF",
      sub: totalLgas,
      showFCT: true,
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.lga,
    },
    {
      color: "#0A57B1",
      title: "HFs Assessed",
      icon: "tree-struct",
      value: totalHfAssessedCount,
      classname: "card-blueish",
      sub: totalFacilities,
      showFCT: false,
      subTitle:
        "State where all wards have at least 2 functional PHC benefitting from BHCPF",
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.hf,
    },
    {
      color: "#B90651",
      title: "HFs Assessed",
      icon: "box",
      value: totalHfAssessedCount,
      classname: "card-blueish",
      sub: totalFacilities,
      showFCT: false,
      subTitle: "Proportion of State that paid 25% counterpart fund for BHCPF",
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.hf,
    },
  ];
};

// filter LGA Data By SelectedState
export const filterLGADataBySelectedState = (
  data: { [x: string]: any[] },
  transformProperty: string,
  selectedState: {
    lga: string | undefined;
    year: number | undefined;
    quarter: number | undefined;
  }
): { [key: string]: number } | undefined => {
  const filteredData: any = data[transformProperty].filter(
    (dt: {
      lga: string | undefined;
      year: number | undefined;
      quarter: number | undefined;
    }) =>
      dt?.lga === selectedState?.lga &&
      dt?.year === selectedState.year &&
      dt?.quarter === selectedState.quarter
  );
  const transformedData = {
    ...filteredData?.[0],
    [transformProperty]:
      filteredData?.length > 0
        ? Math.round(filteredData[0]?.[transformProperty] * 100)
        : 0,
  };

  return transformedData;
};

export const filterStateDataBySelectedState = (
  data: { [x: string]: any[] },
  transformProperty: string,
  selectedState: {
    state: string | undefined;
    year: number | undefined;
    quarter: number | undefined;
  }
): { [key: string]: number } | undefined => {
  const filteredData: any = data[transformProperty].filter(
    (dt: {
      state: string | undefined;
      year: number | undefined;
      quarter: number | undefined;
    }) =>
      dt?.state === selectedState.state &&
      dt?.year === selectedState.year &&
      dt?.quarter === selectedState.quarter
  );
  const transformedData = {
    ...filteredData?.[0],
    [transformProperty]:
      filteredData?.length > 0
        ? Math.round(filteredData[0]?.[transformProperty] * 100)
        : 0,
  };

  return transformedData;
};

export const filterNationalDateBySelectedState = (
  data: { [x: string]: any[] },
  transformProperty: string,
  selectedState: {
    year: number | undefined;
    quarter: number | undefined;
  }
): { [key: string]: number } => {
  const filteredData: any = data[transformProperty].filter(
    (dt: { year: number | undefined; quarter: number | undefined }) =>
      dt?.year === selectedState.year && dt?.quarter === selectedState.quarter
  );
  const transformedData = {
    ...filteredData?.[0],
    [transformProperty]:
      filteredData?.length > 0
        ? Math.round(filteredData[0]?.[transformProperty] * 100)
        : 0,
  };

  return transformedData;
};

export const convertIndicators = (
  indicator: any,
  field = "",
  tier: string,
  selectedState: { year: number; quarter: number }
) => {
  const level =
    tier === "National"
      ? indicator?.National
      : tier === "State"
      ? indicator?.State
      : indicator?.Lga;
  if (field !== "" && level) {
    const i = level[field + tier];
    return i?.filter(
      (dt: { year: number; quarter: number }) =>
        dt?.year === selectedState.year && dt?.quarter === selectedState.quarter
    );
  } else {
    return indicator?.filter(
      (dt: { year: number; quarter: number }) =>
        dt?.year === selectedState.year && dt?.quarter === selectedState.quarter
    );
  }
};

export const serviceCardData = (year, quarter) => {
  const liveIndicators = [
    "indicator9National",
    "indicator2National",
    "indicator36National",
    "indicator1National",
  ];
  const data = AllIndicators.filter((e) =>
    liveIndicators.includes(e.indicatorNational)
  );
  const { fetchedIndicators } = useSettings();
  const res = staticCardData;
  if(fetchedIndicators){
    liveIndicators.forEach((e, i) => {
      const indicators = fetchedIndicators[e] || null;
      const d = data[i];
      if (indicators) {
        const filtered = indicators.filter(
          (ind) => ind.year === year && ind.quarter === quarter
        )[0];
        if (filtered) {
          res[i].subTitle = d.name;
          res[i].value = Math.round(filtered[e] * 100);
        } else {
          res[i].subTitle = d.name;
          res[i].value = "";
        }
      }
    });

  }
  return res;
};

export const createNPHCDAAssessmentData = (
  totalStateAssessedCount: any,
  stateNumber: any,
  totalLgaAssessedCount: any,
  totalLgas: any,
  totalHfAssessedCount: any,
  totalFacilities: any
) => {
  return [
    {
      color: "#004b50",
      title: "States Assessed",
      value: totalStateAssessedCount,
      sub: stateNumber,
      classname: "card-greenish",
      subTitle: "Total No. Of States",
      showFCT: true,
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
      showFCT: true,
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
      showFCT: false,
      subTitle: "Total No. of Facilities",
      show: false,
      isString: true,
      path: PATH_DASHBOARD.m_and_e.hf,
    },
  ];
};
