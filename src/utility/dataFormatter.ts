// @ts-nocheck


export const handleFormatData = (data: any[]) =>{
	const groupedData = data?.reduce((acc, obj) => {
        const key = `${obj?.location?.name}-${obj?.year}`;
        if (!acc[key]) {
          acc[key] = {
            location: obj.location,
            year: obj.year,
            content:obj?.content,
            quarters: {
              Q1: { id: null, exists: false },
              Q2: { id: null, exists: false },
              Q3: { id: null, exists: false },
              Q4: { id: null, exists: false }
            }
          };
        }
        acc[key].quarters[`Q${obj?.quarter}`] = { id: obj?.id, exists: true };
        return acc;
      }, {});
      
      // Convert the grouped data into an array of objects
      return Object.values(groupedData).map(obj => {
        return {
          location: obj?.location,
          year: obj?.year,
          quarters: obj?.quarters,
          content:obj?.content,
        };
      });
      
}
export const handleFormatData2 = (data: any[]) =>{
	const groupedData = data?.reduce((acc, obj) => {
        const key = `${obj?.location?.name}-${obj?.year}`;
        if (!acc[key]) {
          acc[key] = {
            location: obj?.location,
            year: obj?.year,
            content:obj?.content,
            lgaLocation:obj?.location?.name,
            stateLocation:obj?.location?.parent?.name,
            quarters: {
              Q1: { id: null, exists: false },
              Q2: { id: null, exists: false },
              Q3: { id: null, exists: false },
              Q4: { id: null, exists: false }
            }
          };
        }
        acc[key].quarters[`Q${obj?.quarter}`] = { id: obj?.id, exists: true };
        return acc;
      }, {});
      
      // Convert the grouped data into an array of objects
      return Object.values(groupedData).map(obj => {
        return {
          location: obj?.location,
          year: obj?.year,
          quarters: obj?.quarters,
          content:obj?.content,
          lgaLocation:obj?.lgaLocation,
          stateLocation:obj?.stateLocation
        };
      });
      
}
export const handleFormatData3 = (data: any[]) =>{
	const groupedData = data?.reduce((acc, obj) => {
    const key = obj && obj["Facility.name"] ? `${obj["Facility.name"]}-${obj.year}` : `${obj?.facility?.name }-${obj.year}`; 
        if (!acc[key]) {
          acc[key] = {
            facility: obj && obj["Facility.name"] ? `${obj["Facility.name"]}` : `${obj?.facility?.name }`,
            year: obj?.year,
            content:obj?.content,
            quarter:obj.quarter,
            wardLocation:obj["Facility.Locations.name"] ? obj["Facility.Locations.name"] : obj?.facility?.locationId,
            lgaLocation: obj["Facility.Locations.ParentLocation.name"] ?obj["Facility.Locations.ParentLocation.name"] :obj?.location?.name,
            stateLocation: obj["Facility.Locations.ParentLocation.SecondLevelLocation.name"] ? obj["Facility.Locations.ParentLocation.SecondLevelLocation.name"] : obj?.location?.parent?.name,
            quarters: {
              Q1: { id: null, exists: false },
              Q2: { id: null, exists: false },
              Q3: { id: null, exists: false },
              Q4: { id: null, exists: false }
            }
          };
        }
        acc[key].quarters[`Q${obj?.quarter}`] = { id: obj?.id, exists: true };
        return acc;
      }, {});
      
      // Convert the grouped data into an array of objects
      return Object.values(groupedData).map(obj => {
        return {
            facility: obj?.facility,
          year: obj?.year,
          quarters: obj?.quarters,
          content:obj?.content,
          quarter:obj.quarter,
          wardLocation:obj?.wardLocation,
          lgaLocation:obj?.lgaLocation,
          stateLocation:obj?.stateLocation,

        };
      });
      
}

export function removeDuplicatesByLocation(data) {
  const uniqueLocations = data?.reduce((acc, item) => {
    const locationName = item?.location?.name;
    if (!acc[locationName]) {
      acc[locationName] = item;
    }
    return acc;
  }, {});

  return Object.values(uniqueLocations);
}
export function removeDuplicatesByFacility(data) {
  const uniqueLocations = data?.reduce((acc, item) => {
    const locationName = item?.facility?.name ? item?.facility?.name  :  item["Facility.name"];
    if (!acc[locationName]) {
      acc[locationName] = item;
    }
    return acc;
  }, {});

  return Object.values(uniqueLocations);
}

