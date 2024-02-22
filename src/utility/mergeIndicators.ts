//@ts-check
interface CommonFields {
  year: number;
  quarter: number;
  state: string;
}

interface ArrayElement {
  [key: string]: any;
}

export function mergeIndicatorsArrays<T extends ArrayElement>(
  commonFields: (keyof CommonFields)[],
  ...arrays: T[][]
): T[] {
  const mergedArray: T[] = [];

  const mergeObjects = (obj1: T, obj2: T): T => {
    const result: T = { ...obj1 };
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !commonFields.includes(key)) {
        result[key] = obj2[key];
      }
    }
    return result;
  };

  arrays.forEach((array) => {
    mergedArray.forEach((mergedItem) => {
      const matchingItem = array.find((item) =>
        commonFields.every((field) => mergedItem[field] === item[field]),
      );

      if (matchingItem) {
        mergedArray[mergedArray.indexOf(mergedItem)] = mergeObjects(
          mergedItem,
          matchingItem,
        );
      }
    });

    array.forEach((item) => {
      const notMatched = mergedArray.every(
        (mergedItem) =>
          !commonFields.every((field) => mergedItem[field] === item[field]),
      );

      if (notMatched) {
        mergedArray.push(item);
      }
    });
  });

  return mergedArray;
}
