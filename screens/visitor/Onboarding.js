import React, { useContext, useEffect, useState} from 'react'
import { View, SafeAreaView, Text, Button, TextInput, StyleSheet, Image} from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler'
import { UserContext } from '../../contexts'
import {black, white, grayMed, grayDark, grayLight, primary} from '../../config/colors.js'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default  ({navigation}) => {
    const {
        userAuth, setUserAuth,
        user, setUser,
        isUserLoading, setIsUserLoading,
        mode, setMode,
        guideDone, setGuideDone,
        visitorDone, setVisitorDone,
        visitorBone, setVisitorBone} = useContext(UserContext);
        
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
            <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', top: -5}}>
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
                    style={{paddingVertical: 8, paddingLeft: 15, borderColor: grayDark, borderBottomWidth: i != options.length - 1?0.5:0}}
                    key={i}
                    onPress={() => {
                        let temp = [...data]
                        temp[index] = options[i] 
                        setData(temp)
                        setDropdown(false)
                    }}    
                >
                    <Text style={{fontSize: 18}}>
                        {options[i]}
                    </Text>

                </TouchableOpacity>
            )
        }

        return (
            <View style={{marginBottom: 25}}>
                <TouchableOpacity 
                    style={[styles.dropdownButton, {borderBottomRightRadius: dropdown == true? 0: 5,borderBottomLeftRadius: dropdown == true? 0: 5, }]}
                    onPress={() => setDropdown(!dropdown)}
                >
                    <Text style={{marginRight: 'auto', fontSize: 18, color: data[index]!='-'?black:grayDark}}>{data[index]}</Text>
                    {dropdownIcon()}
                </TouchableOpacity>
                {dropdown && 
                    <View style={{borderTopRightRadius: dropdown == true? 0: 5, borderTopLeftRadius: dropdown == true? 0: 5, borderRadius: 5, borderWidth: 1, borderColor: grayDark, borderTopWidth: 0, position: 'absolute', width: '100%', backgroundColor: 'white', zIndex: 100, top: 83.8}}>
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
                        style={styles.inputStyle}
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
                        style={styles.inputStyle}
                        onChangeText={(text) => {
                            let temp = [...data]
                            temp[3] = text
                            setData(temp)
                        }}
                    />
                )
        }
    }

    const mainSection = () => {
        let question
        let positionTop
        // For the Text that is 2 lines
        switch (page) {
            case 1:
                positionTop = 4
                question = 'Enter your name'
                break;
            case 2:
                positionTop = 4
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
                <View style={{width: '80%', height: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 20, width: '70%', textAlign: 'center',}}>
                        You are all set!
                    </Text>
                    <Text style={{color: grayMed}}>
                        You can add more info in your profile page
                    </Text>
                    <Image
                        source={require('../../images/onboardingHuman.png')}
                        style={{marginVertical: 30}}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setVisitorBone(true);
                            setPage(0)
                        }}
                        style={{backgroundColor: primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30}}
                    >
                        <Text style={{fontSize: 18, fontFamily: 'Helvetica-Bold', color: white}}>
                            Start Exploring
                        </Text>
                    </TouchableOpacity>
                </View>

            )
        }
        else {
            return (
                <View style={{width: '80%', height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 20, width: '70%', textAlign: 'center', top: positionTop, position: 'absolute'}}>
                        {question}
                    </Text>
                    <View style={{height: 10}}/>
                    {inputType()}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <TouchableOpacity 
                            style={{borderWidth: 1.25, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 7, borderColor: primary}}
                            onPress={() => {
                                if (page > 1)
                                    setPage(page - 1)
                                }
                            }
                        >
                            <Text style={{fontSize: 18, color: primary, fontFamily: 'Helvetica-Bold'}}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{borderWidth: 1.25, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 7,  borderColor: data[page - 1] != '-'?primary:grayMed, backgroundColor: data[page - 1] != '-'?primary:white,}}
                            onPress={() => {
                                if (data[page - 1] != '-')
                                    setPage(page + 1)
                            }}
                        >
                            <Text style={{fontSize: 18, color: data[page - 1] != '-'?white:grayMed, fontFamily: 'Helvetica-Bold'}}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    
    return (
        <SafeAreaView style={{height: '100%', backgroundColor: white}}>
            <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back-outline" size={22} color={white} />
            </TouchableOpacity>
            {marks()}
            {mainSection()}
            {page >= 3 && page <= 4 &&
                <TouchableOpacity 
                    style={{color: grayMed, alignSelf:'center', padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setPage(page + 1)}
                >
                            <Text style={{color: grayDark, fontSize: 13}}>
                                skip
                            </Text>
                            <Ionicons 
                                name="chevron-forward-outline"
                                color={grayDark}
                                size={15}
                                style={{top: 1}}
                            />
                </TouchableOpacity>
            }
            {page == 1 &&
                <Button
                    onPress={() => {
                        setVisitorBone(true)
                    }} title={'Skip Onboarding'}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdownButton: {
        marginTop: 40,
        borderWidth: 0.75,
        borderLeftWidth: 1.25,
        borderRightWidth: 1.25,
        borderColor: grayDark,
        width: '100%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    itemStyle: {
        backgroundColor: black
    },
    inputStyle: {
        borderWidth: 0.75,

        borderRadius: 5,
        borderColor: grayDark,
        paddingHorizontal: 20,
        paddingVertical: 7,
        width: '100%',
        marginTop: 40,
        marginBottom: 25,
        fontSize: 18,
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
    backIcon: {
        backgroundColor: primary,
        borderRadius: 10,
        borderColor: white,
        borderWidth: 1,
        left: 20,
        top: 22,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',

      },
})
