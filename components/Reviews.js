import React, {Component} from 'react';

import {View, StyleSheet, FlatList, Dimensions} from 'react-native';

const renderReviews = reviews => {
  const renderStars = count => {
    let fullstars = Math.floor(count);
    var decimal = Math.ceil(10 * (count - Math.floor(count)));
    let emptystars = Math.floor(5 - count - 0.1);
    return (
      <View style={{flexDirection: 'row'}}>
        {Array.from(Array(fullstars).keys()).map(() => {
          return (
            <Image
              style={{width: 16, height: 16, marginRight: 4}}
              source={require('../images/stars/filledstar.png')}
            />
          );
        })}

        {renderPartialStar(decimal)}
        {Array.from(Array(emptystars).keys()).map(() => {
          return (
            <Image
              style={{width: 16, height: 16, marginRight: 4}}
              source={require('../images/stars/star0.png')}
            />
          );
        })}
      </View>
    );
  };

  const renderPartialStar = decimal => {
    switch (decimal) {
      case 0:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star0.png')}
          />
        );
      case 1:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star1.png')}
          />
        );
      case 2:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star2.png')}
          />
        );
      case 3:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star3.png')}
          />
        );
      case 4:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star4.png')}
          />
        );
      case 5:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star5.png')}
          />
        );
      case 6:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star6.png')}
          />
        );
      case 7:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star7.png')}
          />
        );
      case 8:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star8.png')}
          />
        );
      case 9:
        return (
          <Image
            style={{width: 16, height: 16, marginRight: 4}}
            source={require('../images/stars/star9.png')}
          />
        );
    }
  };

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
        <Text style={{marginTop: 5}}>{item.item.comment}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={{paddingBottom: 10}}
      horizontal={false}
      data={reviews}
      renderItem={renderCards}
    />
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default renderReviews;
