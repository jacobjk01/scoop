import React from 'react';
import { Icon } from 'react-native-elements';

import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Account from '../../screens/guide/Account';
import AccountEdit from '../../screens/guide/AccountEdit';
import AddTour from '../../screens/guide/AddTour';
import EditTour from '../../screens/guide/EditTour';
import Home from '../../screens/guide/Home';
import ManageTours from '../../screens/guide/ManageTours';
import Registration from '../../screens/guide/Registration';
import ViewTour from '../../screens/guide/ViewTour';

const HomeStack = ({navigation}) => {
    const HomeStack = createStackNavigator();
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Account" component={Account}/>
            <HomeStack.Screen name="AccountEdit" component={AccountEdit}/>
            <HomeStack.Screen name="AddTour" component={AddTour}/>
            <HomeStack.Screen name="EditTour" component={EditTour}/>
            <HomeStack.Screen name="Home" component={Home}/>
            <HomeStack.Screen name="ManageTours" component={ManageTours}/>
            <HomeStack.Screen name="Registration" component={Registration}/>
            <HomeStack.Screen name="ViewTour" component={ViewTour}/>
        </HomeStack.Navigator>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        position: 'absolute',
        left: 20,
        top: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HomeStack;