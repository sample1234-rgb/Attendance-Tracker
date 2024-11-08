import { filterBoxStyles } from "@/assets/styles";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function CheckBox({
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
      <TouchableOpacity
        style={flexstyles}
        onPress={() => setIsChecked(~isChecked)}
      >
        <input
          type="checkbox"
          style={{...checkBoxStyles.checkBox, ...checkBoxStyle}}
          value={isChecked}
          onClick={e => setIsChecked(e.target?.checked)}
        />
        { hasText && (
          <Text style={{ ...checkBoxStyles.text, ...textStyles }}>
            {textMessage}
          </Text>
        ) }
      </TouchableOpacity>
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
