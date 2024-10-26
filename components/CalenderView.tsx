import { Calendar } from "react-native-calendars";
import { View, StyleSheet } from "react-native";
const holidays = {
  "2024-09-29": { textColor: "#ff000050" },
  "2024-10-05": { textColor: "red" },
  "2024-10-06": { textColor: "red" },
  "2024-10-12": { textColor: "red" },
  "2024-10-13": { textColor: "red" },
  "2024-10-19": { textColor: "red" },
  "2024-10-20": { textColor: "red" },
  "2024-10-26": { textColor: "red" },
  "2024-10-27": { textColor: "red" },
  "2024-11-02": { textColor: "#ff000050" },
};
const markedDates = [
  "2024-09-30",
  "2024-10-01",
  "2024-10-07",
  "2024-10-08",
  "2024-10-14",
  "2024-10-15",
  "2024-10-28",
  "2024-10-29",
];
const selectedDateStyle = {
  color: 'green',
  textColor: "white",
}
const selectedDisabledDateStyle = {
  color: '#00ff0050',
}
const fn = () => {
  let t = {};
  markedDates.forEach(date => {
    let tt = selectedDateStyle;
    if(date.substring(5,7) !== '10'){
      tt['disabled'] = true;
      tt = {...tt, ...selectedDisabledDateStyle};
    }
    t[date] = tt;
  });
  return t;
}
export default function CalenderView() {
  return (
    <View style={styles.calendarArea}>
      <Calendar
        initialDate={"2024-10-26"}
        markingType={"period"}
        markedDates={{
          "2024-10-21": {
            startingDay: true,
            color: "green",
            textColor: "white",
          },
          "2024-10-22": {
            endingDay: true,
            color: "green",
            textColor: "white",
          },
          "2024-10-04": {
            disabled: true,
            textColor: "green",
          },
          ...holidays,
          ...fn(),
        }}
        onDayPress={(day) => {
          console.log("selected day", day.dateString);
        }}
        theme={{
          "stylesheet.calendar.header": {
            dayTextAtIndex0: {
              color: "red",
            },
            dayTextAtIndex6: {
              color: "blue",
            },
          },
        }}
      />
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
});
