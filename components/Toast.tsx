import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export type toast = {
  onClose: () => void;
  open: (status: string) => void;
};
type ToastProps = {
  closeButton?: boolean | undefined;
  modalCloseHandler?: any;
  height?: number;
  width?: number;
  duration?: number;
  success?: boolean;
  error?: boolean;
  children: any;
  ref?: Ref<toast>;
};
export const Toast = forwardRef<toast, ToastProps>(
  (
    {
      closeButton = false,
      modalCloseHandler = null,
      height = 0,
      width = 0,
      duration = 2000,
      success = false,
      error = false,
      children,
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const [styleView, setStyleView] = useState(styles.modalView);
    const [styleBtn, setBtn] = useState(styles.closeButton);
    const modalHeight = height;
    const modalWidth = width;
    let _toastRef;
    useImperativeHandle(ref, () => ({
      onClose: () => onClose(),
      open: (status: string) => open(status),
    }));
    const onClose = () => {
      setTimeout(
        () => {
          if (modalCloseHandler) modalCloseHandler();
          else setShow(false);
        },
        duration < 10 ? duration * 1000 : duration
      );
    };
    useEffect(() => {
      _toastRef = ref.current;
      onClose();
    }, []);
    const setStyles = (status: string) => {
      let viewStyle = styles.modalView;
      let btnStyle = styles.closeButton;
      switch (status) {
        case "success":
          viewStyle = { ...styles.modalView, ...styles.successView };
          btnStyle = { ...styles.closeButton, ...styles.successButton };
          break;
        case "error":
          viewStyle = { ...styles.modalView, ...styles.errorView };
          btnStyle = { ...styles.closeButton, ...styles.errorButton };
          break;
        default:
          break;
      }
      setStyleView(viewStyle);
      setBtn(btnStyle);
    };
    const open = (status: string) => {
      setShow(true);
      setStyles(status);
      onClose();
    };
    return (
      <Modal
        animationType="slide"
        transparent
        onRequestClose={onClose}
        visible={show}
      >
        <GestureHandlerRootView style={styles.GHRV}>
          <View
            style={{
              ...styleView,
              minWidth: modalWidth,
              minHeight: modalHeight,
            }}
          >
            <View>{children}</View>
            {closeButton && (
              <TouchableOpacity style={styleBtn} onPress={onClose}>
                <Text>Close</Text>
              </TouchableOpacity>
            )}
          </View>
        </GestureHandlerRootView>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  GHRV: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "center",
    alignSelf: "center",
    height: "100%",
    bottom: 20,
  },
  modalView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#dada0080",
    alignSelf: "flex-end",
    alignContent: "center",
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
});
