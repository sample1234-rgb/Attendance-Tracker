import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";

export function TextInputBox() {
  const [textValue, setTextValue] = useState('');
  const textBoxSyles = {...styles.textBox};
  return (
    <View>
      <TextInput style={textBoxSyles} onKeyPress={(e) => setTextValue(e.target.value)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
    color: 'white',
    borderStyle:'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
});
