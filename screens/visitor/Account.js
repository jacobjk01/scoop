import React, {useState, useContext} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native';
import {UserContext} from 'contexts';
import SigninButton from 'components/SigninButton';
import SignoutButton from 'components/SignoutButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {black, white, primary, grayLight, grayDark, grayMed} from '../../config/colors';

const Account = ({navigation}) => {
    const {user, userAuth} = useContext(UserContext)
    const [dropdown, setDropdown] = useState(false)
    const [modal, setModal] = useState(false)
    const [interests, setInterests] = useState(['Publication', 'Biology Research', 'Dance', 'Photography', 'Art'])
    if (!user) {
        return
        <SafeAreaView>
            <Text>You are not logged in</Text>
            <SigninButton/>
            <SignoutButton/>
        </SafeAreaView>
    }

    const renderOptions = (icon, text, destination) => {
        return(
            <TouchableOpacity 
                style={{display: 'flex', flexDirection: 'row', padding: 20}}
                onPress={() => {
                    switch (text) {
                        case 'Become A Tour Guide':
                            setModal(true)
                            break
                        case 'My Trips':
                            navigation.navigate(destination)
                            break
                    }

                }}
            >
                <Ionicons name={icon} size={22} color={black}/>
                <Text style={{fontSize: 15, marginLeft: 10, color: black}}>
                    {text}
                </Text>
                <Ionicons name='chevron-forward-outline' size={22} color={grayDark} style={{marginLeft: 'auto'}}/>
            </TouchableOpacity>
        )
    }

    const renderInterests = () => {
        let rows = []
        for (let i = 0; i < interests.length; i++)
        rows.push(
            <View 
                style={{paddingHorizontal: 22, paddingVertical: 7, backgroundColor: primary, borderRadius: 20, marginVertical: 5}}
                key={i}
            >
                <Text style={{color: white, fontSize: 15}}>
                    {interests[i]}
                </Text>
            </View>
        )
        return rows
    }

    const renderDropdown = () => {
        return (
            <>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20}}>
                    <View>
                        <Text style={styles.dropdownTitle}>
                            YEAR
                        </Text>
                        <Text style={styles.dropdownInfo}>
                            Freshman
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.dropdownTitle}>
                            MAJOR
                        </Text>
                        <Text style={styles.dropdownInfo}>
                            Biology
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.dropdownTitle}>
                            HOMETOWN
                        </Text>
                        <Text style={styles.dropdownInfo}>
                            Irvine, CA
                        </Text>
                    </View>
                </View>
                <View style={{alignSelf: 'flex-start', marginTop: 25, width: '100%'}}>
                    <Text style={styles.dropdownTitle}>
                        INTERESTS
                    </Text>
                    <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                        {renderInterests()}
                    </View>
                </View>
            </>
        )
    }
    return (
        <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
            <ScrollView>
                <View style={{display: 'flex', alignSelf: 'center', alignItems: 'center', width: '70%', paddingTop: 40}}>
                    <Image 
                        source={require('../../images/brittany.png')}
                        style={{borderRadius: 50, width: 110, height: 110}}
                    />
                    <Text style={{color: black, fontSize: 18, marginTop: 20}}>Elizabeth</Text>
                    <Text style={{color: primary, fontSize: 17, top: -5, marginBottom: 5}}>UCLA</Text>
                    <TouchableOpacity style={{backgroundColor: primary, borderRadius: 20, display: 'flex', flexDirection: 'row', paddingLeft: 20, paddingRight: 10, paddingVertical: 5, marginBottom: 15, alignItems: 'center', width: 130}}>
                        <Text style={{color: white, fontSize: 14, marginRight: 'auto'}}>
                            Edit Profile
                        </Text>
                        <Ionicons name='chevron-forward-outline' size={22} color={white}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 15}}>
                        Loream ipsum ahkshkshksh kshkshk shks hksh kshksh asd asda asd awojaofuhauihf ahsd hsah
                    </Text>
                    {dropdown && 
                        renderDropdown()
                    }
                    <TouchableOpacity
                        style={{alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', marginVertical: 15, marginTop: 25}}
                        onPress={() => setDropdown(!dropdown)}
                    >
                        <Text style={{fontSize: 16, color: grayMed, marginRight: 5}}>
                            {dropdown?'Collapse':'Expand'}
                        </Text>
                        <Ionicons name={dropdown?'chevron-up-outline':'chevron-down-outline'} size={20} color={grayMed}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}/>
                <View style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
                    {renderOptions('compass-outline', 'My Trips', 'MyTrips')}
                    {renderOptions('chatbubble-ellipses-outline', 'Feedback')}
                </View>
                <View style={styles.divider}/>
                <View style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
                    {renderOptions('exit-outline', 'Log Out')}
                    {renderOptions('people-outline', 'Become A Tour Guide')}
                </View>
                <View style={[styles.divider,{marginBottom: 40}]}/>
            </ScrollView>
            <Modal transparent={true} visible={modal}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', height: '100%', width: '100%'}}>
                    <View style={{position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '90%', width: '100%', bottom: 0, backgroundColor: white, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{width: '75%', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 22, marginTop: 50, marginBottom: 20}}>Create a Tour Guide Account</Text>
                            <Text style={{fontSize: 15, textAlign: 'center'}}>You don't have an existing tour guide account, Are you interested in signing up as a tour guide?</Text>
                            <Image
                                source={require('../../images/tourGuideVector.png')}
                                style={{marginTop: 90, marginBottom: 20, height: 150, width: 150}}
                            />
                        </View>
                        <View style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', elevation: 20, backgroundColor: white}}>
                            <TouchableOpacity style={{borderRadius: 10, backgroundColor: primary, paddingVertical: 15, width: '90%', marginTop: 20, marginBottom: 10}}>
                                <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 18, color: white, alignSelf: 'center'}}>
                                    Yes, Create a Tour Guide Account
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{borderRadius: 10, backgroundColor: '#F2F2F2', paddingVertical: 15, width: '90%'}}
                                onPress={() => setModal(false)}
                            >
                                <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 18, color: black, alignSelf: 'center'}}>
                                    Maybe Later
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 0.75,
        backgroundColor: grayMed,
    },
    dropdownTitle: {
        fontSize: 15,
        color: '#456ECD',
        fontFamily: 'Helvetica-Bold'
    },
    dropdownInfo: {
        fontSize: 15,
        color: grayDark,
    
    }
})
export default Account;
