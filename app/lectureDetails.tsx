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
  Alert,
  Pressable,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import controller from "@/Controller/controller";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useNavigation, Link } from "expo-router";
import days from "@/constants/days";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CalenderView from "@/components/CalenderView";

const daysOfWeek = days;

export default function LectureDetails() {
  const navigator = useNavigation();
  const [topic, setTopic] = useState(useLocalSearchParams());
  const [days, setDays] = useState(new Array<string>());
  const [editMode, setEditMode] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Add Start Time");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [mobileTime, setMobileTime] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [alertProps, setAlertProps] = useState({
    title: "Save Details",
    message: "Do you really want to update this item",
    options: [
      { text: "Yes", onPress: () => {} },
      { text: "No", onPress: () => {} },
    ],
  });

  useEffect(() => {
    if (topic) {
      navigator.setOptions({ title: topic.name });
      setDays(topic.days.toString().split(","));
      let time = topic.time.toString().split(" ~ ");
      const handleTime = (tiem: string) => {
        let t = tiem.substring(0, 2);
        if (tiem.substring(tiem.length - 2) === "AM" && t === "12") t = "00";
        else if (tiem.substring(tiem.length - 2) === "PM" && t !== "12")
          t = (parseInt(t) + 12).toString();
        tiem = t + tiem.substring(2, tiem.length - 2);
        return tiem.trim();
      };
      setStartTime(handleTime(time[0]));
      setEndTime(handleTime(time[1]));
      setInputVal(topic.info.toString());
    }
  }, [topic]);

  const toggleEditMode = (mode: Boolean) => setEditMode(mode.valueOf());
  const extractLocaleTime = (timeVar: String) => {
    return parseInt(timeVar?.substring(0, 2)) > 12
      ? (parseInt(timeVar?.substring(0, 2)) - 12).toString().padStart(2, "0") +
          timeVar?.substring(2) +
          " PM"
      : timeVar + " AM";
  };
  const alertHandler = (
    title: string,
    message: string,
    options: Array<Object>
  ) => {
    if (Platform.OS === "web") {
      setAlertProps({ title: title, message: message, options: options });
      setModalShow(true);
      return true;
    } else return Alert.alert(title, message, options);
  };
  const saveChanges = () => {
    // testing
    // const a = alertHandler(
    //   "Save Details",
    //   "Do you really want to update this item",
    //   [
    //     { text: "Yes", onPress: () => {} },
    //     { text: "No", onPress: () => {} },
    //   ]
    // );
    // console.log(a);

    const time =
      extractLocaleTime(startTime) + " ~ " + extractLocaleTime(endTime);
    const newTopic = { ...topic, name: inputVal, time: time, days: days };
    controller
      .updateAttendence(newTopic)
      .then((res) => {
        setTopic(newTopic); // bug
        toggleEditMode(false);
      })
      .catch((e) => console.error(e));
    toggleEditMode(false);
  };
  const revertChanges = () => {
    controller
      .getAttendence(topic.id.toString())
      .then((res) => {
        setTopic(res);
        toggleEditMode(false);
        setMobileTime(0);
      })
      .catch((e) => console.error(e));
  };
  const deleteHandler = () => {
    controller
      .deleteTopic(topic.id.toString())
      .then((res) => {
        navigator.goBack();
        toggleEditMode(false);
        setMobileTime(0);
      })
      .catch((e) => console.error(e));
  };
  const handleDay = (day: string) => {
    let newDays = days.includes(day)
      ? days.filter((item) => item !== day)
      : [...days, day];
    setDays(newDays);
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
  const typingHandler = (e: string) => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setInputVal(e);
      console.log(e);
    }, 500);
  };

  return (
    <>
      {editMode ? (
        <View
          style={{
            padding: 10,
            backgroundColor: "#abcdef80",
            margin: 5,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Course Title:</Text>
            <TextInput
              style={styles.textInput}
              value={topic.name.toString()}
              onChangeText={(e) => typingHandler(e)}
            />
          </View>
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Course Instuctor:</Text>
            <TextInput
              style={styles.textInput}
              value={inputVal}
              onChangeText={(e) => typingHandler(e)}
            />
          </View>
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Timings:</Text>
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
          </View>
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Attended: </Text>
            <TouchableOpacity><Text>{topic.count}</Text></TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.flexContainer,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.field}>Assigned: </Text>
            <View
              style={{
                padding: 5,
                width: "fit-content",
              }}
            >
              <View style={styles.flexContainer}>
                {daysOfWeek.map((item) => {
                  return (
                    <TouchableOpacity
                      key={(item) => item.key}
                      style={{
                        ...styles.day,
                        borderColor: days.includes(item.value)
                          ? "blue"
                          : "#333",
                        backgroundColor: days.includes(item.value)
                          ? "#ddd"
                          : "",
                      }}
                      onPress={() => handleDay(item.value)}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={{ ...styles.flexContainer, justifyContent: "flex-end" }}>
            <View style={{ marginLeft: 5 }}>
              <Button onPress={saveChanges} title="Save" />
            </View>
            <View style={{ marginLeft: 5 }}>
              <Button onPress={revertChanges} title="Cancel" />
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            padding: 5,
            backgroundColor: "#abcdef80",
            margin: 5,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Course Instuctor: </Text>
            <Text>{topic.info}</Text>
          </View>
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Timings: </Text>
            <Text>{topic.time}</Text>
          </View>
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Attended:</Text>
            <Text>{topic.count}</Text>
          </View>
          <View
            style={{
              ...styles.flexContainer,
              marginVertical: 10,
              alignItems:'center',
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.field}>Assigned: </Text>
            <View
              style={{
                padding: 5,
                width: "fit-content",
              }}
            >
              <View style={styles.flexContainer}>
                {daysOfWeek.map((item) => {
                  return (
                    <TouchableOpacity
                      key={(item) => item.key}
                      style={{
                        ...styles.day,
                        borderColor: days.includes(item.value)
                          ? "blue"
                          : "#333",
                        backgroundColor: days.includes(item.value)
                          ? "#ddd"
                          : "",
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={{ ...styles.flexContainer, justifyContent: "flex-end" }}>
            <View style={{ padding: 4 }}>
              <MaterialCommunityIcons
                name="application-edit-outline"
                size={24}
                color="black"
                onPress={() => toggleEditMode(true)}
              />
            </View>
            <View style={{ padding: 4 }}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color="red"
                onPress={deleteHandler}
              />
            </View>
          </View>
        </View>
      )}
      <CalenderView />
      <View>
        <View><Text>1</Text></View>
        <View><Text>2</Text></View>
      </View>
      <ModalView
        visible={modalShow}
        modalCloseHandler={() => setModalShow(false)}
      >
        <View style={{ padding: 5, margin: 5 }}>
          <Text>{alertProps?.message ?? "HI"}</Text>
          <View style={styles.flexContainer}>
            {alertProps?.options.map((option: Object, index: number) => (
              <Button
                key={(index) => index.toString()}
                onPress={option?.onPress}
                title={option?.title}
              />
            ))}
          </View>
        </View>
      </ModalView>
    </>
  );
}
const styles = StyleSheet.create({
  day: {
    width: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 20,
    margin: 2,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    paddingLeft: 5,
    marginHorizontal: 10,
  },
  timeComponent: {
    width: 100,
  },
  field: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
// useEffect(() => {
//     navigator.setOptions({ title: "Today's Schedule" });
//     const day = days.find(
//       (item) => item.key === new Date().getDay().toString()
//     )?.value;
//     controller
//       .getAttendenceListByDay(day)
//       .then((res) => setTopicList(res));
//   }, [isEnabled, navigator]);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     if (Platform.OS === "android")
//       DateTimePickerAndroid.open({
//         value: date,
//         onChange,
//         mode: currentMode,
//       });
//   };

//   const showDatepicker = () => {
//     showMode("date");
//   };
//   const autoIncrement = async () => {
//     if (!isEnabled) {
//       const promises = topicList.map((item) =>
//         controller.updateAttendence({ ...item, count: item.count + 1 })
//       );
//       Promise.allSettled(promises)
//         .then((results) => {
//           let allUpdated = results.reduce((acc, res) => acc && res.value, true);
//           allUpdated && setIsEnabled(!isEnabled);
//         })
//         .catch((e) => console.error(e));
//     } else setIsEnabled(!isEnabled);
//   };
//   const pressHandler = () => {
//     navigator.navigate('dummy');
//   }
/*
<>
      {topicList.length ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <Switch value={isEnabled} onValueChange={autoIncrement} />
          <GestureHandlerRootView
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              style={{ width: "100%" }}
              data={topicList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardListView
                  props={item}
                  addAttendence={controller.updateAttendence}
                />
              )}
            />
          </GestureHandlerRootView>

          {Platform.OS !== "web" && (
            <>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </>
          )}
          <Text>selected: {date.toLocaleString()}</Text>
          {Platform.OS === "web" && (
            <input type="date" onChange={(e) => console.log(e.target.value)} />
          )}
          <ModalView
            visible={modalShow}
            modalCloseHandler={() => setModalShow(false)}
          >
            <Form onSubmit={controller.saveTopic} />
          </ModalView>
          <Button onPress={() => setModalShow(true)} title="Add Lecture" />
          {/* <Link href={{ pathname: 'dummy' }}>Go to Details</Link> /}
        </View>
      ) : (
        <NotFound />
      )}
    </>
*/
