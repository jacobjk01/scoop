import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../contexts'
import SigninButton from '../components/SigninButton';
import SignoutButton from '../components/SignoutButton';
export default  ({navigation}) => {
    const {mode, setMode} = useContext(UserContext);
    
    return (
        <SafeAreaView>
            <Text>
                Feedback 
            </Text>

        </SafeAreaView>
    )
}
