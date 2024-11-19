import { Text, View, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useLayoutEffect, useState } from "react";
import ModalView from "./ModalView";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { filterBoxStyles } from "@/assets/styles";
import Topic from "@/constants/DBClass";
import { TODAY } from "@/constants/days";
/* TODO fix any */
interface funct {
  props: any;
  addAttendence: any;
  onUpdate: any;
}

export default function CardListView({
  props,
  addAttendence,
  onUpdate,
}: funct) {
  const RefreshTime = 24 * 60 * 60 * 100;
  const { name: topicName, info: topicProp, time: topicDuration } = props;
  const [isAttended, setIsAttended] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [currStyle, setCurrStyle] = useState(styles.Counter);
  const [currTextStyle, setCurrTextStyle] = useState(styles.CounterText);
  useLayoutEffect(() => {
    setItemCount(parseInt(props.markedDates.toString().split(",").length));
  }, []);
  const pressHandler = async (item: Topic) => {
    setIsAttended(
      await addAttendence({
        ...item,
        markedDates: [
          ...item?.markedDates,
          new Date().toISOString().substring(0, 10),
        ],
      })
        .then((res: boolean) => {
          if (res) {
            setItemCount(itemCount + 1);
            setCurrStyle({ ...styles.Counter, ...styles.ActiveCounter });
            setCurrTextStyle({
              ...styles.CounterText,
              ...styles.ActiveCounterText,
            });
            onUpdate("success");
          }
          return false;
        })
        .catch((e: any) => {
          onUpdate("error", e);
          console.error(e);
          return true;
        })
    );
    /* TODO fix any */
    // automaticHandler();
    setTimeout(() => setIsAttended(true), RefreshTime);
  };
  const automaticHandler = () => {
    let t = new Date(
      `${TODAY.getFullYear()}-${(TODAY.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${TODAY.getDate()
        .toString()
        .padStart(2, "0")}T${topicDuration
        .toString()
        .split(" ~ ")[1]
        .substring(0, 5)}Z`
    );
    let tt = TODAY.valueOf() - t.valueOf();
    if (tt < 0) {
      setCurrStyle({ ...styles.Counter, ...styles.MissedCounter });
      setCurrTextStyle({ ...styles.CounterText, ...styles.MissedCounterText });
    }
  };
  return (
    <View style={styles.LectorItem}>
      <View style={styles.infoPanel}>
        <Link href={{ pathname: "/lectureDetails", params: props.id }}>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {topicName}
          </Text>
        </Link>
        <Text style={styles.fontSize12}>
          {topicProp}
          {"  "}
          <Text style={styles.fontSize12}>
            <View>
              <MaterialCommunityIcons
                name="clock-time-nine-outline"
                size={12}
                color="black"
              />
            </View>{" "}
            {topicDuration}{" "}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        style={currStyle}
        onPress={() => pressHandler(props)}
        disabled={isAttended}
      >
        <Text style={currTextStyle}>{itemCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fontSize12: {
    fontSize: 12,
  },
  infoPanel: {
    flex: 1,
    // borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 10,
    ...filterBoxStyles.fitContentWidth,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#f0f00f50",
  },
  LectorItem: {
    ...filterBoxStyles.flexContainer,
    ...filterBoxStyles.alignCenter,
    justifyContent: "space-between",
    padding: 5,
  },
  Counter: {
    backgroundColor: "#a4a4a480",
    ...filterBoxStyles.fitContentWidth,
    padding: 20,
    cursor: "pointer",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  CounterText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  ActiveCounter: {
    backgroundColor: "#4be35180",
  },
  ActiveCounterText: {
    color: "green",
  },
  MissedCounter: {
    backgroundColor: "#ff454580",
  },
  MissedCounterText: {
    color: "red",
  },
});
