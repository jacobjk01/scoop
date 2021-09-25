import React from 'react';
import {Image, StyleSheet} from 'react-native';

function PictureIcon(props) {
    const {source, size} = props;

    if (!source || !size) {
        throw new Error('PictureIcon requires the props: source and size');
    }
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