export const returnPercentage = (data, total) => {
  const parsedData = parseInt(data);
  const parsedTotal = parseInt(total);

  if (isNaN(parsedData) || isNaN(parsedTotal) || parsedTotal === 0) {
    return 0;
  }

  return Math.round((parsedData / parsedTotal) * 100);
};

export function formatProgressData(input) {
  const formattedData = input?.reduce((result, item) => {
    const { state, assessed_facilities, all_facilities, progress_percentage } = item;

    if (!result[state]) {
      result[state] = {
        state,
        assessed_facilities: 0,
        all_facilities: 0,
        progress_percentage: 0,
      };
    }

    result[state].assessed_facilities += assessed_facilities;
    result[state].all_facilities += all_facilities;
    return result;
  }, {});

  const result = Object.values(formattedData).map(item => {
    const { assessed_facilities, all_facilities } = item;
    item.not_assessed = all_facilities - assessed_facilities;
    item.progress_percentage = parseInt(((assessed_facilities / all_facilities) * 100).toFixed());
    return item;
  });
  // result?.sort((a, b) => a?.state.localeCompare(b?.state));

  return result;
}

export function formatData(data) {
  const stateTotals = {};

  data?.forEach((obj) => {
    const { state, all_facilities } = obj;
    stateTotals[state] = (stateTotals[state] || 0) + all_facilities;
  });

  const input = data?.map((obj) => ({
    ...obj,
    all_facilities: stateTotals[obj.state],
  }));

  // return result;
  const formattedData = input.reduce((result, item) => {
    const { state, assessed_facilities, all_facilities, quarter, year,progress_percentage } = item;
    if (!result[state]) {
      result[state] = {};
    }

    if (!result[state][quarter]) {
      result[state][quarter] = {};
    }

    if (!result[state][quarter][year]) {
      result[state][quarter][year] = {
        state,
        quarter,
        year,
        assessed_facilities: 0,
        all_facilities: 0,
        progress_percentage: 0,
      };
    }

    result[state][quarter][year].assessed_facilities += assessed_facilities;
    result[state][quarter][year].all_facilities = all_facilities;
    result[state][quarter][year].progress_percentage = parseInt(progress_percentage);

    return result;
  }, {});

  const result = [];

  for (const state in formattedData) {
    for (const quarter in formattedData[state]) {
      for (const year in formattedData[state][quarter]) {
        const item = formattedData[state][quarter][year];
        const { assessed_facilities, all_facilities } = item;
        item.not_assessed = all_facilities - assessed_facilities;

        result.push(item);
      }
    }
  }
  return result;
}




export const formatLGAData = (data,state) =>{
  const lgaTotals = {};

  data?.forEach((obj) => {
    const { lga, all_facilities } = obj;
    lgaTotals[lga] = (lgaTotals[lga] || 0) + all_facilities;
  });

  const input = data?.map((obj) => ({
    ...obj,
    all_facilities: lgaTotals[obj.lga],
  }));

  const formattedData = input.reduce((result, item) => {
    const { lga, assessed_facilities, all_facilities, quarter, year,state } = item;
    if (!result[lga]) {
      result[lga] = {};
    }

    if (!result[lga][quarter]) {
      result[lga][quarter] = {};
    }

    if (!result[lga][quarter][year]) {
      result[lga][quarter][year] = {
        lga,
        quarter,
        state,
        year,
        assessed_facilities: 0,
        all_facilities: 0,
        progress_percentage: 0,
      };
    }

    result[lga][quarter][year].assessed_facilities += assessed_facilities;
    result[lga][quarter][year].all_facilities = all_facilities;

    return result;
  }, {});

  const result = [];

  for (const lga in formattedData) {
    for (const quarter in formattedData[lga]) {
      for (const year in formattedData[lga][quarter]) {
        const item = formattedData[lga][quarter][year];
        const { assessed_facilities, all_facilities } = item;

        item.progress_percentage = parseInt(((assessed_facilities / all_facilities) * 100).toFixed());
        item.not_assessed = all_facilities - assessed_facilities;

        result.push(item);
      }
    }
  }
  return result?.filter((data) => data?.state === state)
}
