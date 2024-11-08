import { StyleSheet } from 'react-native';
export const filterBoxStyles = StyleSheet.create({
  flexBox: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 5,
  },
  flexItem: {
    padding: 5,
    cursor: "pointer",
    backgroundColor: "white",
  },
  activate: {
    backgroundColor: '#00ff0080',
    fontWeight: 'bold',
  },
  divider:{
    color: 'black',
  },
  flexContainer:{
    display:'flex',
    flexWrap: 'wrap',
    flexDirection:'row',
    flex: 1,
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  alignCenter: {
    alignItems: 'center'
  },
  fitContentWidth: {
    width: 'fit-content',
  },
  fitContentHeight: {
    height: 'fit-content',
  },
});