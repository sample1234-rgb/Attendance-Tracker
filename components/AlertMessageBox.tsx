import { createRef, useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
interface ActionList {
  key: string;
  title: string;
  pressHandler: any;
}
export default function AlertMessageBox({
  message,
  actionList,
  height = 0,
  width = 0,
  children,
  ref = null,
}: {
  message: string;
  actionList?: Array<ActionList>;
  height?: number;
  width?: number;
  children?: any | undefined;
  ref?: any | undefined;
}) {
  const [show, setShow] = useState(false);
  const [styleView, setStyleView] = useState(styles.modalView);
  const modalHeight = height;
  const modalWidth = width;

  useEffect(() => {
    onClose(undefined);
  }, []);
  const _actionRef = createRef<Modal>();
  const onClose = async (clickHandler: any | undefined) => {
    if (clickHandler) await clickHandler();
    setShow(false);
  };
  const onOpen = async (clickHandler: any | undefined) => {
    setShow(true);
  };
  return (
    <Modal
      animationType="fade"
      transparent
      onRequestClose={onClose}
      visible={show}
      ref={_actionRef}
    >
      <GestureHandlerRootView style={styles.GHRV}>
        <View
          style={{
            ...styleView,
            minWidth: modalWidth,
            minHeight: modalHeight,
          }}
        >
          {children && <View>{children}</View>}
          <Text>{message}</Text>
          <View style={styles.actionList}>
            {actionList.map((action) => (
              <View style={styles.actionItem}>
                <Button
                  title={action.title}
                  onPress={() => onClose(action.pressHandler)}
                />
              </View>
            ))}
          </View>
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
    alignContent: "center",
    alignSelf: "center",
    height: "100%",
  },
  modalView: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "#dada0080",
    padding: 10,
  },
  closeButton: {
    backgroundColor: "#dada00",
    zIndex: 10,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
  },
  successView: {
    backgroundColor: "#00ff60",
    color: "white",
  },
  successButton: {
    backgroundColor: "#00ff00",
    color: "white",
  },
  errorView: {
    backgroundColor: "#fe0060",
    color: "white",
  },
  errorButton: {
    backgroundColor: "#ff0000",
    color: "white",
  },
  actionList: {
    display: "flex",
    flexDirection: "row-reverse",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  actionItem: {
    marginLeft: 5,
  },
});
