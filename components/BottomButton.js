import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { primary, white, black, grayDark, grayMed, grayShadow } from 'config/colors';

const BottomButton = (params) => {
    return (
        <View style={{backgroundColor: white, height: 80, width: '100%', position: 'absolute', bottom: 0, elevation: 10}}>
            <TouchableOpacity
            style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto',
                width: '80%',
                backgroundColor: primary,
                height: 50,
                justifyContent: 'center',
                borderRadius: 10,
                shadowColor: grayShadow,
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 5,
            }}
            onPress={params.onPress}>
            <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Helvetica-Bold' }}>
                {params.title}
            </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomButton