import CardListView from "@/components/CardListView";
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
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import NotFound from "@/components/notFound";
import Form from "@/components/Form";
import { Stack, useNavigation, Link } from "expo-router";
import HeaderComp from "./header";
import Topic from "@/constants/DBClass";
import days from "@/constants/days";

export default function Index() {
  const navigator = useNavigation();
  const [topicList, setTopicList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    navigator.setOptions({ title: "Today's Schedule" });
    const day = days.find(
      (item) => item.key === new Date().getDay().toString()
    )?.value;
    controller
      .getAttendenceListByDay(day)
      .then((res) => setTopicList(res));
  }, [isEnabled, navigator]);

  const change = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    if (Platform.OS === "android")
      DateTimePickerAndroid.open({
        value: date,
        onChange: change,
        mode: currentMode,
      });
  };

  const showDatepicker = () => showMode("date");

  const autoIncrement = async () => {
    if (!isEnabled) {
      const promises = topicList.map((item: Topic) => {
        const d = new Date().toISOString().substring(0, 10);
        const newItem = { ...item };
        if (canAddDate(item, d)) {
          newItem.count += 1;
          newItem.markedDates = [...item.markedDates, d];
        }
        controller.updateAttendence(newItem);
      });
      Promise.allSettled(promises)
        .then((results) => {
          let allUpdated = results.reduce(
            (acc, res) => acc && res?.value,
            true
          );
          allUpdated && setIsEnabled(!isEnabled);
        })
        .catch((e) => console.error(e));
    } else setIsEnabled(!isEnabled);
  };

  const pressHandler = () => navigator.navigate('dummy'); 

  const canAddDate = (topic: Topic, date: string) => {
    const newDayNumber = new Date(date).getDay().toString();
    const newDay = days.filter((day) => day.key === newDayNumber)[0].value;
    return new Boolean(topic.days.includes(newDay));
  };

  const markAbsent = () => {
    const promises = topicList.map((item: Topic) => {
      const d = new Date().toISOString().substring(0, 10);
      const newItem = { ...item };
      if (canAddDate(item, d)) newItem.missedDates = [...item.missedDates, d];
      controller.updateAttendence(newItem);
    });
    Promise.allSettled(promises)
      .then(results => {
        let allUpdated = results.reduce((acc: Boolean, res) => acc && res?.value, true);
        allUpdated && setIsEnabled(!isEnabled);
      })
      .catch((e) => console.error(e));
  };
  // markAbsent();
  return (
    <>
      <HeaderComp />
      {topicList.length ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <Switch value={isEnabled} onValueChange={autoIncrement} />
          <GestureHandlerRootView style={styles.flexBox}>
            <FlatList
              style={{ width: "100%" }}
              data={topicList}
              keyExtractor={(item: Topic) => item.id}
              renderItem={({ item }) => (
                <CardListView
                  props={item}
                  addAttendence={controller.updateAttendence}
                />
              )}
            />
          </GestureHandlerRootView>

          {Platform.OS === "web" ? (
            <>
              <input
                type="date"
                onChange={(e) => console.log(e.target.value)}
              />
            </>
          ) : (
            <>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </>
          )}
          <Text>selected: {date.toLocaleString()}</Text>

          <ModalView
            visible={modalShow}
            modalCloseHandler={() => setModalShow(false)}
          >
            <Form onSubmit={controller.saveTopic} />
          </ModalView>
          <Button onPress={() => setModalShow(true)} title="Add Lecture" />
          <Link href={{ pathname: "/timetable" }}>Go to Timetable</Link>
        </View>
      ) : (
        <NotFound />
      )}
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
  },
});
