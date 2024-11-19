export interface Topic {
    name: string;
    info: string;
    time: string;
    id: string;
    days: Array<string>;
    markedDates: Array<string>;
    missedDates: Array<string>;
    extraClasses: Array<string>;
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
export interface UserRegister {
  firstName: string,
  lastName: string,
  password: string,
  type: UserType,
  dob: string,
  email: string,
  username: string,
  contact: string,
}
export interface UserCred {
  id: string;
  password: string;
}
export const user={};
export class UserObject {
  _id;
  firstName;
  lastName;
  password;
  type;
  age;
  courses;
  dob;
  email;
  username;
  contact;
  constructor(){
    this._id = '$';
    this.firstName = '';
    this.lastName = '';
    this.password = '';
    this.type = null;
    this.age = 0;
    this.courses = new Array<number>();
    this.dob = '';
    this.email = '';
    this.username = '';
    this.contact = '';
  }
  fromObject(user: User){
    this._id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.type = user.type;
    this.age = user.age;
    this.courses = user.courses;
    this.dob = user.dob;
    this.email = user.email;
    this.username = user.username;
    this.contact = user.contact;
  }
  isExist = () => this._id !== '$';
}