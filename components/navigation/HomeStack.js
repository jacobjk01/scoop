import React from 'react';
import { Icon } from 'react-native-elements';

import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from '../../screens/HomePage';
import TourGuideProfile from '../../screens/TourGuideProfile';
import TourInfo from '../../screens/TourInfo';
import Messages from '../../screens/Messages';
import { TouchableOpacity } from 'react-native';
import Booking from '../../screens/Booking';
import Checkout from '../../screens/Checkout';

const HomeStack = ({navigation}) => {
    const HomeStack = createStackNavigator();
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomePage} 
                options={{
                headerTitle: 'Home',
                headerRight: () => (
                    <Ionicons style={{marginRight: 20}}
                        name={'chatbox-ellipses'} size={25} color={'#3D68CC'}
                        onPress={() => navigation.navigate('Messages')} 
                    />
                )
                }} />
            <HomeStack.Screen name="TourGuideProfile" component={TourGuideProfile}/>
            <HomeStack.Screen name="TourInfo" component={TourInfo} options={{headerShown: false , headerTitle: 'Tour Info'}}/>
            <HomeStack.Screen name="Messages" component={Messages}/>
            <HomeStack.Screen name="Booking" component={Booking}
                options={({ navigation }) => ({
                    title: "Booking",
                    headerStyle: {
                        backgroundColor: "#3154A5",
                        borderColor: "#3154A5",
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        fontWeight: '700',
                        color: 'white',
                    },
                    // headerLeft: () => {
                    //     <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("TourInfo")}>
                    //         <Ionicons name='chevron-back-outline' size={20} color={'#3154A5'} />
                    //     </TouchableOpacity>
                    // }
                })}
            />
            <HomeStack.Screen name="Checkout" component={Checkout}/>
        </HomeStack.Navigator>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        position: 'absolute',
        left: 20,
        top: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HomeStack;