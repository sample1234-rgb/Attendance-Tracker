import days, { Day } from "@/constants/days";
import { View, Text } from "react-native";
export default function HeaderComp() {
  const today = new Date();
  const t =
    days.find((day: Day) => day.key === today.getDay().toString())?.value ??
    "funday";
  const dayOfWeek = t?.substring(0, 1).toUpperCase() + t?.substring(1);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: "#ff330050",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            padding: 10,
            margin: 5,
            backgroundColor: "#ffd0fa",
            borderRadius: 8,
            width: 37,
          }}
        >
          {today.getDate().toString().padStart(2, "0")}
        </Text>
        <Text
          style={{
            fontSize: 12,
            padding: 5,
            margin: 5,
            backgroundColor: "#ff00ee",
            borderRadius: 20,
            left: -20,
            zIndex: 2,
          }}
        >
          {today.toString().substring(4, 7)}
        </Text>
      </View>
      <Text> | </Text>
      <Text> {dayOfWeek}</Text>
        <View>
          <View
            style={{
              borderWidth: 1,
              width: 50,
              borderRadius: 50,
              overflow: "hidden",
            }}
          ></View>
        </View>
    </View>
  );
}
