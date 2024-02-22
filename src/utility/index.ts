import { replace } from "lodash";
import numeral from "numeral";

export const formatDate2 = (d: string | number | Date) => {
  try {
    const date = d instanceof Date ? d : new Date(d);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var day = date.getDay();
    const date_ = date.getDate();
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    var hours = date.getHours();
    return `${month} ${date_}, ${year}`;
  } catch (e) {
    return "";
  }
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// ----------------------------------------------------------------------

export function fCurrency(number: unknown) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

export function fPercent(number: number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number: any) {
  return numeral(number).format();
}

export function fShortenNumber(number: any) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number: any) {
  return numeral(number).format("0.0 b");
}

export const getObjectById = (id: any, data: any) => {
  return data?.find((obj: { id: any }) => obj.id === id);
};

export const getColor = (value: number) => {
  if (value < 50) {
    return "#ff2727";
  } else if (value >= 50 && value <= 79) {
    return "#e9b600";
  } else {
    return "#1e4d65";
  }
};
export const getColorReverse = (value: number) => {
  if (value < 19) {
    return "#1e4d65";
  } else if (value >= 20 && value <= 49) {
    return "#e9b600";
  } else {
    return "#ff2727";
  }
};
export const getLightColorReverse = (value: number) => {
  if (value < 19) {
    return "#1e4d651a";
  } else if (value >= 20 && value <= 49) {
    return "#e9b6001a";
  } else {
    return "#e00e341a";
  }
};
export const getLightColor = (value: number) => {
  if (value < 50) {
    return "#e00e341a";
  } else if (value >= 50 && value <= 79) {
    return "#e9b6001a";
  } else {
    return "#1e4d651a";
  }
};

export const getLgaData = (data: any, state: string) => {
  if (data) {
    return data.filter((e: any) => e.state === state);
  }
};

function convertIndicators(
  meIndicators: any,
  field: string,
  tier: string,
  selectedState: any
) {
  console.log(meIndicators);
  const level =
    tier === "National"
      ? meIndicators?.National
      : tier === "State"
      ? meIndicators?.State
      : meIndicators?.Lga;
  console.log(field + tier);
  if (level) {
    const indicator = level[field + tier];
    console.log(indicator);
    if (indicator) {
      return indicator?.filter(
        (dt: { year: number; quarter: number }) =>
          dt?.year === selectedState.year &&
          dt?.quarter === selectedState.quarter
      );
    }
  }
}

export const generateUUID = () => {
  if (window.crypto && window.crypto.getRandomValues) {
    // Generate UUID using crypto API
    let uuidArray = new Uint8Array(16);
    window.crypto.getRandomValues(uuidArray);

    // Set version and variant bits
    uuidArray[6] = (uuidArray[6] & 0x0f) | 0x40; // version 4
    uuidArray[8] = (uuidArray[8] & 0x3f) | 0x80; // variant 10

    // Convert UUID array to hexadecimal string
    return Array.from(uuidArray, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");
  } else {
    // Fallback to pseudo-random method
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0;
        let v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
};

export const getUrls = (
  level: any,
  locationId: any,
  userData: any,
  levels: any
) => {
  // console.log({level, locationId, userData, levels});
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
  // console.log({ lgaUrl, hfUrl, fUrl });
  return { lgaUrl, hfUrl, fUrl };
};

export const extractNumber = (text: string) => {
  const match = text.match(/\d+/); // Use regular expression to match one or more digits
  return match ? parseInt(match[0]) : null; // Convert the matched string to an integer
};
export const getIndicatorTier = (tier: string) => {
  const labelTier =
    tier === "National"
      ? "indicatorNational"
      : tier === "State"
      ? "indicatorState"
      : "indicatorLga";
  return labelTier;
};

export const getYearAndQuarter = (): { year: number; quarter: number } => {
  const currentDate: Date = new Date();
  const currentQuarter: number = Math.ceil((currentDate.getMonth() + 1) / 3);

  if (currentQuarter === 1) {
      const previousYear: number = currentDate.getFullYear() - 1;
      return { year: previousYear, quarter: 4 };
  } else {
      return { year: currentDate.getFullYear(), quarter: currentQuarter - 1 };
  }
};

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function getCurrentTimeInTimeZone(timeZone: string) {
  const options: any = {
    timeZone,
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const currentTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
  return currentTime;
}

const currentTimeInUserTimeZone = getCurrentTimeInTimeZone(userTimeZone);

console.log(`Current time in ${userTimeZone}:`, currentTimeInUserTimeZone);

console.log('User Timezone:', userTimeZone);

