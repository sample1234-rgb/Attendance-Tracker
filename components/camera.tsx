import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { createRef, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [image, setImage] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef();
  const camera = cameraRef.current._cameraRef.current;
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const captureImage = async () => {
    await camera
      .takePicture({ skipProcessing: true })
      .then((data: CameraCapturedPicture) => setImage(data.uri))
      .catch((e: CameraCapturedPicture) => console.error(e));
  };
  const saveImage = () => {
    console.log('saved');
  } 
  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <img
            src={image}
            width={"100%"}
            height={"100%"}
          />
          <View
            style={styles.controls}>
          <TouchableOpacity
            onPress={() => setImage("")}
            style={{marginRight: 15}}
          >
            <Text>Re-take</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={saveImage}
          >
            <Text>Done</Text>
          </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          mirror
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={captureImage}
              ></TouchableOpacity>
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  cameraButton: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  controls: {
    position:'absolute',
    bottom: 0,
    zIndex:2,
    backgroundColor: "#ffffff50",
    display: 'flex',
    flexDirection:'row',
    padding: 10,
  },
});
