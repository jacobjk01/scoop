import React, {useState, useContext} from 'react';
import {
    Text,
    SafeAreaView,
} from 'react-native';
import {UserContext} from 'contexts';
import SigninButton from 'components/SigninButton';
import SignoutButton from 'components/SignoutButton';

const Account = ({navigation}) => {
    const {user, userAuth} = useContext(UserContext)
    if (!user) {
        return <SafeAreaView>
            <Text>You are not logged in</Text>
            <SigninButton/>
            <SignoutButton/>
        </SafeAreaView>
    }
    console.log(user)
    return (
    <SafeAreaView>
        <Text>Username: {user.name}</Text>
        <Text>{userAuth.email}</Text>
        <Text>UserType: {user.type}</Text>
        <Text>Account Visitor Page</Text>
    </SafeAreaView>
    )
};

export default Account;
