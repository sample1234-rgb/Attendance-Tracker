import { Calendar, DateData } from "react-native-calendars";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import ModalView from "./ModalView";
import controller from "@/Controller/controller";
import FilterBox from "./filterBox";
import { monthDays, TODAY } from "@/constants/days";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
// import { TouchableOpacity } from "react-native-gesture-handler";
interface style {
  string: object;
}
const filters = [
  { key: "0", name: "Hi" },
  { key: "1", name: "Bob" },
];
let holidays = {
  "2024-09-29": { textColor: "#ff000050" },
  "2024-10-05": { textColor: "red" },
  "2024-10-06": { textColor: "red" },
  "2024-10-12": { textColor: "red" },
  "2024-10-13": { textColor: "red" },
  "2024-10-19": { textColor: "red" },
  "2024-10-20": { textColor: "red" },
  "2024-10-26": { textColor: "red" },
  "2024-10-27": { textColor: "red" },
};
const selectedDateStyle = {
  color: "green",
  textColor: "white",
};
const missedDateStyle = {
  color: "#feef0080",
  textColor: "black",
};
const extraDateStyle = {
  color: "#bbb080",
  textColor: "black",
};
const selectedDisabledDateStyle = {
  color: "#00ff0050",
};
const changeDisabledSytle = (styled = {}, apply = true, opacity = "50") => {
  Object.keys(styled).forEach((style) => {
    if (style.includes("color")) {
      let temp = styled[style];
      if (apply) temp = temp + opacity;
      else temp = temp.substring(0, 7);
      styled[style] = temp;
    }
  });
  return styled;
};
const findHolidays = (month = TODAY.getMonth() + 1) => {
  let firstDay = new Date(
    `${TODAY.getFullYear()}-${month.toString().padStart(2, "0")}-01`
  );
  let day = firstDay.getDay();
  let currMonth = monthDays.find((date) => date.number === month);
  const weekends = {};
  let l = "";
  for (let i = 1; i <= currMonth?.totalDays; i++) {
    if (day % 6 === 0)
      l = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
    weekends[l] = { textColor: "red" };
    day = (day + 1) % 7;
  }
  return weekends;
};
const makeMarkStyling = (dates: Array<string>, customStyle: Object) => {
  let t = new Object();
  dates.forEach((date) => {
    let tt = customStyle;
    if (date.substring(5, 7) !== (TODAY.getMonth() + 1).toString()) {
      tt.disabled = true;
      tt = { ...tt, ...selectedDisabledDateStyle };
    }
    t[date] = tt;
  });
  return t;
};
const defineStyles = (styles: object, dates: Array<string>) => {
  Object.keys(styles).forEach((key: string) => {
    const a = key.substring(0, 8),
      b = key.substring(8);
    const prevDate = a + (parseInt(b) - 1).toString().padStart(2, "0");
    const nextDate = a + (parseInt(b) + 1).toString().padStart(2, "0");
    const pvExist =
      dates.find((item: string) => item === prevDate) !== undefined;
    const nxExist =
      dates.find((item: string) => item === nextDate) !== undefined;
    // console.log(a, b, prevDate, nextDate, pvExist,nxExist);
    let temp = Object.fromEntries(Object.entries(styles[key]));
    if (!pvExist && !nxExist)
      // this is only day marked
      temp = { ...temp, startingDay: true, endingDay: true };
    else if (pvExist && nxExist) temp = { ...temp };
    else if (pvExist)
      // this is ending day
      temp = { ...temp, endingDay: true };
    else if (nxExist)
      // this is starting day
      temp = { ...temp, startingDay: true };
    styles[key] = temp;
  });

  return styles;
};
const todayStyles = () => {
  let t = {};
  let tt = TODAY.toISOString().substring(0, 10);
  t[`${tt}`] = {
    dot: true,
    color: "#dfd00a",
    startingDay: true,
    endingDay: true,
  };
  return t;
};
export default function CalenderView({
  item,
  updateItem,
}: {
  item: any;
  updateItem: Function;
}) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [calenderDays, setCalenderDays] = useState({});
  const markedDates = item.markedDates.toString().split(",").filter((item: string) => item !== '');
  const missedDates = item.missedDates.toString().split(",").filter((item: string) => item !== '');
  const extraDates = item.extraClasses.toString().split(",").filter((item: string) => item !== '');
  const mrk = makeMarkStyling(markedDates, selectedDateStyle);
  const ms = makeMarkStyling(missedDates, missedDateStyle);
  const ed = makeMarkStyling(extraDates, extraDateStyle);
  const t = { ...mrk, ...ms };
  defineStyles(t, [...markedDates, ...missedDates]);
  const showModal = (day: DateData) => {
    console.log(day);
    setModalData(day.dateString);
    setModal(true);
  };
  const updateDateStyle = (day: string, style: number) => {
    const newItem = item;
    newItem.markedDates = markedDates.filter((date: string) => date !== day);
    newItem.missedDates = missedDates.filter((date: string) => date !== day);
    newItem.extraClasses = extraDates.filter((date: string) => date !== day);
    switch (style) {
      case 1:
        newItem.markedDates.push(day);
        break;
      case 2:
        newItem.missedDates.push(day);
        break;
      case 3:
        newItem.extraClasses.push(day);
        break;
      default:
        console.log("do nothing");
        break;
    }
    controller
      .updateAttendence(newItem)
      .then(() => {
        updateItem(newItem);
        setModal(false);
      })
      .catch((e) => console.error(e));
  };
  holidays = { ...holidays, ...findHolidays() };
  // useLayoutEffect(() => setCalenderDays(), []);
  return (
    <View style={styles.calendarArea}>
      <Calendar
        markingType={"period"}
        markedDates={{
          ...holidays,
          ...t,
          ...ed,
          ...todayStyles(),
        }}
        onDayPress={(day: DateData) => showModal(day)}
        theme={{
          "stylesheet.calendar.header": {
            dayTextAtIndex0: {
              color: "#ff000070",
            },
            dayTextAtIndex6: {
              color: "#0000ff70",
            },
          },
        }}
      />
      <ModalView visible={modal} modalCloseHandler={() => setModal(false)}>
        <>
          <Text>Date: {modalData}</Text>
          <View style={styles.flexBox}>
            <TouchableOpacity
              style={styles.flexItem}
              onPress={() => updateDateStyle(modalData, 1)}
            >
              <Text>Mark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flexItem}
              onPress={() => updateDateStyle(modalData, 2)}
            >
              <Text>Miss</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flexItem}
              onPress={() => updateDateStyle(modalData, 3)}
            >
              <Text>Extra</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flexItem}
              onPress={() => updateDateStyle(modalData, 0)}
            >
              <Text>None</Text>
            </TouchableOpacity>
          </View>
          {/* <FilterBox listOfItems={filters}>
            {/* {filters.map(filter => <Text>{filter.name}</Text>)} /}
          </FilterBox> */}
        </>
      </ModalView>
    </View>
  );
}
const styles = StyleSheet.create({
  calendarArea: {
    maxWidth: 400,
    maxHeight: 400,
    paddingHorizontal: 10,
    margin: 5,
    width: 400,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    paddingBottom: 10,
  },
  flexBox: {
    flex: 1,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  flexItem: {
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
});
