import React from 'react';
import { Icon } from 'react-native-elements';

import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from '../screens/HomePage';
import TourGuideProfile from '../screens/TourGuideProfile';
import TourInfo from '../screens/TourInfo';
import Messages from '../screens/Messages';
import Conversation from '../screens/Conversation';
import { TouchableOpacity } from 'react-native';

import colors from '../config/colors';
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
            <HomeStack.Screen name="TourInfo" component={TourInfo}/>
            <HomeStack.Screen name="Messages" component={Messages} options={
                {
                title: 'Your Messages',
                headerStyle: {
                backgroundColor:colors.primary,
                color: colors.white,
                },
                headerTintColor: '#fff'
                }}/>
            <HomeStack.Screen name="Conversation" component={Conversation}/> 
        </HomeStack.Navigator>
    )
}

export default HomeStack;