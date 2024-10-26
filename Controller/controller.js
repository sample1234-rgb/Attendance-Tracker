import db from "../assets/db";
const getAttendence = async (id) => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /attendences/" + id);
    setTimeout(() => {
      res({
        data: db.find((item) => item.id === id),
      });
    }, 1000);
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
    }, 1000);
  })
    .then((res) => res?.data)
    .catch((e) => console.error(e));
};
const getAttendenceListByDay = async (day) => {
  return new Promise((res, rej) => {
    console.log("API: [GET] /attendences/" + day);
    setTimeout(() => {
      const data = db.filter((lect) => lect.days.length && lect.days.includes(day.toLowerCase()));
      res({ data: data });
    }, 100);
  })
    .then((res) => res.data)
    .catch((e) => console.error(e));
};
const updateAttendence = async (item) => {
  return new Promise((res, rej) => {
    console.log("API: [PUT] /attendences/" + item.id);
    setTimeout(() => {
      db[db.findIndex(topic => item.id === topic.id)] = item;
      res(true);
    }, 1000);
  })
    .then(res => res)
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
    }, 1000);
  })
    .then((res) => res)
    .catch((e) => console.error(e));
};
const deleteTopic = async (id) => {
  return new Promise((res, rej) => {
    console.log("API: [DEL] /topic/" + id);
    setTimeout(() => {
      db.splice(db.findIndex((topic) => topic.id === id), 1);
      res(true);
    }, 1000);
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
};
