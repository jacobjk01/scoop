import React, { useContext } from 'react'
import { SafeAreaView, Text, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from 'contexts'

export default  ({navigation}) => {
    const {
        userAuth, setUserAuth,
        user, setUser,
        isUserLoading, setIsUserLoading,
        mode, setMode,
        guideDone, setGuideDone,
        visitorDone, setVisitorDone,
        visitorBone, setVisitorBone} = useContext(UserContext);
    return (
        <SafeAreaView>
            <Text>
                Onboarding Guide
            </Text>
            <Button onPress={() => {
                setGuideDone(true);
            }} title='Click here to register (TODO: detailed guide onboarding process)'/>
        </SafeAreaView>
    )
}
