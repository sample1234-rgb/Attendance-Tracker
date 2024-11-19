import CardListView from "@/components/CardListView";
import ModalView from "@/components/ModalView";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, Switch, Text, Alert } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import controller from "@/Controller/controller";
import NotFound from "@/components/notFound";
import { useNavigation, Link } from "expo-router";
import HeaderComp from "./header";
import { Topic, UserCred, User } from "@/constants/DBClass";
import days, { TODAY } from "@/constants/days";
import UserForm, { UserLoginForm } from "@/components/UserForm";
import { filterBoxStyles } from "@/assets/styles";
import { Toast, toast } from "@/components/Toast";
import Divider from "@/components/Divider";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  const navigator = useNavigation();
  const [topicList, setTopicList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastRef = useRef<toast>();

  useEffect(() => {
    navigator.setOptions({ title: "Today's Schedule" });
    const day = days.find(
      (item) => item.key === new Date().getDay().toString()
    )?.value;
    controller
      .getAttendenceListByDay("monday")
      .then((res) => {
        setTopicList(res);
        setToastMessage("Successful");
        toastRef.current?.open("success");
      })
      .catch((e) => {
        setToastMessage(e);
        toastRef.current?.open("error");
      });
  }, [isEnabled]);

  const autoIncrement = async () => {
    if (!isEnabled) {
      const promises = topicList.map((item: Topic) => {
        const d = TODAY.toISOString().substring(0, 10);
        if (canAddDate(item, d)) item.markedDates.push(d);
        return controller.updateAttendence(item);
      });
      Promise.allSettled(promises)
        .then((results) => {
          let allUpdated = results.reduce(
            (acc, res: any) => acc && res?.value,
            true
          );
          allUpdated && setIsEnabled(!isEnabled);
        })
        .catch((e) => console.error(e));
    } else setIsEnabled(!isEnabled);
  };
  const updateAttendence = (status: string, message?: string) => {
    switch (status) {
      case "success":
        setToastMessage("Successful");
        toastRef.current?.open("success");
        break;
      case "error":
        setToastMessage(message ?? '');
        toastRef.current?.open("error");
        break;
      default:
        break;
    }
  };
  const canAddDate = (topic: Topic, date: string) => {
    const newDayNumber = new Date(date).getDay().toString();
    const newDay = days.filter((day) => day.key === newDayNumber)[0].value;
    return newDay && !topic.days.includes(date);
  };

  const markAbsent = () => {
    const promises = topicList.map((item: Topic) => {
      const d = new Date().toISOString().substring(0, 10);
      const newItem = { ...item };
      if (canAddDate(item, d)) newItem.missedDates = [...item.missedDates, d];
      return controller.updateAttendence(newItem);
    });
    Promise.allSettled(promises)
      .then((results) => {
        let allUpdated = results.reduce(
          (acc: Boolean, res: any) => acc && res?.value,
          true
        );
        allUpdated && setIsEnabled(!isEnabled);
      })
      .catch((e) => console.error(e));
  };
  const login = async (userCred: UserCred) => {
    await controller
      .login(userCred)
      .then((resp) =>
        controller
          .getUser(resp)
          .then((res) => {
            setUser(res);
            setModalShow(false);
            toastRef.current?.open("success");
            // localStorage.setItem("user", JSON.stringify(res));
          })
          .catch((e) => console.error(e))
      )
      .catch((e) => console.error(e));
  };
  const signUp = async (userCred: User) => {
    await controller
      .generateUID()
      .then((res) => (userCred.id = (res + 1).toString()))
      .catch((e) => console.error(e));
    await controller
      .createUser(userCred)
      .then((res) => {
        setUser(userCred);
        setModalShow(!res);
        toastRef.current?.open("success");
        // localStorage.setItem("user", JSON.stringify(userCred));
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      <HeaderComp />
      {topicList.length ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              ...filterBoxStyles.flexContainer,
              justifyContent: "space-between",
              marginHorizontal: 5,
            }}
          >
            <Link href={{ pathname: "/timetable" }}>Go to Timetable</Link>
            <Switch value={isEnabled} onValueChange={autoIncrement} />
          </View>
          <GestureHandlerRootView style={styles.flexBox}>
            <FlatList
              style={{ width: "100%" }}
              data={topicList}
              keyExtractor={(item: Topic) => item.id}
              renderItem={({ item }) => (
                <CardListView
                  props={item}
                  addAttendence={controller.updateAttendence}
                  onUpdate={updateAttendence}
                />
              )}
              ItemSeparatorComponent={() => <Divider />}
              ListFooterComponent={() => <Divider />}
              ListHeaderComponent={() => <Divider />}
            />
          </GestureHandlerRootView>
          <ModalView
            visible={modalShow}
            modalCloseHandler={() => setModalShow(false)}
          >
            {/* <Form onSubmit={controller.saveTopic} /> */}
            {isLogin ? (
              <UserLoginForm
                onSubmit={login}
                changeRequest={() => setIsLogin(false)}
              />
            ) : (
              <UserForm
                onSubmit={signUp}
                changeRequest={() => setIsLogin(true)}
              />
            )}
          </ModalView>
          <CustomButton
            title="Add Lecture"
            onPress={() => setModalShow(true)}
          />
          <Toast ref={toastRef}>
            <Text>{toastMessage}</Text>
          </Toast>
        </View>
      ) : (
        <NotFound />
      )}
      {user && (
        <CustomButton
          onPress={() => setModalShow(true)}
          title="Sign In / Sign Up"
        />
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
    marginTop: 5,
  },
});
