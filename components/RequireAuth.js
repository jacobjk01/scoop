import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { onAuthStateChanged } from 'api/auth';
import { getUser } from 'api/users';
import { UserContext } from 'contexts';

export default RequireAuth = (Component) => {
    const AuthIntermediary = (props) => {
        const {userAuth, setUserAuth, user, setUser, isUserLoading, setIsUserLoading} = useContext(UserContext);

        return (
            <>
                { isUserLoading ? <SafeAreaView>
                    <Text>Loading</Text>
                    <Text>Loading</Text>
                    <Text>Loading</Text>
                    <Text>Loading</Text> 
                    <Text>Loading</Text>
                    <Text>Loading</Text>  
                </SafeAreaView> : user ? <Component {...props}/> : <Text>Not Registered</Text>} 
            </>
        );
    };
    return AuthIntermediary;
}