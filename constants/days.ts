export interface Day {
  name: string,
  key: string,
  value: string;
}
export type UserType = 'super-admin' | 'admin' | 'user' | null;
export interface User {
  id: string,
  firstName: string,
  lastName: string,
  password: string,
  type: UserType,
  age: number,
  courses: Array<number>,
  dob: string,
  email: string,
  username: string,
  contact: string, // number.length(10) 
}
export const TODAY = new Date();
export const days = [
  { name: "S", key: "0", value: "sunday" },
  { name: "M", key: "1", value: "monday" },
  { name: "T", key: "2", value: "tuesday" },
  { name: "W", key: "3", value: "wednesday" },
  { name: "T", key: "4", value: "thrusday" },
  { name: "F", key: "5", value: "friday" },
  { name: "S", key: "6", value: "saturday" },
];
let t = parseInt(TODAY.getFullYear().toString());
const febDays = (t%400 === 0 || t%100 === 0 || t%4 === 0) ? 29 : 29;
export const monthDays = [
  {name: 'January'  , id: '0' , number: 1 , totalDays: 31},
  {name: 'Febuary'  , id: '1' , number: 2 , totalDays: febDays},
  {name: 'March'    , id: '2' , number: 3 , totalDays: 31},
  {name: 'April'    , id: '3' , number: 4 , totalDays: 30},
  {name: 'May'      , id: '4' , number: 5 , totalDays: 31},
  {name: 'June'     , id: '5' , number: 6 , totalDays: 30},  
  {name: 'July'     , id: '6' , number: 7 , totalDays: 31},
  {name: 'August'   , id: '7' , number: 8 , totalDays: 31},
  {name: 'September', id: '8' , number: 9 , totalDays: 30},
  {name: 'Octuber'  , id: '9' , number: 10, totalDays: 31},
  {name: 'November' , id: '10', number: 11, totalDays: 30},
  {name: 'December' , id: '11', number: 12, totalDays: 31},  
]
export default days;