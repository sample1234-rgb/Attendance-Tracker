import db from "../assets/db";
import { users } from "../assets/db";
const APITime = 1000;
const getAttendence = async (id) => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /attendences/" + id);
    setTimeout(() => {
      res({
        data: db.find((item) => item.id === id),
      });
    }, APITime);
  })
    .then((res) => res?.data)
    .catch((e) => console.error(e));
};
const getAttendenceList = async () => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /attendences");
    setTimeout(() => {
      res({
        data: db,
      });
    }, APITime);
  })
    .then((res) => res?.data)
    .catch((e) => console.error(e));
};
const getAttendenceListByDay = async (day) => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /attendences/" + day);
    setTimeout(() => {
      const data = db.filter(
        (lect) => lect.days.length && lect.days.includes(day.toLowerCase())
      );
      res({ data: data });
    }, APITime);
  })
    .then((res) => res.data)
    .catch((e) => console.error(e));
};
const updateAttendence = async (item) => {
  return new Promise((res, rej) => {
    console.log("API: [PUT] /attendences/" + item.id);
    setTimeout(() => {
      db[db.findIndex((topic) => item.id === topic.id)] = item;
      res(true);
    }, APITime);
  })
    .then((res) => res)
    .catch((e) => console.error(e));
};
const saveTopic = async (topic) => {
  return new Promise((res, rej) => {
    console.log("API: [PUT] /topic");
    setTimeout(() => {
      const newTopic = {
        ...topic,
        count: 1,
        id: (db.length + 1).toString(),
        day: [],
      };
      db.push(newTopic);
      res(true);
    }, APITime);
  })
    .then((res) => res)
    .catch((e) => console.error(e));
};
const deleteTopic = async (id) => {
  return new Promise((res, rej) => {
    console.log("API: [DEL] /topic/" + id);
    setTimeout(() => {
      db.splice(
        db.findIndex((topic) => topic.id === id),
        1
      );
      res(true);
    }, APITime);
  })
    .then((res) => res)
    .catch((e) => console.error(e));
};
const login = async (userCred) => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /user/login/" + userCred.id);
    setTimeout(() => {
      let u = users.find((user) => {
        if (user.email === userCred.id || user.username === userCred.id) {
          if (user.password === userCred.password) {
            res(user.id);
          } else rej("Wrong Credentials");
        }
      });
      if (u === undefined) rej("No User found");
    }, APITime);
  })
    .then((res) => res)
    .catch((rej) => rej);
};
const getUser = async (id) => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /user/" + id);
    setTimeout(() => {
      res({
        data: users.find((user) => user.id === id),
      });
    }, APITime);
  })
    .then((res) => res.data)
    .catch((e) => console.error(e));
};
const getAllUsers = async () => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /users");
    setTimeout(() => {
      res({
        data: users,
      });
    }, APITime);
  })
    .then((res) => res?.data)
    .catch((e) => console.error(e));
};
const generateUID = async () => {
  return new Promise((res, rej) => {
    console.log("API: [POST] /users/id");
    setTimeout(() => {
      res(users.length);
    }, APITime);
  })
    .then((res) => res)
    .catch((rej) => rej);
};
const generateTopicID = async () => {
  return new Promise((res, rej) => {
    console.log("API: [POST] /attendence/id");
    setTimeout(() => {
      res(db.length);
    }, APITime);
  })
    .then((res) => res)
    .catch((rej) => rej);
};
const createUser = async (newUserCred) => {
  return new Promise((res, rej) => {
    console.log("API: [POST] /users");
    setTimeout(() => {
      const ifExists = users.find(
        (user) =>
          user.email === newUserCred.id ||
          user.username === newUserCred.id ||
          user.contact === newUserCred.id
      );
      if (ifExists) rej("User already exists");
      newUserCred.id = users.length.toString();
      users.push(newUserCred);
      res(true);
    }, APITime);
  })
    .then((res) => res)
    .catch((e) => console.error(e));
};
export default {
  getAttendence,
  getAttendenceList,
  getAttendenceListByDay,
  updateAttendence,
  saveTopic,
  deleteTopic,
  login,
  getUser,
  getAllUsers,
  createUser,
  generateUID,
  generateTopicID,
};
