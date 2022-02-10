import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

export default function Spinner(props) {
  return (
    <View>
      <ActivityIndicator
        color={props.color || '#fff'}
        size={props.size || 'large'}
        style={[styles.spinner, props.style]}
      >
      </ActivityIndicator>
      <Text style={[styles.messageText, { color: props.color }]}>
        {props.message}
      </Text>
    </View >
  );
}

const styles = StyleSheet.create({
  spinner: {
    width: 32,
    height: 32
  },
  messageText: {
    marginTop: 50,
    textAlign: 'center',
    fontFamily: 'AdventPro',
    fontSize: 16,
  }
});

