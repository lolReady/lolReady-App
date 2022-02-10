import { StyleSheet, TouchableOpacity, Text } from "react-native";




export default function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={[styles.textStyle, props.textStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24a0ed',
    width: 179,
    height: 53,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .5)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS,
    elevation: 5, // Android
  },
  textStyle: {
    color: "rgba(255,251,245,1)",
    fontFamily: 'AdventPro',
    fontSize: 32,
    flex: 1,
    textAlignVertical: "center",
  }
})