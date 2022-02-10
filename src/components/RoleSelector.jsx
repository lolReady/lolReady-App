import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { useSelector } from 'react-redux';

import useRequest from '../hooks/useRequest';

const pos_path = '../../assets/icons/positions';

export default function RoleSelector() {
  const token = useSelector(state => state.auth.token)
  const { lobbyConfig, isSearching } = useSelector(state => state.lobby)


  const [_, roleRequest] = useRequest("ping")

  const icons = {
    UNSELECTED: require(`${pos_path}/UNSELECTED.png`),
    FILL: require(`${pos_path}/FILL.png`),
    TOP: require(`${pos_path}/TOP.png`),
    JUNGLE: require(`${pos_path}/JUNGLE.png`),
    MIDDLE: require(`${pos_path}/MIDDLE.png`),
    BOTTOM: require(`${pos_path}/BOTTOM.png`),
    UTILITY: require(`${pos_path}/UTILITY.png`),
  };

  const [firstPosition, setFirstPosition] = useState(0);
  const [secondPosition, setSecondPosition] = useState(null);

  const handleRequest = (fp, sp) => {
    roleRequest({
      room: token,
      method: "put",
      endpoint: '/lol-lobby/v2/lobby/members/localMember/position-preferences',
      data: [{
        "firstPreference": Object.keys(icons)[fp],
        "secondPreference": Object.keys(icons)[sp]
      }]
    })
  }


  const handleFirstPosition = () => {
    let fp = firstPosition;
    let sp = secondPosition;

    fp++;

    if (fp === sp) {
      fp++;
    }

    if (fp >= 7) {
      fp = 1
    }

    if (fp === 1) {
      sp = null;
    }


    if (fp !== 1 && sp === null) {
      sp = 0
    }

    handleRequest(fp, sp)
    setFirstPosition(fp)
    setSecondPosition(sp)
  }

  const handleSecondPosition = () => {
    let fp = firstPosition;
    let sp = secondPosition;

    sp++;
    if (sp === fp) {
      if (sp === 1 && fp === 1) {
        sp = null
      } else {
        sp++;
      }
    }

    if (sp >= 7) {
      sp = 1
    }

    handleRequest(fp, sp)
    setFirstPosition(fp)
    setSecondPosition(sp)
  }

  useEffect(() => {
    if (lobbyConfig.localMember.firstPositionPreference === "UNSELECTED"
      && lobbyConfig.localMember.secondPositionPreference === "UNSELECTED") {
      setFirstPosition(0)
      setSecondPosition(null)
    } else {
      setFirstPosition(Object.keys(icons).indexOf(lobbyConfig.localMember.firstPositionPreference))

      if (lobbyConfig.localMember.firstPositionPreference === "FILL") {
        setSecondPosition(null)
      } else {
        if (lobbyConfig.localMember.secondPositionPreference === "UNSELECTED") {
          setSecondPosition(0)
        } else {
          setSecondPosition(Object.keys(icons).indexOf(lobbyConfig.localMember.secondPositionPreference))
        }
      }

    }
  }, [lobbyConfig])


  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'space-around',
        width: 90,
        borderRadius: 20,
      }}
    >
      <TouchableOpacity
        onPress={handleFirstPosition}
        disabled={isSearching.status}
      >
        <Image
          source={Object.values(icons)[firstPosition]}
          style={{
            width: 32,
            height: 32,
            opacity: isSearching.status ? 0.5 : 1,
            tintColor: '#ddd'
          }}
        />
      </TouchableOpacity>

      {secondPosition !== null && (
        <TouchableOpacity
          onPress={handleSecondPosition}
          disabled={isSearching.status}>
          <Image
            source={Object.values(icons)[secondPosition]}
            style={{ width: 32, height: 32, opacity: isSearching.status ? 0.5 : 1, tintColor: '#ddd' }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
