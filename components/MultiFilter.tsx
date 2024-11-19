import { createRef, useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
interface FilterStyles {
  setBgColor: string;
  unsetBgColor: string;
  setBdColor: string;
  unsetBdColor: string;
}
export default function MultiFilter({
  listOfItems,
  gap = 2,
  customStyle = {
    setBgColor: "blue",
    unsetBgColor: "#333",
    setBdColor: "#ddd",
    unsetBdColor: "",
  },
  editMode = true,
}: {
  listOfItems: Array<any>;
  gap: number;
  customStyle: FilterStyles;
  editMode?: boolean;
}) {
  const [isSelected, setIsSelected] = useState(new Array<string>());
  const [bdcolorSet, bdcolorUnset] = [
    customStyle.setBgColor,
    customStyle.unsetBgColor,
  ]; // TODO: make it dynamic
  const [bgcolorSet, bgcolorUnset] = [
    customStyle.setBdColor,
    customStyle.unsetBdColor,
  ]; // TODO: make it dynamic
  const _MultiFilterRef = createRef<View>();
  const pressHandler = (key: string) => {
    if (editMode)
      setIsSelected(
        isSelected.includes(key)
          ? isSelected.filter((item) => item !== key)
          : [...isSelected, key]
      );
  };
  const getFilteredItems = () => isSelected; // need to pass to parent
  return (
    <View style={styles.boxContainer} ref={_MultiFilterRef}>
      <View style={styles.flexContainer}>
        {listOfItems.map((item: string, index: number) => {
          return (
            <Pressable
              key={item}
              style={{
                ...styles.item,
                borderColor: isSelected.includes(item)
                  ? bdcolorSet
                  : bdcolorUnset,
                backgroundColor: isSelected.includes(item)
                  ? bgcolorSet
                  : bgcolorUnset,
                marginRight: index === listOfItems.length - 1 ? 0 : gap,
              }}
              onPress={() => pressHandler(item)}
            >
              <Text style={{ alignSelf: "center" }}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    width: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 20,
    margin: 2,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  boxContainer: {
    padding: 5,
    width: "fit-content",
  },
});
