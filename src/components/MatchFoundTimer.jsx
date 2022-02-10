// React's
import { View, StyleSheet } from "react-native"
import CircularProgress from 'react-native-circular-progress-indicator';

// Redux's
import { useDispatch } from 'react-redux'
import { setMatchFound } from "../slices/lobbySlice"

// Hooks
import useRequest from "../hooks/useRequest";

// Components
import Button from "./Button";

export default function MatchFoundTimer(props) {
  const { token, isMatchFound } = props

  const dispatch = useDispatch()

  const [readyCheckResponse, readyCheckRequest] = useRequest("ping")

  const handleAccept = () => {
    readyCheckRequest({
      room: token,
      method: 'post',
      endpoint: '/lol-matchmaking/v1/ready-check/accept'
    })
    dispatch(setMatchFound({
      ...isMatchFound,
      playerResponse: 'Accepted'
    }))
  }

  const handleDecline = () => {
    readyCheckRequest({
      room: token,
      method: 'post',
      endpoint: '/lol-matchmaking/v1/ready-check/decline'
    })
    dispatch(setMatchFound({
      ...isMatchFound,
      playerResponse: 'Declined'
    }))
  }

  return (
    <View style={styles.container}>
      <CircularProgress
        value={0}
        radius={120}
        maxValue={14}
        initialValue={14}
        textColor={'#fff'}
        activeStrokeWidth={15}
        inActiveStrokeWidth={15}
        duration={10000}
        activeStrokeColor={'#0a5380'}
        activeStrokeSecondaryColor={'#24a0ed'}
      />
      <View style={styles.action}>
        <Button title="Accept" onPress={handleAccept} style={{
          margin: 10,
          opacity: isMatchFound.playerResponse === 'None' ? 1 : 0.6
        }} disabled={
          isMatchFound.playerResponse !== 'None'
        } />
        <Button title="Decline" onPress={handleDecline} style={{
          width: 128,
          height: 53,
          alignSelf: 'center',
          backgroundColor: '#FD4556',
          opacity: isMatchFound.playerResponse === 'None' ? 1 : 0.6
        }} disabled={
          isMatchFound.playerResponse !== 'None'
        } />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
    opacity: 0.87,
    alignItems: 'center'
  },
  action: {
    paddingTop: 50,
  }
})