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
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import NotFound from "@/components/notFound";
import Form from "@/components/Form";
import { Stack, useNavigation, Link } from "expo-router";
import HeaderComp from "./header";
import Topic from "@/constants/DBClass";
import days, { User } from "@/constants/days";
import UserForm, { UserLoginForm } from "@/components/UserForm";
import MultiFilter from "@/components/MultiFilter";
interface UserCred {
  id: string;
  password: string;
}
export default function Index() {
  const navigator = useNavigation();
  const [topicList, setTopicList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    navigator.setOptions({ title: "Today's Schedule" });
    const day = days.find(
      (item) => item.key === new Date().getDay().toString()
    )?.value;
    controller
      .getAttendenceListByDay('monday')
      .then((res) => setTopicList(res));
  }, [isEnabled, navigator]);

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

  // const pressHandler = () => navigator.navigate('/dummy');

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
      .then((results) => {
        let allUpdated = results.reduce(
          (acc: Boolean, res) => acc && res?.value,
          true
        );
        allUpdated && setIsEnabled(!isEnabled);
      })
      .catch((e) => console.error(e));
  };
  // markAbsent();
  const login = async (userCred: UserCred) => {
    await controller
      .login(userCred)
      .then((res) =>
        controller
          .getUser(res)
          .then((res) => {
            setUser(res);
            setModalShow(false);
          })
          .catch((e) => console.error(e))
      )
      .catch((e) => console.error(e));
    // console.table(user);
  };
  const signUp = async (userCred: User) => {
    await controller
      .createUser(userCred)
      .then((res) => setUser(userCred))
      .catch((e) => console.error(e));
    console.table(user);
  };
  // login({
  //   password: "admin",
  //   id: "superadmin@hello.in",
  // });
  // signUp({
  //   id: "3",
  //   firstName: "Aadmin",
  //   password: "Aadmin",
  //   type: "admin",
  //   lastName: "",
  //   age: 1,
  //   courses: [0, 1],
  //   dob: "01-02-3456",
  //   email: "AAsuperadmin@hello.in",
  //   username: "sAuper-admin",
  //   contact: "1234567891",
  // })
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

          <ModalView
            visible={modalShow}
            modalCloseHandler={() => setModalShow(false)}
          >
            <Form onSubmit={controller.saveTopic} />
            {/* <UserLoginForm onSubmit={login} /> */}
          </ModalView>
          {/* <MultiFilter listOfItems={['1','2','3']}/> */}
          <Button onPress={() => setModalShow(true)} title="Add Lecture" />
          <Link href={{ pathname: "/timetable" }}>Go to Timetable</Link>
          {user === null && (
            <Button
              onPress={() => setModalShow(true)}
              title="Sign In / Sign Up"
            />
          )}
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
