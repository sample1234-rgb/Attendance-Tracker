import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { useEffect, useRef, useState } from "react";
import { TODAY, User, UserRegister } from "@/constants/days";
import { TextInputBox } from "./TextInputBox";
import { DateHandler, dateHandler } from "./DateHandler";
import CustomButton from "./CustomButton";
import { Topic } from "@/constants/DBClass";

export default function UserForm({ onSubmit, changeRequest }: { onSubmit: any, changeRequest: any }) {
  let newUser = {
    firstName: "",
    lastName: "",
    password: "",
    dob: Platform.OS === "web" ? TODAY.toISOString().substring(0, 10) : "",
    email: "",
    contact: "",
  };
  const safeStyles = {
    firstName: styles.textInput,
    lastName: styles.textInput,
    password: styles.textInput,
    dob: styles.textInput,
    email: styles.textInput,
    contact: styles.textInput,
  };
  const [errorList, setErrorList] = useState(safeStyles);
  let confirmPass = "";
  const saveTopic = () => {
    Object.entries(newUser).some((key) => {
      if (key[1].length === 0) {
        console.error("Error Detected", key);
        errorList[key[0]] = {
          ...errorList[key[0]],
          ...styles.error,
        };
        setErrorList({ ...errorList });
        return;
      }
    });
    if (newUser.password !== confirmPass) {
      errorList.password = {
        ...errorList.password,
        ...styles.error,
      };
      setErrorList({ ...errorList });
      return;
    }
    let age =
      new Date(
        TODAY.getTime() - new Date(newUser.dob).getTime()
      ).getUTCFullYear() - 1970;

    onSubmit({
      ...newUser,
      age: age,
      type: "user",
      courses: new Array<number>(),
      id: "",
    });
  };
  const resetState = () => {
    Object.values(newUser).forEach((value) => (value = ""));
    setErrorList(safeStyles);
  };
  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>Register</Text>
      <TextInputBox
        Label="First Name: "
        style={errorList.firstName}
        placeholder="first name"
        onChangeText={(e: string) => (newUser.firstName = e)}
        selectTextOnFocus
      />
      <TextInputBox
        Label="Last Name:"
        style={errorList.lastName}
        placeholder="last name"
        onChangeText={(e: string) => (newUser.lastName = e)}
      />
      <TextInputBox
        Label="Email:"
        style={errorList.email}
        placeholder="email@email.com"
        onChangeText={(e: string) => (newUser.email = e)}
      />
      <TextInputBox
        Label="Contact Number:"
        style={errorList.contact}
        placeholder="xxx-xxx-xxxx"
        onChangeText={(e: string) => (newUser.contact = e)}
      />
      <TextInputBox
        Label="Enter Password:"
        style={errorList.password}
        placeholder="password"
        type="password"
        onChangeText={(e: string) => (newUser.password = e)}
      />
      <TextInputBox
        Label="Re-enter Password:"
        style={styles.textInput}
        placeholder="password"
        type="password"
        onChangeText={(e: string) => (confirmPass = e)}
      />
      <DateHandler
        title="Date of Birth:"
        style={{ backgroundColor: "", color: "black", borderWidth: 1 }}
        onChange={(e: string) => (newUser.dob = e)}
      />
      <CustomButton
        onPress={saveTopic}
        title="Register"
        style={{ marginTop: 20 }}
      />
      <Text>Already have an account ? <Text style={styles.link} onPress={changeRequest}>Sign in</Text></Text>
    </View>
  );
}
export function UserLoginForm({ onSubmit, changeRequest }: { onSubmit: any, changeRequest: any }) {
  let newLogin = { id: "", password: "" };
  let isError =
    newLogin === null || newLogin.id === "" || newLogin.password === "";
  const doLogin = () => onSubmit(newLogin);
  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>Sign in</Text>
      <View style={{ marginTop: 10 }}>
        <TextInputBox
          Label="Username / Email:"
          style={styles.textInput}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(e: string) => (newLogin.id = e)}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInputBox
          Label="Enter Password:"
          style={styles.textInput}
          placeholder="password"
          keyboardType="visible-password"
          type="password"
          onChangeText={(e: string) => (newLogin.password = e)}
        />
      </View>
      <CustomButton
        onPress={doLogin}
        title="Sign In"
        style={{ marginTop: 20 }}
      />
      <Text>Didn't have an account ? <Text style={styles.link} onPress={changeRequest}>Create new</Text></Text>
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
    width: "100%",
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
  error: {
    color: "red",
    borderColor: "red",
    scaleX: 1.05,
  },
  link: {
    textDecorationLine:"underline",
    color: 'grey',
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: 10,
  }
});
