import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { onAuthStateChanged } from '../api/auth';
import { getUser } from '../api/users';

export default RequireAuth = (Component) => {
    const AuthIntermediary = (props) => {
        const [authenticated, setAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);
    

        useEffect(() => {
            var unsubscribe = onAuthStateChanged(async user => {
                if (user) {
                    setAuthenticated(true);
                    setLoading(false);
                    console.log("logged in");
                };
            });
            return () => {
                unsubscribe();
            };
        });
        // return Component;
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {loading ? console.log("loading") : authenticated ? <Component></Component> : console.log("NOT AUTHENTICATED")} 
            </SafeAreaView>
        );
    };
    console.log("got here")
    return AuthIntermediary;
    // return Component;
}