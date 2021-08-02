import React from 'react';
import {Image, StyleSheet} from 'react-native';

function PictureIcon(props) {
    const {source, size} = props;

    const styles = StyleSheet.create({
        image: {
            borderRadius: 9999,
            width: size,
            height: size
        }
    })
    
    return (
        <Image style={styles.image} source={source} />
    );
}

export default PictureIcon;