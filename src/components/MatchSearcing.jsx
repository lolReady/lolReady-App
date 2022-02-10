// React's
import { StyleSheet, View, Text, Touchable } from "react-native"

// Redux's
import { useSelector } from 'react-redux'

// Hooks
import useRequest from "../hooks/useRequest";

// Components
import TouchableIcon from "./TouchableIcon";


// Functions
const convTime = (value) => {
  return Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' + String(value % 60) : value % 60);
};

export default function MatchSearching(props) {
  const token = useSelector(state => state.auth.token)
  const isSearching = useSelector(state => state.lobby.isSearching)

  const [_, disbandRequest] = useRequest("ping")

  const handleDisband = () => {
    disbandRequest({
      room: token,
      method: 'Delete',
      endpoint: '/lol-lobby/v2/lobby/matchmaking/search'
    })
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.findingMatchColumnRow}>
        <View style={{ width: '100%' }}>
          <Text style={styles.findingMatch}>Finding match</Text>
          <Text style={styles.queueTime}>{convTime(isSearching.timeInQueue)}</Text>
          <Text style={styles.estimatedTime}>Estimated: {convTime(isSearching.estimatedTime)}</Text>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <TouchableIcon onPress={handleDisband} name="cross" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: 75,
    width: '100%',
    height: 73,
    backgroundColor: "rgba(0,0,0,0.57)",
  },
  findingMatch: {
    fontFamily: "AdventPro",
    color: "rgba(255,255,255,1)",
    fontSize: 13,
    textAlign: "left",
    opacity: 0.86
  },
  queueTime: {
    fontFamily: "AdventPro",
    color: "rgba(255,255,255,1)",
    width: '100%',
    fontSize: 27,
    textAlign: "left"
  },
  estimatedTime: {
    fontFamily: "AdventPro",
    color: "rgba(74,144,226,1)",
    width: '100%',
    fontSize: 16,
    textAlign: "left"
  },
  findingMatchColumnRow: {
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 22,
    marginRight: 44
  }
});

