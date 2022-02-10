import { View } from "react-native";

import { default as Ionicons } from "react-native-vector-icons/Ionicons";
import { default as Entypo } from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Icons(props) {
    switch (props.name) {
        case 'md-chevron-back':
            return <Ionicons name="md-chevron-back" color="#fff" size={32} {...props} />
        case 'cross':
            return <Entypo name="cross" color="#fff" size={32} {...props} />
        case 'radiobox-marked':
            return <MaterialCommunityIcons name="radiobox-marked" color="#fff" size={32} {...props} />
        case 'radiobox-blank':
            return <MaterialCommunityIcons name="radiobox-blank" color="#fff" size={32} {...props} />
        case 'chatbox':
            return <Ionicons name="chatbox" color="#fff" size={32} {...props} />
        case 'plus':
            return <Entypo name="plus" color="#fff" size={32} {...props} />


    }

    return <View></View>
}