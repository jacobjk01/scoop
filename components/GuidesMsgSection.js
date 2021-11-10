import React from 'react'
import { Text, FlatList, View, StyleSheet, TouchableOpacity, LinearGradient, ImageBackground, Image } from 'react-native'
import colors from 'config/colors'
import PictureIcon from './PictureIcon'
export default function GuidesMsgSection({tourGuides}) {
    return (
        <View>
            <Text style={styles.guideTitle}>Tour Guides</Text>
            <FlatList style={{marginTop: 10}} horizontal={true} 
                data={tourGuides} renderItem={({item}) => {                     
                    return <View style={[styles.container, ]}>
                        <PictureIcon source={item.picture} size={60}/>
                        <Text style={[styles.guideText]}>{item.name}</Text>
                    </View>  
                }
                }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    linearGradGuide: {
        position: 'absolute',
        top: 60,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        borderRadius: 10
    },
    guideTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    guideText: {
        color: colors.black,
        fontWeight: 'bold',
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 14
    }
});
