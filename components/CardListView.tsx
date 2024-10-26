import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import ModalView from "./ModalView";
import { Link } from 'expo-router';

export default function CardListView({ props, addAttendence }) {
  const { name: topicName, info: topicProp, time: topicDuration } = props;
  const [isAttended, setIsAttended] = useState(false);
  const pressHandler = async (item: Object) => {
    setIsAttended(await addAttendence({ ...item, count: item.count + 1 }));
    item.count += 1;
    setTimeout(() => setIsAttended(false), 5000);
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 5,
        borderBottomColor:'black',
        borderBottomWidth: 1,
        borderStyle: 'solid'
      }}
    >
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "black",
          width: "fit-content",
          padding: 10,
        }}
      >
        <Link href={{ pathname: 'lectureDetails', params: props }}>
          <Text>{topicName}</Text>
        </Link>
        <Text>
          {topicProp} <Text>{topicDuration}</Text>{" "}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#fa1bdc80",
          width: "fit-content",
          padding: 20,
          cursor: "pointer",
        }}
        onPress={() => pressHandler(props)}
        disabled={isAttended}
      >
        <Text>{props.count}</Text>
      </TouchableOpacity>
    </View>
  );
}
