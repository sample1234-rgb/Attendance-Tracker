import { Modal, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ModalView({
  visible,
  modalCloseHandler,
  height = 200,
  width = 200,
  children,
}: {
  visible?: boolean | undefined;
  modalCloseHandler: any;
  height?: number;
  width?: number;
  children: any;
}) {
  const modalHeight = height;
  const modalWidth = width;
  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={modalCloseHandler}
      visible={visible}
    >
      <GestureHandlerRootView style={styles.GHRV}>
        <View
          style={{
            ...styles.modalView,
            minWidth: modalWidth,
            minHeight: modalHeight,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.closeButton,
              right: modalWidth / 10,
              top: modalHeight / 10,
            }}
            onPress={modalCloseHandler}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <View>{children}</View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  GHRV: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalView: {
    backgroundColor: "#dada0090",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    backgroundColor: "#dada0090",
    position: "absolute",
    zIndex: 10,
  },
});
