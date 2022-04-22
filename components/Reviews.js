import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Text,
} from 'react-native';

import { renderStars } from './Stars';

const Reviews = props => {
  const { reviews } = props;
  const renderCards = item => {
    return (
      <View style={styles.reviewCard}>
        {renderStars(item.item.stars)}
        <Text
          style={{
            marginTop: 5,
            fontSize: 14,
            color: '#9B9BA7',
            fontStyle: 'italic',
          }}>
          {item.item.tourName} - {item.item.year}
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>{item.item.comment}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={{ paddingBottom: 10 }}
      horizontal={false}
      data={reviews}
      renderItem={renderCards}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    // width: Dimensions.get('window').width - 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default Reviews;
