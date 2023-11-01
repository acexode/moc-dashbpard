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
    return "#16b06a";
  }
};

export const getLgaData = (data: any, state: string) => {
  if (data) {
    return data.filter((e: any) => e.state === state);
  }
};

function convertIndicators(meIndicators: any, field: string, tier: string, selectedState: any) {
  console.log(meIndicators);
  const level = tier === 'National' ? meIndicators?.National : tier === 'State' ? meIndicators?.State : meIndicators?.Lga
  console.log(field + tier);
  if(level){
    const indicator = level[field + tier]
    console.log(indicator);
    if(indicator){
      return indicator?.filter(
        (dt: { year: number; quarter: number }) =>
          dt?.year === selectedState.year && dt?.quarter === selectedState.quarter
      );

    }

  }
}
