import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export default function UserForm({ onSubmit }: { onSubmit: any }) {
  let newTopic = {
    name: "",
    info: "",
    timing: "",
  };
  // const [buttonTitle, setButtonTitle] = useState("Add Start Time");
  // const [startTime, setStartTime] = useState("09:00");
  // const [endTime, setEndTime] = useState("17:00");
  // const [mobileTime, setMobileTime] = useState(0);
  // const [day, setDay] = useState(new Array<string>());
  const [date, setDate] = useState(new Date());
  // const markDay = (selected: string) => {
  //   let newDays = day.includes(selected)
  //     ? day.filter(item => item !== selected)
  //     : [...day, selected];
  //   setDay(newDays);
  // };
  // function extractLocaleTime(timeVar: String) {
  //   return parseInt(timeVar?.substring(0, 2)) > 12
  //     ? (parseInt(timeVar?.substring(0, 2)) - 12).toString().padStart(2, "0") +
  //         timeVar?.substring(2) +
  //         " PM"
  //     : timeVar + " AM";
  // }
  const saveTopic = () => {};
  const resetState = () => {
    newTopic.name = newTopic.info = newTopic.timing = "";
  };
  // const showMode = () => {
  //   if (Platform.OS === "android")
  //     DateTimePickerAndroid.open({
  //       is24Hour: false,
  //       onChange: (e, val) => {
  //         let time = `${val?.getHours()}:${val?.getMinutes()}`;
  //         if (mobileTime === 0) {
  //           setStartTime(time);
  //           setMobileTime(mobileTime + 1);
  //           setButtonTitle("Add End Time");
  //         } else if (mobileTime === 1) {
  //           setEndTime(time);
  //           setMobileTime(mobileTime + 1);
  //           setButtonTitle(`${startTime}~${endTime}`);
  //         }
  //       },
  //       mode: "time",
  //       value: new Date(),
  //     });
  // };

  const showMode = () => {
    if (Platform.OS === "android")
      DateTimePickerAndroid.open({
        value: date,
        onChange: (event: DateTimePickerEvent, selectedDate: Date) => setDate(selectedDate),
        mode: "date",
      });
  };

  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 24 }}><center>Register</center></Text>
      <Text>First Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="first name"
        onChangeText={(e) => (newTopic.name = e)}
      />
      <Text>Last Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="last name"
        // value={newTopic.info}
        onChangeText={(e) => (newTopic.info = e)}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="email@email.com"
        // value={newTopic.info}
        onChangeText={(e) => (newTopic.info = e)}
      />
      <Text>contact Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Mobile Number"
        // value={newTopic.info}
        onChangeText={(e) => (newTopic.info = e)}
      />
      <Text>Enter Password:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="password"
        // value={newTopic.info}
        onChangeText={(e) => (newTopic.info = e)}
      />
      <Text>Re-enter Password:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="password"
        // value={newTopic.info}
        onChangeText={(e) => (newTopic.info = e)}
      />
      <View>
        <Text>Date of Birth:</Text>
        {Platform.OS === "web" ? (
          <>
            <input type="date" onChange={(e) => console.log(e.target.value)} />
          </>
        ) : (
          <>
            <Button onPress={showMode} title="Enter date!" />
          </>
        )}
        <Text>selected: {date.toLocaleString()}</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Button onPress={saveTopic} title="Register" />
      </View>
    </View>
  );
}
export function UserLoginForm({ onSubmit }: { onSubmit: any }) {
  let newLogin = { id: "", password: "" };
  // const [userCred, setUserCred] = useState(null);
  let isError =
    newLogin === null || newLogin.id === "" || newLogin.password === "";
  // useEffect(()=> {isError = newLogin.id === '' || newLogin.password === ''},[]);
  const doLogin = () => onSubmit(newLogin);
  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 24 }}>
        <center>Sign in</center>
      </Text>

      <View style={{ marginTop: 10 }}>
        <Text>username / Email:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(e) => (newLogin.id = e)}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>Enter Password:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="password"
          keyboardType="visible-password"
          onChangeText={(e) => (newLogin.password = e)}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button onPress={doLogin} title="Sign In" />
      </View>
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
