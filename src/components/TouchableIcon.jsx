import { TouchableOpacity } from "react-native"

import Icons from "./Icons"

export default function TouchableIcon(props) {
    return <TouchableOpacity {...props} onPress={props.onPress}>
        <Icons name={props.name} size={32 | props.size} />
    </TouchableOpacity>
}