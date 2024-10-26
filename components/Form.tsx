import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import days from "@/constants/days";

export default function Form({ onSubmit }) {
  let newTopic = {
    name: "",
    info: "",
    timing: "",
  };
  const [buttonTitle, setButtonTitle] = useState("Add Start Time");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [mobileTime, setMobileTime] = useState(0);
  const [day, setDay] = useState(new Array<string>());
  const markDay = (selected: string) => {
    let newDays = day.includes(selected)
      ? day.filter(item => item !== selected)
      : [...day, selected];
    setDay(newDays);
  };
  function extractLocaleTime(timeVar: String) {
    return parseInt(timeVar?.substring(0, 2)) > 12
      ? (parseInt(timeVar?.substring(0, 2)) - 12).toString().padStart(2, "0") +
          timeVar?.substring(2) +
          " PM"
      : timeVar + " AM";
  }
  const saveTopic = () => {
    const time = `${extractLocaleTime(startTime)} ~ ${extractLocaleTime(
      endTime
    )}`;
    onSubmit({ ...newTopic, days: day, time: time }).then(
      (res: boolean) => res && resetState()
    );
    setMobileTime(0); // bug
    // emit success && closeModal()
  };
  const resetState = () => {
    newTopic.name = newTopic.info = newTopic.timing = "";
  };
  const showMode = () => {
    if (Platform.OS === "android")
      DateTimePickerAndroid.open({
        is24Hour: false,
        onChange: (e, val) => {
          let time = `${val?.getHours()}:${val?.getMinutes()}`;
          if (mobileTime === 0) {
            setStartTime(time);
            setMobileTime(mobileTime + 1);
            setButtonTitle("Add End Time");
          } else if (mobileTime === 1) {
            setEndTime(time);
            setMobileTime(mobileTime + 1);
            setButtonTitle(`${startTime}~${endTime}`);
          }
        },
        mode: "time",
        value: new Date(),
      });
  };
  return (
    <View style={{ padding: 30 }}>
      <Text>Course Title:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="ex. Science"
        onChangeText={(e) => (newTopic.name = e)}
      />
      <Text>Course Instuctor:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="ex. Prof. Oak"
        // value={newTopic.info}
        onChangeText={(e) => (newTopic.info = e)}
      />
      <Text>Course Timing:</Text>
      {Platform.OS === "web" ? (
        <View style={styles.flexContainer}>
          <input
            type="time"
            value={startTime}
            style={styles.timeComponent}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Text>~</Text>
          <input
            type="time"
            value={endTime}
            style={styles.timeComponent}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </View>
      ) : (
        <>
          <Button
            disabled={mobileTime > 1}
            onPress={showMode}
            title={buttonTitle}
          />
        </>
      )}
      <View
        style={{
          padding: 5,
          width: "100%",
        }}
      >
        <View style={styles.flexContainer}>
          {days.map((item) => {
            return (
              <TouchableOpacity
                key={item.key}
                style={{
                  ...styles.day,
                  borderColor: day.includes(item.value) ? "blue" : "#333",
                  backgroundColor: day.includes(item.value) ? "#ddd" : "",
                }}
                onPress={() => markDay(item.value)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Button onPress={saveTopic} title="Add Topic" />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    lineHeight: 32,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    paddingLeft: 5,
  },
  day: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 20,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  timeComponent: {
    width: 100,
  },
});
