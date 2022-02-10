// ENV's
import { TOKEN_NAME } from '@env';

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Redux's
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '../slices/authSlice';


// EXPO's
import * as SecureStore from 'expo-secure-store';

// Components
import MatchFoundTimer from '../components/MatchFoundTimer';

// Screens
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';
import ModeScreen from './ModeScreen';
import LobbyScreen from './LobbyScreen';

/* GLOBAL VARIABLES */
const Stack = createNativeStackNavigator();

import Socket from '../../Socket';

export default function StartScreen() {
  const { isConnection, token } = useSelector((state) => state.auth)
  const { isMatchFound } = useSelector((state) => state.lobby)

  const dispatch = useDispatch()


  Socket.on("disconnect", () => {
    dispatch(setConnection(false))
    SecureStore.deleteItemAsync(TOKEN_NAME)
  })


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isConnection ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Mode"
              component={ModeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Lobby"
              component={LobbyScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
      {isMatchFound.status && (
        <MatchFoundTimer isMatchFound={isMatchFound} token={token} />
      )}
    </NavigationContainer>
  )
}