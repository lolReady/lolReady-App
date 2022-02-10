import { TOKEN_NAME } from '@env';

import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// EXPO's
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SecureStore from 'expo-secure-store';

// REDUX
import { useDispatch } from 'react-redux'
import { restoreToken } from "../slices/authSlice"

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()

    return () => { }
  }, [])

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No Access</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={
        scanned
          ? undefined
          : async ({ type, data }) => {
            data = data.slice(1, -1);
            const [key, val] = data.split("@")

            if (key !== "LOLREADY") {
              alert("Code is not valid.")
              setScanned(false)
            } else {
              dispatch(restoreToken(val))
              SecureStore.setItemAsync(TOKEN_NAME, val)
              setScanned(true)
            }
          }
      }
      style={[StyleSheet.absoluteFillObject, styles.container, {
        margin: 50
      }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    margin: 50,
    top: -400
  }
})