import React from 'react'
import { Button, TouchableOpacity, SafeAreaView, Text } from 'react-native'
export default ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>Home for guide</Text>
            <Button title="view tour" onPress={() => navigation.navigate('ViewTour')}/>
        </SafeAreaView>
    )
}
