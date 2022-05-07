import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { primary, white, black, gray } from 'config/colors';
import {bold24, bold18, bold20} from '../config/typography.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from './BackButton.js';

const Header = ({title, navigation, backgroundColor, color}) => {
    //INCLUDES THE BACK BUTTON
    return (
        <View
            style={{
                backgroundColor: primary,
                height: 80,
                width: '100%',
                zIndex: 100
            }}
        >
            <Text 
                style={{...bold24,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: white,
                    marginTop: 25,
                }}
            >
                {title}
            </Text>
            <BackButton navigation={navigation} color={color} backgroundColor={backgroundColor}/>
        </View>
    )
}

export default Header