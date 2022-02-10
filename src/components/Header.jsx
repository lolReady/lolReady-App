import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Header(props) {
  return (
    <View style={[styles.container, {}]}>
      <View>
        <Text style={[
          styles.headerText,
          styles.headerTop,
          props.headerTop]}>
          {props.top}
        </Text>
        <Text style={[styles.headerText, styles.headerBottom, props.headerBottom]}>{props.bottom}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 100,
    alignSelf: 'center',
    marginTop: 7
  },
  headerText: {
    fontFamily: 'AdventPro',
    color: "rgba(255,251,245,1)",
    textAlign: "center",
    opacity: 0.92,
  },
  headerTop: {
    fontSize: 24,
    top: 23
  },
  headerBottom: {
    fontSize: 64
  },
});

export default Header;
