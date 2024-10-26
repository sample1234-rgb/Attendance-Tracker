import { StyleSheet, Text, Pressable, View } from "react-native";
import { useState } from "react";

export function Counter(min: number, max:number) {
  const [counter, setCounter] = useState(1);
  const inc = () => {
    setCounter(counter + 1);
  };
  const dec = () => {
    setCounter(counter - 1);
  };
  const min_limit = min ?? 0;
  const max_limit = max ?? 100;
  const getValue = () => {
    return counter;
  };
  return (
    <Text style={styles.counter}>
      <Pressable
        style={{ ...styles.counterItem, ...styles.counterItemButton }}
        onPress={dec}
        disabled={counter == min_limit}
      >
        -
      </Pressable>
      <Text style={{ ...styles.counterItem, ...styles.counterValue }}>
        {counter}
      </Text>
      <Pressable
        style={{ ...styles.counterItem, ...styles.counterItemButton }}
        onPress={inc}
        disabled={counter == max_limit}
      >
        +
      </Pressable>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
  counter: {
    display: "flex",
    color: "#fff",
    borderWidth: 2,
    textAlign: "center",
    borderStyle: "solid",
    borderRadius: 5,
    overflow: "hidden",
  },
  counterItem: {
    padding: 5,
    width: 30,
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  counterItemButton: {
    cursor: "pointer",
  },
  counterValue: {
    borderLeftWidth: 1,
    borderStyle: "solid",
    borderLeftColor: "black",
    borderRightWidth: 1,
    borderRightColor: "black",
  },
});
