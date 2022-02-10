import 'react-native-gesture-handler';

// React & React Native
import {
  useState,
} from 'react';

import {
  StatusBar
} from 'react-native';

// EXPO's
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

// REDUX
import { Provider } from 'react-redux'
import { store } from './src/stores/store'

// Screens
import StartScreen from './src/screens/StartScreen';

export default function App() {
  const [AppIsReady, setAppIsReady] = useState(false)

  const LoadFonts = async () => {
    await Font.loadAsync({
      AdventPro: require('./assets/fonts/adventpro.ttf')
    })
  }

  if (!AppIsReady) {
    return (
      <AppLoading startAsync={LoadFonts}
        onFinish={() => setAppIsReady(true)}
        onError={() => { }} />
    )
  }

  return (
    <Provider store={store}>
      <StatusBar hidden />
      <StartScreen />
    </Provider>
  )
}