import React from 'react'
import { SafeAreaView, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default  ({navigation, f}) => {
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => {
                f(false);
            }}>
                <Text>asdf</Text>
            </TouchableOpacity>
            <Text>
                Registration for guide
            </Text>
        </SafeAreaView>
    )
}
