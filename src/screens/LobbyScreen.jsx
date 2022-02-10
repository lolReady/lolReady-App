import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Switch, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

// Redux's
import { useSelector } from 'react-redux'

// Components
import Background from "../components/Background";
import TouchableIcon from "../components/TouchableIcon"
import Button from "../components/Button"

// Constants
import { Modes } from "../constants/Constants";

// Hooks
import useRequest from "../hooks/useRequest"
import MatchSearching from "../components/MatchSearcing";
import Summoner from "../components/Summoner";


export default function LobbyScreen({ navigation }) {
  const token = useSelector(state => state.auth.token)
  const { isSearching, lobbyConfig } = useSelector(state => state.lobby)

  const [modeName, setModeName] = useState(null)

  const [_p, partyTypeRequest] = useRequest("ping")
  const [_d, disbandRequest] = useRequest("ping")
  const [_r, readyRequest] = useRequest("ping")

  const handleBack = () => {
    navigation.navigate("Mode")
  }

  const handlePartyType = () => {
    partyTypeRequest({
      room: token,
      method: 'put',
      endpoint: '/lol-lobby/v2/lobby/partyType',
      data: [lobbyConfig.partyType === "closed" ? "open" : "closed"]
    })
  }

  const handleDisband = () => {
    disbandRequest({
      room: token,
      method: "delete",
      endpoint: isSearching.status
        ? '/lol-lobby/v2/lobby/matchmaking/search'
        : '/lol-lobby/v2/lobby',
    })
  }

  const handleReady = () => {
    readyRequest({
      room: token,
      method: 'post',
      endpoint: "/lol-lobby/v2/lobby/matchmaking/search"
    })
  }


  useEffect(() => {
    if (lobbyConfig) {
      if (!lobbyConfig.isLobbyActive) {
        navigation.navigate("Main")
      }

      if (lobbyConfig.queueId) {
        let vals = Object.values(Modes)

        for (let v in vals) {
          if (vals[v].id === lobbyConfig.queueId) {
            setModeName(vals[v].name)
          }
        }
      }
    }

    return () => { }
  }, [lobbyConfig])


  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Background source={require("../../assets/images/bg2.png")}>
          <View style={styles.container}>
            <View style={styles.topBox}>
              <View style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <TouchableIcon
                  onPress={handleBack}
                  style={{ flex: 0.15, marginLeft: 10 }}
                  name="md-chevron-back"
                />
                <Text style={{
                  fontFamily: 'AdventPro',
                  color: '#fff',
                  fontSize: 20,
                  flex: 1
                }}>
                  {modeName}
                </Text>
                <Switch
                  style={{ marginRight: 10 }}
                  value={lobbyConfig.partyType === "closed" ? false : true}
                  onValueChange={handlePartyType}
                  disabled={isSearching.status}
                />
              </View>
            </View>
            <View style={styles.summonersBox}>
              {
                lobbyConfig.members.map(mem => {
                  return <Summoner member={mem} key={mem.summonerId} />
                })
              }
            </View>
            <View style={styles.actionBox}>
              <View style={styles.disbandBtn}>
                <TouchableIcon name="cross" onPress={handleDisband} />
              </View>
              <View style={styles.readyBtn}>
                <Button
                  title={
                    isSearching.status ? "IN QUEUE" :
                      !lobbyConfig.canStartActivity ? "NOT READY" :
                        lobbyConfig.localMember &&
                          lobbyConfig.localMember.isLeader ? "FIND MATCH" : "READY"
                  }
                  disabled={!lobbyConfig.canStartActivity}
                  style={{ opacity: lobbyConfig.canStartActivity ? 1 : 0.5 }}
                  onPress={handleReady}
                />
              </View>
              <View style={styles.chatBtn}>
                <TouchableIcon name="chatbox" disabled={true} />
              </View>
            </View>
          </View>
          {isSearching.status &&
            <MatchSearching />
          }
        </Background>
      </SafeAreaView>
    </SafeAreaProvider >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  topBox: {
    flex: 0.372,
    width: '100%',
    height: 120,
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  summonersBox: {
    flex: 2,
    paddingTop: 10,
  },
  inviteBox: {

  },
  actionBox: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  disbandBtn: {

  },
  readyBtn: {

  },
  chatBtn: {

  }
})