import axiosInstance from "../services/api_service";

export const fetchLGAFacilityWard = async (
  lgalocationUrl: string,
  hflocationUrl: string,
  facilityUrl: string,
  userData: any,
  levels: any
) => {
  try {
    const [lgasRes, wardsRes, facilitiesRes] = await Promise.all([
      axiosInstance.get(`${lgalocationUrl}`),
      axiosInstance.get(`${hflocationUrl}`),
      axiosInstance.get(`${facilityUrl}`),
    ]);

    return {
      totalLgas:
        userData?.level === levels.lga ? 1 : lgasRes?.data?.length || 0,
      wards: wardsRes?.data?.length || 0,
      facilities: facilitiesRes?.data?.length || 0,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
