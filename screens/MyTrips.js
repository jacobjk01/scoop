import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native'
import colors, {black, grayDark, grayLight, grayMed, white, primary} from '../config/colors';
import BackButton from 'components/BackButton';

const MyTrips = ({navigation}) => {
    const [option, setOption] = useState('upcoming')

    const renderTrips = () => {
        if (option === 'upcoming') {
            return(
                <View style={{marginTop: 30}}>
                    <View style={{borderRadius: 15, elevation: 10, backgroundColor: white, marginVertical: 10}}>
                        <Image
                            source={require('../images/Westwood_village.jpg')}
                            style={{width: '100%', height: 155, borderTopLeftRadius: 15, borderTopRightRadius: 15}}
                        />
                        <View style={{paddingLeft: 20, paddingTop: 7, paddingBottom: 20}}>
                            <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 18}}>
                                Westwood Tour
                            </Text>
                            <Text style={{fontSize: 16, paddingVertical: 4}}>
                                Tour Guide : Brittany
                            </Text>
                            <Text style={{fontSize: 16}}>
                                {'Date & Time : Jul 14 12:00 PM'}
                            </Text>
                        </View>
                    </View>
                    <View style={{borderRadius: 15, elevation: 10, backgroundColor: white, marginVertical: 10}}>
                        <Image
                            source={require('../images/Westwood_village.jpg')}
                            style={{width: '100%', height: 155, borderTopLeftRadius: 15, borderTopRightRadius: 15}}
                        />
                        <View style={{paddingLeft: 20, paddingTop: 7, paddingBottom: 20}}>
                            <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 18}}>
                                Westwood Tour
                            </Text>
                            <Text style={{fontSize: 15, paddingVertical: 4}}>
                                Tour Guide : Brittany
                            </Text>
                            <Text style={{fontSize: 15}}>
                                {'Date & Time : Jul 14 12:00 PM'}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
        else if (option === 'past'){
            return <View></View>
        }
        else if (option === 'cancelled'){
            return <View></View>
        }
        return <View></View>
    }
    const renderButtons = (type) => {
        return (
            <TouchableOpacity
                style={{backgroundColor: option === type?"#98AAD2":white, paddingHorizontal: 18, borderRadius: 30, paddingVertical: 10, marginHorizontal: 5}}
                onPress={() => setOption(type)}
            >
                <Text style={{fontSize: 16, color: option === type?primary:grayMed}}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
            </TouchableOpacity>
        )
    }
    return(
        <SafeAreaView style={{backgroundColor: white, height: '100%', width: '100%'}}>
            <ScrollView>
                <BackButton navigation={navigation}/>
                <View style={{marginHorizontal: 30, marginTop: 100, marginBottom: 30}}>
                    <Text style={{fontSize: 25, fontFamily:'Helvetica-Bold'}}>
                        My Trips
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                        {renderButtons('upcoming')}
                        {renderButtons('past')}
                        {renderButtons('cancelled')}
                    </View>
                    {renderTrips('upcoming')}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default MyTrips