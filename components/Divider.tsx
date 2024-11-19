import { StyleSheet, View } from "react-native";

export default function Divider(props: any) {
  return (
    <View style={{...styles.divider, ...props?.style}} {...props}/>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    borderColor: 'grey'
  },
});
