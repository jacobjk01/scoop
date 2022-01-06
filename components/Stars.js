import React, { Component } from 'react';

import { View, Image } from 'react-native';

export const renderStars = count => {
  let fullstars = Math.floor(count);
  var decimal = Math.ceil(10 * (count - Math.floor(count)));
  let emptystars = Math.floor(5 - count - 0.1);
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from(Array(fullstars).keys()).map(() => {
        return (
          <Image
            style={{ width: 16, height: 16, marginRight: 8 }}
            source={require('../images/stars/filledstar.png')}
          />
        );
      })}

      {renderPartialStar(decimal)}
      {Array.from(Array(emptystars).keys()).map(() => {
        return (
          <Image
            style={{ width: 16, height: 16, marginRight: 4 }}
            source={require('../images/stars/star0.png')}
          />
        );
      })}
    </View>
  );
};

const renderPartialStar = decimal => {
  //NOTE(jonathanng jacob) - require does not work with dynamic strings so unforunately we cannot make this simplier
  //https://stackoverflow.com/questions/37241662/using-require-with-a-variable-vs-using-a-string-in-webpack/37241982
  switch (decimal) {
    case 0:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require("" + `../images/stars/star0.png`)}
        />
      );
    case 1:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star1.png')}
        />
      );
    case 2:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star2.png')}
        />
      );
    case 3:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star3.png')}
        />
      );
    case 4:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star4.png')}
        />
      );
    case 5:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star5.png')}
        />
      );
    case 6:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star6.png')}
        />
      );
    case 7:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star7.png')}
        />
      );
    case 8:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star8.png')}
        />
      );
    case 9:
      return (
        <Image
          style={{ width: 16, height: 16, marginRight: 4 }}
          source={require('../images/stars/star9.png')}
        />
      );
  }
};
