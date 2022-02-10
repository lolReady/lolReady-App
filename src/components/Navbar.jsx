import { View, StyleSheet } from "react-native"

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from "./Header"
import TouchableIcon from "./TouchableIcon";

export default function Navbar(props) {

  return (
    <View style={[styles.container, props.style]}>
      <TouchableIcon
        style={styles.burgerButton}
        onPress={props.navigation.toggleDrawer}
      >
        <MaterialCommunityIcons name="menu" color="#fff" size={32} />
      </TouchableIcon>
      <View style={styles.header}>
        <Header
          top='LoL'
          bottom='Ready'
          headerTop={{ fontSize: 16, top: 16 }}
          headerBottom={{ fontSize: 38 }}
        />
      </View>
      <TouchableIcon style={styles.profileButton}>
        <Icon name="user-alt" color="#fff" size={32} />
      </TouchableIcon>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  burgerButton: {
    width: 32,
    height: 32,
    marginTop: 24
  },
  header: {
    width: 128,
    height: 32,
  },
  profileButton: {
    width: 32,
    height: 32,
    marginTop: 24
  }
})