import { ImageBackground } from "react-native"

export default function Background(props) {
  return (
    <ImageBackground
      {...props}
      resizeMode="cover"
      style={{
        width: '100%',
        height: '100%'
      }}
    />
  )
}