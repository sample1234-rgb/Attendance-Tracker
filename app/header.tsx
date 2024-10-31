import { View,Text } from "react-native";
export default function HeaderComp() {
    const today = new Date();
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
          }}
        >
          {today.getDate()}
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
          {today.getMonth()+1}
        </Text>
      </View>
      <Text> | </Text>
      <Text> {today.getDay()}</Text>
    </View>
  );
}
