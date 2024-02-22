export interface DefaultState {
  national: string;
  state: string;
  lga: string;
  year: number;
  quarter: number;
}
interface FetchedIndicator {
  [key: string]: {
    year: number;
    quarter: number;
    [key: string]: any;
  }[];
}

interface LiveIndicator {
  [key: string]: any; // Replace with actual type
}

interface IndicatorResult {
  label: string;
  value: number;
}

export function processIndicators(
  fetchedIndicators: FetchedIndicator,
  ltype: string[],
  liveIndicators: LiveIndicator[],
  year: number,
  cquarter: number,
  labelTier: string,
  selectedState: string,
  cardname: string
): IndicatorResult[] {
  const val: IndicatorResult[] = [];

  for (const v in fetchedIndicators) {
    if (ltype.includes(v)) {
      const f = fetchedIndicators[v].filter(
        (e) => e.year === year && e.quarter === cquarter
      );
      if (f.length > 0) {
        const label = liveIndicators.filter((e) => e[labelTier] === v)[0]
          .shortName;
        const stateData =
          selectedState === "" ? f : f.filter((s) => s.state === selectedState);
        //   console.log({fetchedIndicators, f, selectedState, liveIndicators, cardname});

        if (stateData.length > 0) {
          const { year, quarter, state, ...rest } = stateData[0];
          const res = Object.values(rest)[0];

          val.push({
            label,
            value: Math.floor(res * 100),
          });
        }
      }
    }
  }

  return val;
}

interface Indicator {
  id: string;
  groupKey: string;
  indicatorNational: string;
  indicatorState: string;
  indicatorLga: string;
  // Add other properties as needed
}

interface Settings {
  columnOrder: string[];
  columns: {
    [key: string]: {
      cardIds: string[];
      // Add other properties as needed
    };
    // Add other properties as needed
  };
  // Add other properties as needed
}
interface LiveIndicatorResult {
  ltype: string[];
  liveIndicators: Indicator[];
}
export function getLiveIndicator(
  settings: Settings,
  allIndicators: Indicator[],
  tier: "National" | "State" | "Lga",
  key: string
): LiveIndicatorResult {
  const column = settings.columnOrder[1];
  const cardIds = settings.columns[column].cardIds;
  const filteredIndicators = allIndicators.filter(
    (e) => e.groupKey === key
  );
  const liveIndicators = filteredIndicators.filter((e) =>
    cardIds.includes(e.id)
  );
  const ltype = liveIndicators.map((e) =>
    tier === "National"
      ? e.indicatorNational
      : tier === "State"
      ? e.indicatorState
      : e.indicatorLga
  );

  return { ltype, liveIndicators };
}

interface IndicatorCategory {
  [key: string]: any; // Replace with the actual type of your indicators
}

interface CategorizeIndicatorsResult {
  national: IndicatorCategory;
  state: IndicatorCategory | undefined;
  lga: IndicatorCategory | undefined;
}

export function categorizeIndicators(
  meIndicators: IndicatorCategory,
  lgaindicators: IndicatorCategory,
  indicators: IndicatorCategory
): CategorizeIndicatorsResult {
  return {
    national: {
      ...meIndicators.National,
      ...lgaindicators.National,
      ...indicators.National,
    },
    state: {
      ...(meIndicators?.State ?? {}),
      ...(lgaindicators?.State ?? {}),
      ...(indicators?.State ?? {}),
    },
    lga: {
      ...(meIndicators?.Lga ?? {}),
      ...(lgaindicators?.Lga ?? {}),
      ...(indicators?.Lga ?? {}),
    },
  };
}

