import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomButton(props: any) {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      {...props}
      style={{ ...styles.button, ...props?.style }}
    >
      <Text style={{ ...styles.buttonText, ...props?.buttonText }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#2196f3",
  },
  buttonText: {
    alignSelf: "center",
    padding: 8,
    textTransform: "uppercase",
    fontWeight: 500,
    color: "white",
  },
});
