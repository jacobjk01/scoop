import React from 'react';
import { Icon } from 'react-native-elements';

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
            <HomeStack.Screen name="Booking" component={Booking}/>
            <HomeStack.Screen name="Checkout" component={Checkout}/>
        </HomeStack.Navigator>
    )
}

export default HomeStack;