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