import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useLayoutEffect, useState } from "react";
import ModalView from "./ModalView";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { filterBoxStyles } from "@/assets/styles";
import Topic from "@/constants/DBClass";

interface funct {
  props: Object;
  addAttendence: any;
}

export default function CardListView({ props, addAttendence }) {
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
        .then((res) => {
          setItemCount(itemCount + 1);
          setCurrStyle({...styles.Counter,...styles.ActiveCounter});
          setCurrTextStyle({...styles.CounterText,...styles.ActiveCounterText});
        })
        .catch((e) => console.error(e))
    );
    setTimeout(() => setIsAttended(false), 5000);
  };
  return (
    <View style={styles.LectorItem}>
      <View style={styles.infoPanel}>
        <Link href={{ pathname: "/lectureDetails", params: props }}>
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
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    // borderWidth: 1,
    // marginBottom: 5,
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
    backgroundColor: "#4be35180",
  },
  MissedCounterText: {
    color: "red",
  },
});
