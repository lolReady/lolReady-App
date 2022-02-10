// React's
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

// Redux's
import { useSelector, useDispatch } from 'react-redux'
import { setSearching, setMatchFound, setLobbyConfig } from "../slices/lobbySlice"

// Components
import Navbar from "../components/Navbar"
import Background from "../components/Background"
import Button from "../components/Button"
import MatchSearching from "../components/MatchSearcing"
import Spinner from "../components/Spinner"

// Hooks
import useListen from "../hooks/useListen"
import useRequest from "../hooks/useRequest"

// Constants
const endpoints = {
  V2LOBBY: '/lol-lobby/v2/lobby',
  V1SEARCH: '/lol-matchmaking/v1/search',
  V1READYCHECK: '/lol-matchmaking/v1/ready-check',
};

export default function MainScreen({ route, navigation }) {
  const token = useSelector(state => state.auth.token)
  const { isSearching, isMatchFound, lobbyConfig } = useSelector((state) => state.lobby)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  // Sockets
  const [lobby, lobbyRequest] = useRequest("ping")
  const [lobbyResponse, setLobbyResponse] = useListen(token, endpoints, true)

  // Effects
  useEffect(() => {
    setLoading(true)
    lobbyRequest({
      room: token,
      method: 'get',
      endpoint: '/lol-lobby/v2/lobby'
    })
  }, [])

  useEffect(() => {
    setLoading(false)
    setLobbyResponse({ ...lobbyResponse, V2LOBBY: lobby })
  }, [lobby])

  useEffect(() => {
    if (!lobbyResponse) return;

    const v2lobby = lobbyResponse.V2LOBBY
    const v1search = lobbyResponse.V1SEARCH
    const v1readycheck = lobbyResponse.V1READYCHECK

    if (v2lobby) {
      const data = v2lobby.data
      if (!data || data.message === "LOBBY_NOT_FOUND") {
        dispatch(setLobbyConfig())
      } else {
        dispatch(setLobbyConfig({
          isLobbyActive: true,
          queueId: data.gameConfig.queueId,
          canStartActivity: data.canStartActivity,
          isLobbyFull: data.gameConfig.isLobbyFull,
          showPositionSelector: data.gameConfig.showPositionSelector,
          invitations: data.invitations,
          members: data.members,
          localMember: data.localMember,
          partyType: data.partyType
        }))
      }
    }

    if (v1search) {
      const data = v1search.data
      if (!data) {
        dispatch(setSearching())
      } else {
        dispatch(setSearching({
          timeInQueue: data.timeInQueue,
          estimatedTime: parseInt(data.estimatedQueueTime)
        }))
      }
    }

    if (v1readycheck) {
      const data = v1readycheck.data
      if (!data) {
        dispatch(setMatchFound())
      } else {
        dispatch(setMatchFound({
          state: data.state,
          playerResponse: data.playerResponse,
          timer: data.timer
        }))
      }
    }

  }, [lobbyResponse])

  const handlePlay = () => {
    // LobbyScreen
    if (lobbyConfig.isLobbyActive) {
      navigation.navigate("Lobby")
    } else { // ModeScreen
      navigation.navigate("Mode")
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Background source={require("../../assets/images/bg5.png")}>
          <Navbar
            style={{
              flex: 0.19,
              alignContent: 'flex-start'
            }}
            navigation={navigation}
          />
          <View style={[styles.contentBox]}>
          </View>
          <View style={[styles.actionBox]}>
            {loading ? (
              <Spinner />
            ) : (
              <Button
                title={lobbyConfig.isLobbyActive ? "GROUP" : "PLAY"}
                onPress={handlePlay}
              />
            )}
          </View>
        </Background>
        {isSearching.status && (
          <MatchSearching />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: "rgba(26,26,26,1)"
  },
  contentBox: {
    flex: 1,
    width: '100%',
    height: 100,
    backgroundColor: "rgba(0,0,0,0)",
  },
  actionBox: {
    flex: 0.3,
    width: '100%',
    height: 100,
    alignItems: 'center',
  }
});
