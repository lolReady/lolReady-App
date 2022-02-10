import { StyleSheet, View, Image, Text } from "react-native";

import { useSelector } from "react-redux";
import RoleSelector from "./RoleSelector";

import TouchableIcon from "./TouchableIcon";

/*
        <View style={styles.levelBadge}>
          <Text
            style={{
              color: '#c9c9c9',
              fontFamily: 'AdventPro',
              fontSize: 16
            }}
          >
            120
          </Text>
          <View style={styles.crownBadge}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../../assets/icons/crown.png')}
            />
          </View>
        </View>

      <View style={styles.inviteBox}>
        <View style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          width: 48,
          height: 48,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50
        }}>
          <TouchableIcon name="plus" size={32} />
        </View>
      </View>

*/

export default function Summoner(props) {
  const { member } = props

  const { lobbyConfig } = useSelector(state => state.lobby)

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Image
          style={{ width: 64, height: 64, borderRadius: 9 }}
          source={{
            uri: `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/${member.summonerIconId}.png`,
          }} />
        <View style={styles.levelBadge}>
          <Text
            style={{
              color: '#c9c9c9',
              fontFamily: 'AdventPro',
              fontSize: 16
            }}
          >
            {member.summonerLevel}
          </Text>
          {member.isLeader &&
            <View style={styles.crownBadge}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../assets/icons/crown.png')}
              />
            </View>
          }
        </View>

      </View>
      <View style={styles.nameBox}>
        <Text style={{
          fontFamily: 'AdventPro',
          fontSize: 20,
          color: '#fff',
        }}>{member.summonerName}</Text>
      </View>
      <View style={styles.roleBox}>
        {lobbyConfig.showPositionSelector &&
          <RoleSelector />
        }
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    maxHeight: 68,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignSelf: 'center',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 8
  },
  iconBox: {
    margin: 2
  },
  levelBox: {

  },
  nameBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleBox: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inviteBox: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelBadge: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    minWidth: 24,
    height: 24,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424',
    borderColor: '#eee',
    borderWidth: 0.6,
  },
  crownBadge: {
    position: 'absolute',
    top: -7,
    left: 7,
    minWidth: 8,
    height: 8,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotateY: '24deg' }, { rotateZ: '24deg' }],
  },
})