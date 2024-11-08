import { filterBoxStyles } from "@/assets/styles";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

export default function CustomTextInput({
  hasText = true,
  textMessage = "As Extra",
  textStyles = {},
  checkBoxStyle = {},
}) {
  const [isChecked, setIsChecked] = useState(0);
  const flexstyles = {
    ...filterBoxStyles.flexContainer,
    ...filterBoxStyles.alignCenter,
  };
  return (
    <View>
      { hasText && (
        <Text style={{ ...checkBoxStyles.text, ...textStyles }}>
          {textMessage}
        </Text>
      ) }
      <TextInput style={{}}/>
    </View>
  );
}

const checkBoxStyles = StyleSheet.create({
  checkBox: {
    borderWidth: 2,
    width: 15,
    height: 15,
  },
  text: {},
});
