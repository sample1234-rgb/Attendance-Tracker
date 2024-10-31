import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FilterBox({ listOfItems = [], children = undefined }) {
  // const [items, setItems] = useState([]);
  const [active, setActive] = useState("1");
  // useEffect(() => setItems(listOfItems), []);
  const items = [
    { key: "1", name: "Hi" },
    { key: "2", name: "Bob" },
  ];
  const markActive = (id: string) => setActive(id);
  return (
    <>
      <View style={styles.flexBox}>
        {/* <slot name="flexItems"></slot> */}
        {children
          ? children
          : items.map((item) => (
              <TouchableOpacity
                style={styles.flexItem}
                onPress={() => markActive(item.key)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  flexBox: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 5,
  },
  flexItem: {
    padding: 5,
    cursor: "pointer",
    backgroundColor: "white",
  },
});
