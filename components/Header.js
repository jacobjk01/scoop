import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { primary, white, black, grayDark, grayMed } from 'config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = (params) => {
    //INCLUDES THE BACK BUTTON
    return (
        <View
            style={{
                backgroundColor: primary,
                height: 80,
                width: '100%',
                position: 'absolute',
            }}
        >
            <Text 
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: 27,
                    color: white,
                    fontFamily: 'Helvetica-Bold',
                    marginTop: 20,
                }}
            >
                {params.title}
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: white,
                    borderRadius: 10,
                    borderColor: white,
                    borderWidth: 1,
                    position: 'absolute',
                    left: 20,
                    top: 22,
                    width: 45,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => params.navigation.goBack()}
            >
                <Ionicons
                    name="chevron-back-outline"
                    size={20}
                    color={primary}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header