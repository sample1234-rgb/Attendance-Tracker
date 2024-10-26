
import ModalView from "@/components/ModalView";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
  Switch,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import controller from "@/Controller/controller";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Stack, useNavigation, Link } from 'expo-router';
import Camera from "@/components/camera";
const days = [
  { name: "S", key: "0", value: "sunday" },
  { name: "M", key: "1", value: "monday" },
  { name: "T", key: "2", value: "tuesday" },
  { name: "W", key: "3", value: "wednesday" },
  { name: "T", key: "4", value: "thrusday" },
  { name: "F", key: "5", value: "friday" },
  { name: "S", key: "6", value: "saturday" },
];
export default function TimeTable() {
  const navigator= useNavigation();
  const [topicList, setTopicList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    navigator.setOptions({ title: "Time Table" });
    const day = days.find(
      (item) => item.key === new Date().getDay().toString()
    )?.value;
    controller
      .getAttendenceListByDay('monday')
      .then((res) => setTopicList(res));
  }, [isEnabled, navigator]);

  const change = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode:  'date' | 'time') => {
    if (Platform.OS === "android")
      DateTimePickerAndroid.open({
        value: date,
        onChange: change,
        mode: currentMode,
      });
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const autoIncrement = async () => {
    if (!isEnabled) {
      const promises = topicList.map((item: Object) =>
        controller.updateAttendence({ ...item, count: item?.count + 1 })
      );
      Promise.allSettled(promises)
        .then((results) => {
          let allUpdated = results.reduce((acc, res) => acc && res?.value, true);
          allUpdated && setIsEnabled(!isEnabled);
        })
        .catch((e) => console.error(e));
    } else setIsEnabled(!isEnabled);
  };
  return (
    <>
      <Text>TimeTable</Text>
      
      <Camera />
    </>
  );
}
const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  alignCenter: {
    alignContent: "center",
  },
  flexBox: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});
