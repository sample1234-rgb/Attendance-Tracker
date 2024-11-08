import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {filterBoxStyles} from '../assets/styles';
export default function FilterBox({ listOfItems = [], children }) {
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
      <View style={filterBoxStyles.flexBox}>
        {/* <slot name="flexItems"></slot> */}
        {children
          ? children
          : items.map((item) => (
              <TouchableOpacity
                style={filterBoxStyles.flexItem}
                onPress={() => markActive(item.key)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
      </View>
    </>
  );
}

