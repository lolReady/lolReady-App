// ENV's
import { TOKEN_NAME } from '@env';

// React Native
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

// Redux's
import { useSelector, useDispatch } from 'react-redux'
import { restoreToken, setConnection } from "../slices/authSlice"

// EXPO's
import * as SecureStore from 'expo-secure-store';

// Hooks
import useRequest from "../hooks/useRequest"

// Components
import Spinner from "../components/Spinner";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import QRScanner from "../components/QRScanner";

export default function SplashScreen() {
  const { isConnection, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [loginResponse, loginRequest] = useRequest("login")
  const [error, setError] = useState(false)


  useEffect(() => {
    const bootstrapAsync = async () => {
      let restoredToken = null;

      try {
        restoredToken = await SecureStore.getItemAsync(TOKEN_NAME);
      } catch (e) {
        console.error(e);
      }

      dispatch(restoreToken(restoredToken))
    };

    bootstrapAsync();
  }, []);

  const handleLogin = () => {
    if (!isConnection && !token) return
    setError(false)

    loginRequest({
      room: token
    })

    return setTimeout(() => {
      setError(true)
    }, (3000));
  }

  useEffect(() => {
    if (token === -1) return

    const connTimeout = handleLogin()

    return () => {
      clearTimeout(connTimeout)
    }

  }, [token])

  useEffect(() => {
    if (!loginResponse) return

    if (loginResponse["error"]) {
      setError(true)
      dispatch(setConnection(false))
    } else {
      setError(false)
      dispatch(setConnection(true))
    }
  }, [loginResponse])


  return (
    <Background source={require("../../assets/images/bg1.png")}>
      <View style={[styles.box, {}]}>
        <Header top='LoL' bottom='Ready' />
      </View>
      <View style={[styles.box, { alignSelf: 'flex-end', marginTop: 300 }]}>
        {error ? (
          <View style={{ margin: 15, alignItems: 'center' }}>
            <Text style={styles.errorText}>Connection Failed</Text>
            <Button title="Retry" onPress={handleLogin} />
          </View>
        ) : !token ? (
          <QRScanner />
        ) : (
          <Spinner style={{
            flex: 1,
            alignSelf: 'center'
          }} message="Trying to connect to LolReady server..." color='#fff' />
        )}

      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 25
  },
  box: {
    flex: 1,
    width: '100%',
    height: 100,
    alignSelf: 'center',
    marginTop: 7
  },
  headerText: {
    fontFamily: 'AdventPro',
    color: "rgba(255,251,245,1)",
    textAlign: "center",
    opacity: 0.92,
  },
  headerTop: {
    fontSize: 24,
    top: 15
  },
  headerBottom: {
    fontSize: 64
  },
  errorText: {
    marginTop: 50,
    textAlign: 'center',
    fontFamily: 'AdventPro',
    fontSize: 16,
    color: '#fff'
  }
});