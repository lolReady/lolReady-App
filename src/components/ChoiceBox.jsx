import { View, Text, StyleSheet } from "react-native";
import TouchableIcon from "./TouchableIcon";

import { useState } from "react";

export default function ChoiceBox(props) {
  return <View style={[styles.container, {
    flex: 1,
    flexDirection: 'row',
  }]}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableIcon
        onPress={props.onPress}
        name={props.selected ? "radiobox-marked" : "radiobox-blank"}
      />
      <Text style={[styles.textStyle, { color: props.color }]}>{props.text}</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  textStyle: {
    fontFamily: 'AdventPro',
    fontSize: 24,
    height: 32,
    textAlignVertical: 'center',
  }
})