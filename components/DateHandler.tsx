import { TODAY } from "@/constants/days";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
export type dateHandler = {
  getDate: () => Date;
};
export const DateHandler = forwardRef((props: any, ref) => {
  const [date, setDate] = useState(TODAY);
  const buttonText = props.buttonText ?? "Enter Date!";
  const showMode = () => {
    if (Platform.OS === "android")
      DateTimePickerAndroid.open({
        value: date,
        onChange: (event: DateTimePickerEvent, date: Date | undefined) =>
          date && setDate(date),
        mode: "date",
      });
  };
  const getDate = () => date;
  useImperativeHandle(ref, () => ({
    getDate: () => getDate(),
  }));
  return (
    <View>
      <Text style={props?.textStyle}>{props.title}</Text>
      {Platform.OS === "web" ? (
        <input
          type="date"
          value={date.toISOString().substring(0, 10)}
          onChange={(e) => {
            setDate(new Date(e.target.value));
            props?.onChange(e.target.value);
          }}
          style={{ ...styles.dateHandler, ...props?.style }}
        />
      ) : (
        <CustomButton
          onPress={showMode}
          style={styles.dateHandler}
          title={date ? date.toISOString().substring(0, 10) : buttonText}
        />
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  dateHandler: {
    fontSize: 16,
    backgroundColor: "#2196f3",
    color: "white",
    fontWeight: 500,
    marginVertical: 5,
    padding: 5,
    borderWidth: 0,
  },
});
