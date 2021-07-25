import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tours = () => {
    return(
        <SafeAreaView>
            <ScrollView style={{padding: 20, height: "100%"}}>
                <Text style={styles.titleText}>Explore around UCLA!</Text>
                <Text style={styles.baseText}>(the inferior school)</Text>
                <View style={{marginTop: 30}}>
                    <TextInput style={styles.input} placeholder={'Search'}></TextInput>
                    <Ionicons style={styles.searchicon} name={'search-outline'} size={25} color={'#656565'} />
                </View>
                <Text style={styles.sectionText}>Category</Text>
                <View style={{width: '100%', flexDirection: 'column', marginTop: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.recommendationbuttonleft}>
                            <View>
                                <Text style={styles.recommendationTitle}>UCLA Picks</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.recommendationbuttonright}>
                            <View>
                                <Text style={styles.recommendationTitle}>Outdoor Activities</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <TouchableOpacity style={styles.recommendationbuttonleft}>
                            <View>
                                <Text style={styles.recommendationTitle}>Sightseeing</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.recommendationbuttonright}>
                            <View>
                                <Text style={styles.recommendationTitle}>Bussin Food</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 30}}>
                    <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '700'}}>Popular Tours</Text>
                    <TouchableOpacity style={{position: 'absolute', right: 10, top: 3}}>
                        <View>
                            <Text style={{color: '#3D68CC'}}>See All ></Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList horizontal={true} data={[{key: 'Santa Monica', key: 'Westwood Tour'}]} renderItem={({item}) => (
                    <TouchableOpacity>
                        <View style={{backgroundColor: 'blue', height: 200}}></View>
                    </TouchableOpacity>
                )}/>
                    
            </ScrollView>
        </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Helvetica"
    },
    titleText: {
        fontSize: 30,
        fontWeight: '600'
    },
    sectionText: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 30,
        marginLeft: 10
    },
    input: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderColor: '#656565',
        borderRadius: 7,
        paddingLeft: 20
    },
    searchicon: {
        position: 'absolute',
        right: 10,
        top: 11
    },
    recommendationbuttonleft: {
        flex: 1,
        backgroundColor: "#3154A5",
        borderRadius: 7,
        height: 100,
        marginRight: 15
    }, 
    recommendationbuttonright: {
        flex: 1,
        backgroundColor: "#3154A5",
        borderRadius: 7,
        height: 100,
    },
    recommendationTitle: {
        marginTop: 15,
        marginLeft: 15,
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    }
});

export default Tours;