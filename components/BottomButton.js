import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { primary, white, black, lightGray } from 'config/colors';

const BottomButton = (params) => {
    let disabled
    if (params.disabled != undefined){
        disabled = params.disabled()
    }

    return (
        <View
            style={{
                backgroundColor: white,
                height: 80,
                width: '100%',
                position: 'absolute',
                bottom: 0,
                elevation: 10,
                zIndex: 100,

                shadowColor: black,
                shadowOpacity: 1,
                shadowOffset: {width: 0, height: 2},
            }}
        >
            <TouchableOpacity
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    width: '80%',
                    backgroundColor: disabled?white:primary,
                    height: 50,
                    justifyContent: 'center',
                    borderRadius: 10,
                    shadowColor: black,
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    elevation: 10,
                    borderWidth: 1,
                    borderColor:disabled?lightGray:primary
                }}
                onPress={params.onPress}
            >
                <Text style={{ alignSelf: 'center', color: disabled?lightGray:white, fontFamily: 'Helvetica-Bold', fontSize: 18 }}>
                    {params.title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomButton