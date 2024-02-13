import { StyleSheet, Text, View, Image, AppRegistry } from 'react-native';
import {Camera, CameraType} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import React, { useState, useEffect, useRef} from 'react';
import Button from './components/button';
// Common.js import syntax
const ort = require('onnxruntime-react-native');

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)

  let session

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync()
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted')
      // session = await ort.InferenceSession.create('./assets/model.onnx')
    })();
  }, [])

  const takePicture = async () => {
    if(cameraRef) {
      try{
        const data = await cameraRef.current.takePictureAsync()
        console.log(data.uri)
      } catch(e) {
        console.log(e)
      }
    }
  }

  if(hasCameraPermission === false){
    return <Text>No access to camera!</Text>
  }

  return (
    <View style={styles.container}>
      {!image ? 
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
        </Camera>
        <View style={styles.snapContainer}>
          <Button icon="circle" onPress={takePicture}></Button>
        </View>
      </View>
      :
      <Text>{output}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  snapContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    width: '100%',
  }
});

AppRegistry.registerComponent('AllergyApp', () => App);