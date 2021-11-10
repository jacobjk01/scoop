import React, { useContext, useEffect } from 'react'
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
    useEffect(() => {
        if (mode != 'visitor') {
            setMode('visitor');
        }
        return () => {
        }
    }, [])
    return (
        <SafeAreaView>
            <Text>
                Onboarding Visitor
            </Text>
            <Text>
                Select a school
            </Text>
            <Button onPress={() => {
                setVisitorBone(true);
            }} title='UCLA'/>
        </SafeAreaView>
    )
}
