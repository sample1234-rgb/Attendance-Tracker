import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { createRef, useEffect, useState } from "react";
import { filterBoxStyles } from "@/assets/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type Rule = {
  rule: string;
  criterion: number | string | any;
  acceptedMessage: string;
  errorMessage?: string;
};
const specialKeys = [
  "Backspace",
  "Delete",
  "Alt",
  "Control",
  "Shift",
  "PageDown",
  "PageUp",
  "End",
  "Home",
  "Tab",
  "Insert",
  "ScrollLock",
  "Pause",
  "CapsLock",
  "Enter",
];
export function TextInputBox(props: any) {
  const [textValue, setTextValue] = useState("");
  const [error, setError] = useState({ message: "" });
  const [showPassword, setShowPassword] = useState(
    (props.hasOwnProperty("type") && props.type === "password") ?? false
  );
  const [textBoxSyles, setTextBoxSyles] = useState(styles.textBox);
  const _TextInputRef = createRef();

  const pressHandler = (e: string) => {
    if (props.rules)
      props.rules.forEach((rule: Rule) => {
        let errorMessage = "";
        switch (rule.rule) {
          case "maxLength":
            errorMessage =
              textValue.length > rule.criterion ? "Max length exceeded." : "";
            break;
          case "minLength":
            errorMessage =
              textValue.length < rule.criterion ? "Min length required." : "";
            break;
          case "pattern":
            errorMessage =
              rule.criterion.test(e) ?? false ? "Pattern not matched." : "";
            break;
          default:
            errorMessage = "";
            break;
        }
        setTextBoxSyles(
          errorMessage
            ? { ...styles.textBox, ...styles.textError }
            : styles.textBox
        );
        setError({ message: errorMessage });
      });
    const text = keyPressHandler(e);
    setTextValue(text);
    props?.onChangeText(text);
  };
  const keyPressHandler = (e: string) => {
    // if (specialKeys.includes(e.key)) return;
    let temp = true;
    let regex;
    if (props.hasOwnProperty("type"))
      switch (props.type) {
        case "number":
          regex = /^[0-9]$/;
          temp = regex.test(e);
          break;
        case "alphanumeric":
          regex = /^[a-zA-Z0-9]$/;
          temp = regex.test(e);
          break;
        case "phone":
          regex = /^\d{1,10}$/;
          temp = regex.test(e);
          break;
        case "email":
          regex = /^[a-zA-Z0-9.]@[a-zA-Z].[a-zA-Z]{1,}$/;
          temp = regex.test(e);
          break;
        default:
          break;
      }
    return e.length && !temp ? e.substring(0, textValue.length - 1) : e;
  };
  return (
    <View>
      {props.hasOwnProperty("Label") && (
        <View>
          <Text style={styles.textLabel}>{props.Label}</Text>
        </View>
      )}
      <View style={{...filterBoxStyles.flexContainer, flexWrap:'nowrap', alignItems:'baseline'}}>
        <TextInput
          ref={_TextInputRef}
          style={textBoxSyles}
          value={textValue}
          {...props}
          secureTextEntry={showPassword}
          onChangeText={pressHandler}
        />
        {props.type === "password" && (
          <TouchableOpacity
            style={{ borderWidth: 1, height: "100%" }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={
                showPassword ? "application-edit-outline" : "application-edit"
              }
              size={20}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      {error.message.length > 0 && (
        <View style={styles.errorBlock}>
          <Text style={styles.errorMessage}>{error.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: {
    paddingLeft: 5,
    paddingVertical: 2,
    width: '100%',
    fontSize:20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  textError: {
    borderColor: "red",
  },
  textBlock: {},
  textLabel: {},
  errorBlock: {},
  errorMessage: {
    color: "red",
    fontWeight: "700",
  },
});
