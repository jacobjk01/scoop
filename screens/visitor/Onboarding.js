import React, { useContext, useEffect, useState} from 'react'
import { View, SafeAreaView, Text, Button, TextInput, StyleSheet, Image} from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler'
import { UserContext } from '../../contexts'
import {black, white, gray, grayLight, primary} from '../../config/colors.js'
import {reg16, bold18} from '../../config/typography.js'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default  ({navigation}) => {
    const {
        userAuth, setUserAuth,
        user, setUser,
        isUserLoading, setIsUserLoading,
        mode, setMode,
        guideDone, setGuideDone,
        visitorDone, setVisitorDone,
        visitorBone, setVisitorBone, hasNotFinishedBareOnboarding} = useContext(UserContext);
        
    useEffect(() => {
        if (mode != 'visitor') {
            setMode('visitor');
        }
        return () => {
        }
    }, [])
    const [page, setPage] = useState(1)
    const [data, setData] = useState(['-','-','-','-']);
    const [dropdown, setDropdown] = useState(false)

    const marks = () => {
        return (
            <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', top: 60, position: 'absolute'}}>
                <View style={page == 1 ? styles.oval: styles.dots}/>
                <View style={page == 2 ? styles.oval: styles.dots}/>
                <View style={page == 3 ? styles.oval: styles.dots}/>
                <View style={page == 4 ? styles.oval: styles.dots}/>
                <View style={page == 5 ? styles.oval: styles.dots}/>
            </View>
        )
    }
    const dropdownIcon = () => {
        return (
            <Ionicons
                name={'caret-down-outline'}
                size={24}
                color={primary}
            />
        )
    }

    const renderDropdown = (options, dropdownType) => {
        const rows = []
        let index
        if (dropdownType == 'school') {
            index = 1
        }
        else if (dropdownType == 'type') {
            index = 2
        }
        for(let i = 0; i < options.length; i++) {
            rows.push(
                <TouchableOpacity
                    style={{ paddingVertical: 8, paddingLeft: 15, borderColor: gray, borderBottomWidth: i != options.length - 1?0.5:0}}
                    key={i}
                    onPress={() => {
                        let temp = [...data]
                        temp[index] = options[i] 
                        setData(temp)
                        setDropdown(false)
                    }}    
                >
                    <Text style={{...reg16}}>
                        {options[i]}
                    </Text>

                </TouchableOpacity>
            )
        }

        return (
            <View style={{marginBottom: 25}}>
                <TouchableOpacity 
                    style={{        borderWidth: 0.75,
                        borderLeftWidth: 1.25,
                        borderRightWidth: 1.25,
                        borderColor: gray,
                        width: '100%',
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5, display: 'flex',flexDirection: 'row',paddingVertical: 8, paddingHorizontal: 15,marginTop: 40, 
                    borderBottomRightRadius: dropdown == true? 0: 5,borderBottomLeftRadius: dropdown == true? 0: 5, }}
                    onPress={() => setDropdown(!dropdown)}
                >
                    <Text style={{marginRight: 'auto', fontSize: 18, color: data[index]!='-'?black:gray}}>{data[index]}</Text>
                    {dropdownIcon()}
                </TouchableOpacity>
                {dropdown && 
                    <View style={{borderTopRightRadius: dropdown == true? 0: 5, borderTopLeftRadius: dropdown == true? 0: 5, borderRadius: 5, borderWidth: 1, borderColor: gray, borderTopWidth: 0, position: 'absolute', width: '100%', backgroundColor: 'white', zIndex: 100, top: 83.8}}>
                        {rows}
                    </View>
                }
            </View>
        )
    }

    const inputType = () => {
        let schoolOptions = ['UCLA', 'UC Berkeley',]
        let typeOptions = ['High School Student', 'Freshman', 'Sophmore', 'Junior', 'Senior', 'Parents']

        switch (page) {
            case 1:
                return(
                    <TextInput
                        style={{
                            borderWidth: 0.75,
                            borderRadius: 5,
                            borderColor: gray,
                            width: '100%',
                            fontSize: 18,paddingHorizontal: 20, paddingVertical: 7, marginTop: 40, marginBottom: 25
                        }}
                        placeholder={'First Name'}
                        onChangeText={(text) => {
                            let temp = [...data]
                            temp[0] = text
                            setData(temp)
                        }}
                    />
                )
            case 2:
                return(renderDropdown(schoolOptions, 'school'))
            case 3:
                return(renderDropdown(typeOptions, 'type'))
            case 4:
                return(
                    <TextInput
                        style={{
                            borderWidth: 0.75,
                            borderRadius: 5,
                            borderColor: gray,
                            width: '100%',
                            fontSize: 18, paddingHorizontal: 20, paddingVertical: 7, marginTop: 40,marginBottom: 25}}
                        onChangeText={(text) => {
                            let temp = [...data]
                            temp[3] = text
                            setData(temp)
                        }}
                    />
                )
        }
    }

    const renderButtons = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                <TouchableOpacity 
                    style={{borderWidth: 1.25, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 7, borderColor: primary}}
                    onPress={() => {
                        if (page === 1) {
                            navigation.goBack()
                        } else if (page > 1) {
                            setPage(page - 1)
                        }
                            
                        } 
                    }
                >
                    <Text style={{color: primary, ...bold18, textAlign: 'center'}}>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{borderWidth: 1.25, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 7,  borderColor: data[page - 1] != '-'?primary:gray, backgroundColor: data[page - 1] != '-'?primary:white,}}
                    onPress={() => {
                        if (data[page - 1] != '-')
                            setPage(page + 1)
                    }}
                >
                    <Text style={{...bold18, textAlign: 'center', color: data[page - 1] != '-'?white:gray,}}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const mainSection = () => {
        let question
        let positionTop
        // For the Text that is 2 lines
        switch (page) {
            case 1:
                positionTop = 0
                question = 'Enter your name'
                break;
            case 2:
                positionTop = 0
                question = 'Select Your School'
                break
            case 3:
                positionTop = -10
                question = 'Which of the following best describes you'
                break
            case 4:
                positionTop = -10
                question = 'What major are you interested in?'
                break
        }
        if (page == 5) {
            return (
                <View style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto'}}>
                    <Text style={{...bold18, width: '70%', textAlign: 'center', paddingBottom: 10}}>
                        You are all set!
                    </Text>
                    <Text style={{color: gray}}>
                        You can add more info in your profile page
                    </Text>
                    <Image
                        source={require('../../images/onboardingHuman.png')}
                        style={{marginTop: 60, marginBottom: 30, marginLeft: 23}}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setVisitorBone(true);
                            setPage(0)
                        }}
                        style={{backgroundColor: primary, paddingLeft: 20, paddingRight: 10, paddingVertical: 10, borderRadius: 30, display:'flex', flexDirection: 'row'}}
                    >
                        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 16, color: white, textAlign: 'center'}}>
                            Start Exploring
                        </Text>
                        <Ionicons
                            style={{paddingLeft: 3, marginTop: 'auto', marginBottom: 'auto'}}
                            name={'chevron-forward-outline'}
                            size={20}
                            color={white}
                        />
                    </TouchableOpacity>
                </View>

            )
        }
        else {
            return (
                <View style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto'}}>
                    <Text style={{...bold18, textAlign: 'center', width: '70%', top: positionTop, position: 'absolute'}}>
                        {question}
                    </Text>
                    <View style={{height: 10}}/>
                    {inputType()}
                    {dropdown ? <View style={{ height: 37 }}></View> : renderButtons()}
                    {page == 1 && false &&
                        <TouchableOpacity
                            disabled={page!=1}
                            style={{width: 300, height: 50, elevation: 15, position: 'relative', top: 0, zIndex: 100, backgroundColor: white}}
                            onPress={() => {
                                setVisitorBone(true)
                                console.log(hasNotFinishedBareOnboarding)
                            }}
                        >
                            <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop:'auto'}}>
                                Skip (DEV - TODO - DELETE WEN LAUNCH)
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            )
        }
    }
    
    return (
        <SafeAreaView style={{height: '100%', backgroundColor: white, flex: 1}}>
            {marks()}
            {mainSection()}
            <TouchableOpacity
                disabled={page < 3 || page > 4}
                style={{color: gray, alignSelf:'center', paddingBottom: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', }}
                onPress={() => setPage(page + 1)}
            >
                {page >= 3 && page <= 4 &&
                    <>
                        <Text style={{color: gray, ...reg16}}>
                            Skip
                        </Text>
                        <Ionicons 
                            name="chevron-forward-outline"
                            color={gray}
                            size={15}
                            style={{top: 1.5}}
                        />
                    </>
                }
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        backgroundColor: black
    },
    oval: {
        backgroundColor: primary,

        width: 40,
        height: 13.5,
        borderRadius: 20,
        marginHorizontal: 8,
    },
    dots: {
        borderColor: primary,
        borderWidth: 1.25,
        width: 13.5,
        height: 13.5,
        borderRadius: 20,
        marginHorizontal: 8,
    },
})
