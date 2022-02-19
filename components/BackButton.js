import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primary, white } from 'config/colors';
//Note: THIS BACKBUTTON IS ONLY FOR THE BLUE BACKBUTTONS THAT ARE NOT PART OF THE COMPONENT: <Header/>
function BackButton({navigation}) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: primary,
                borderRadius: 10,
                borderColor: 'white',
                borderWidth: 1,
                position: 'absolute',
                left: 20,
                top: 40,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={22} color={'white'} />
        </TouchableOpacity>
    );
}

export default BackButton;