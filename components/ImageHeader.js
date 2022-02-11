import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
} from 'react-native';
import { primary, white, black, grayDark, grayMed } from 'config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ImageHeader = ({navigation, title}) => {
    return (
        <View>
            <ImageBackground
                style={{
                    width: '100%',
                    height: 180,
                }}
                imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
                source={require('images/Westwood_village.jpg')}
            >
                <LinearGradient
                    colors={[primary, 'transparent', black]}
                    style={{
                        backgroundColor: 'transparent',
                        height: '100%',
                        width: '100%',
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15
                    }}
                />
                <View style={{
                        position: 'absolute',
                        bottom: 110,
                        paddingLeft: 40,
                }}>
                    <Text style={{
                            fontWeight: '700',
                            fontSize: 32,
                            fontFamily: 'Helvetica',
                            color: white,
                            top: 80,
                    }}>
                    {title}
                    </Text>
                </View>
            </ImageBackground>
            <TouchableOpacity
                style={{
                    backgroundColor: primary,
                    borderRadius: 10,
                    borderColor: white,
                    borderWidth: 1,
                    position: 'absolute',
                    left: 20,
                    top: 40,
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                }}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Ionicons name='chevron-back-outline' size={20} color={white} />
            </TouchableOpacity>
        </View>
    )
}

export default ImageHeader