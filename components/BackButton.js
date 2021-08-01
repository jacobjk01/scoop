import React from 'react';
import { Button, StyleSheet } from 'react-native';
import colors from '../config/colors';
function BackButton(props) {
    return (
        <Button style={styles.button}  title="<"/>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        color: colors.white,
        position: 'absolute',
        width: 100,
        height: 100,
        left: 100,
        top:1000
    }
})

export default BackButton;