import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
} from 'react-native';
import { primary, white, black, gray, darkGray } from 'config/colors';
import { bold24 } from 'config/typography'
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from './BackButton';

const ImageHeader = ({navigation, title, image}) => {
    return (
        <View>
            <ImageBackground
                style={{
                    width: '100%',
                    height: 180,
                }}
                imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, backgroundSize: 'contain'}}
                source={{uri: image}}
                resizeMode={'cover'}
            >
                <LinearGradient
                    colors={['rgba(49,84,165, 0.8)', 'transparent', 'rgba(0,0,0,0.8)']}
                    style={{
                        backgroundColor: 'transparent',
                        height: '100%',
                        width: '100%',
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        position: 'absolute',
                    }}
                />
                <Text style={{...bold24, color: white, marginTop: 100, marginLeft: 40}}>
                    {title}
                </Text>
            </ImageBackground>
            <BackButton navigation={navigation} backgroundColor={primary} color={white}/>
        </View>
    )
}

export default ImageHeader