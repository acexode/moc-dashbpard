import { indicatorSettings } from "../../constants";
import { generateUUID } from "../../utility";
import { AllIndicators } from "./allIndicators";

// ----------------------------------------------------------------------

const now = new Date();
// const uids = {};
// for(let i=0;i<40; i++){
//   uids['card' + i] = generateUUID()
// }

const columnIds = {
  column1: "8cd887ec-b3bc-11eb-8529-0242ac130003",
  column2: "23008a1f-ad94-4771-b85c-3566755afab7",
  column3: "37a9a747-f732-4587-a866-88d51c037641",
};

const cardIds = {
  card1: "1e8af63c80f642aba33e08c8523b8a8c",
  card2: "ffbe3c2ff4da4e6e8e7b56be0f075901",
  card3: "06153b0879ee4000a9947583556acdb2",
  card4: "073fb44d07e3454598175b5d52d564a4",
  card5: "74dbee51d38044f6b8395961c3d33f32",
  card6: "29a3895bc04b49fe9ed22c3e6309abd7",
  card7: "73398862771b483ea343102193d485a9",
  card8: "66a9e011b8024fd7914e17e422fb37f9",
  card9: "0597501ba5aa49288d8a9edc84ba1d16",
  card10: "644ad76c730d4714a02e8d7311d86325",
  card11: "502462f19a144f2dac2bfe9d210f0f51",
  card12: "89820d2397314035af16fd29f9e6d915",
  card13: "3d1d48cb41d14507b1faa11dbb04e854",
  card14: "185c9fddd74f4b60a52b7e09056ba067",
  card15: "ea9428e22ea44c39abe84d399f95b8a4",
  card16: "4d4ec80c66cc46c2bf485a7bf81759e6",
  card17: "ebe27e321fd14b51a60e85fb182ebfbc",
  card18: "ed78c5cbce3c4333b5a70310f6dffd85",
  card19: "d0d4bdf9103e43058368daa567d48000",
  card20: "2ea1ee0864cc41d8aa78abdc8cc44ab2",
  card21: "34ff943efca343a4b932c670f456720f",
  card22: "ac474c724e364b688b6cb55f235e204c",
  card23: "d83518688274479bae22504092a91dbe",
  card24: "83c18ee0a717430cbff395c5076e63a3",
  card25: "2a7a993272944428ad43199194903e86",
  // card26: "e54d592fe9ef479eae62a3b4f4651c09",
  // card27: "877eb6c4a6b84a72ba9d8de17790f8f0",
  // card28: "44247e3938da4d9d9da158174e983c41",
  // card29: "ce70065a913c49c1b13cf48d60b64689",
  // card30: "9182bda7e2234508af08fd0c909bc11a",
  card31: "7281b59d442448918ec9a8500ab6b6c3",
  card32: "96edaa0b69ff4d2090c6f88b93bfe2e0",
  card33: "e5016546109d4500a8ccb6bfce0d95a1",
  card34: "05ba77676d814a97a8418dbbc0b900f7",
  card35: "5c0be05ba44942f29c8b8731fe296265",
  card36: "f46f514d9f6d4d4fa017af607127141e",
  card37: "bee6a73c214f4de7908c77e3a6e5eab5",
  card38: "3b81421bee2e4467835e5c53193ae51e",
  card39: "53a8dd0335a146a1b1b00dedf6c09aa6",
};

const indicators = AllIndicators.map((e, i) => {
  const index = i + 1;

  return {
   ...e,
   indicatorNational: 'indicator'+index + 'National',
   indicatorState: 'indicator'+index + 'State',
   indicatorlga: 'indicator'+index + 'Lga',
  };
});

// console.log(indicators);


const defaultNationalCards = [
  cardIds.card1,
  cardIds.card2,
  cardIds.card3,
  cardIds.card5,
  cardIds.card7,
  cardIds.card17,
  cardIds.card19,
  cardIds.card20,
  cardIds.card21,
  cardIds.card25,
  // cardIds.card28,
  cardIds.card32,
  cardIds.card35,
  cardIds.card36,
  cardIds.card39,
];
const defaultStateCards = [
  cardIds.card3,
  cardIds.card4,
  cardIds.card6,
  cardIds.card7,
  cardIds.card17,
  cardIds.card18,
  cardIds.card20,
  cardIds.card21,
  cardIds.card25,
  cardIds.card32,
  cardIds.card35,
  cardIds.card36,
  cardIds.card39,
]
const user = JSON.parse(localStorage.getItem('user') || '{}');
const defaultCards = user.level === 'National' ? defaultNationalCards : defaultStateCards
const columnList = [
  {
    id: columnIds.column1,
    name: "All Indicators",
    cardIds: Object.values(cardIds).map(e => defaultCards.includes(e) ),
  },
  {
    id: columnIds.column2,
    name: "Live Indicators",
    cardIds: defaultCards,
  },
  // {
  //   id: columnIds.column3,
  //   name: "Preview",
  //   cardIds: [],
  // },
];
console.log(columnList);


const objFromArray = (array: any, key: any = "id") => {
  return array.reduce((accumulator: any, current: any) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
};
const filter = AllIndicators.filter((e) => !defaultCards.includes(e.id));
const cards = Object.values(cardIds).filter((e) => !defaultCards.includes(e));
columnList[0].cardIds = cards

export const indicatorBoard = {
  cards: objFromArray(AllIndicators),
  columns: objFromArray(columnList),
  columnOrder: [columnIds.column1, columnIds.column2],
};

export const indicatorGroupNo: {[key: string]: number} = {
  essentialMed: 2,
  governance: 3,
  hr: 2,
  cl: 2,
  his: 1,
  //ie: 1,
 // ssd: 1,
  finance: 2,
  qa: 1,
  supervision: 1

}
if (!localStorage.getItem(indicatorSettings)) {
  localStorage.setItem(indicatorSettings, JSON.stringify(indicatorBoard));
}
