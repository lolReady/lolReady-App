// React's
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Icon from "react-native-vector-icons/Ionicons";

// Redux's
import { useSelector } from 'react-redux'
import { setSearching, setMatchFound, setLobbyConfig } from "../slices/lobbySlice"

// Hooks
import useRequest from "../hooks/useRequest"

// Constants
import { Modes } from "../constants/Constants";

// Components
import Background from "../components/Background"
import Button from "../components/Button"
import Header from "../components/Header";
import Spinner from "../components/Spinner"
import TouchableIcon from "../components/TouchableIcon"
import ChoiceBox from "../components/ChoiceBox";
import Icons from "../components/Icons";


export default function ModeScreen({ navigation }) {
  const token = useSelector(state => state.auth.token)

  const [selectedMode, setSelectedMode] = useState(Modes.blind)
  const [loading, setLoading] = useState(false)

  const [createLobbyResponse, createLobbyRequest] = useRequest('ping');

  const handleConfirm = () => {
    setLoading(true);
    createLobbyRequest({
      room: token,
      method: 'post',
      endpoint: '/lol-lobby/v2/lobby',
      data: [{ queueId: selectedMode.id }],
    });

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  const handleSelect = (mode) => {
    setSelectedMode(mode)
  }

  const handleBack = () => {
    navigation.navigate("Main")
  }

  useEffect(() => {
    if (createLobbyResponse) {
      setLoading(false);
      navigation.navigate("Lobby")
    }
  }, [createLobbyResponse]);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Background source={require("../../assets/images/bg6.png")}>
          <View style={styles.headerBox}>
            <Header top="5v5" bottom="Summoner's Rift" headerBottom={{ top: 12, fontSize: 48 }} />
          </View>
          <View style={[styles.contentBox]}>
            <ChoiceBox
              size={32}
              color={'#fff'}
              text="Blind Pick"
              onPress={() => handleSelect(Modes.blind)}
              selected={selectedMode.id === Modes.blind.id}
            />
            <ChoiceBox
              size={32}
              color={'#fff'}
              text="Draft Pick"
              onPress={() => handleSelect(Modes.draft)}
              selected={selectedMode.id === Modes.draft.id}
            />
            <ChoiceBox
              size={32}
              color={'#fff'}
              text="Ranked Solo/Duo"
              onPress={() => handleSelect(Modes.ranked)}
              selected={selectedMode.id === Modes.ranked.id}
            />
            <ChoiceBox
              size={32}
              color={'#fff'}
              text="Ranked Flex"
              onPress={() => handleSelect(Modes.flex)}
              selected={selectedMode.id === Modes.flex.id}
            />
          </View>
          <View style={[styles.actionBox]}>
            {loading ? (
              <Spinner />
            ) : (
              <View style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignSelf: 'stretch',
                alignItems: 'center'
              }}>
                <TouchableIcon
                  style={{ marginLeft: 15, flex: 0.27 }}
                  onPress={handleBack}
                  name="md-chevron-back"
                />
                <View style={{ flex: 1 }}>
                  <Button
                    title="Confirm"
                    onPress={handleConfirm}
                    disabled={selectedMode === null}
                    style={{ opacity: selectedMode !== null ? 1 : 0.5 }} />
                </View>
              </View>
            )}
          </View>
        </Background>
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
  headerBox: {
    flex: 0.37,
    width: '100%',
    height: 128,
    backgroundColor: "rgba(26,26,26,0.5)"
  },
  contentBox: {
    flex: 1,
    width: '100%',
    height: 100,
    backgroundColor: "rgba(26,26,26,0.5)"
  },
  actionBox: {
    backgroundColor: "rgba(26,26,26,0.5)",
    flex: 0.4,
    width: '100%',
    height: 100,
    alignItems: 'center',
  }
});

