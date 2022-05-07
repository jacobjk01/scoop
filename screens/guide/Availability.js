import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
  PanResponder,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { primary, white, gray, black } from 'config/colors';
import BackButton from 'components/BackButton';

//note: grid is kind of laggy when upsized, will work on fixing
const Availability = ({navigation, route}) => {
  const tour = route.params;
  //width and height of the grid
  const width = 250;
  const height = 600;
  //number of rows and columns in the grid
  const Nrows = 24;
  const Ncolumns = 7;

  //position of topleft corner of grid
  const [XOffset, setXOffset] = useState(0)
  const [YOffset, setYOffset] = useState(0)
  //how far down the user is scrolled
  const [scrollAmount,setScrollAmount] = useState(0)
  //the block that the finger is currently touching, we need this so that if a finger is hovering over a block, it doesnt highlight unhighlight over and over
  const [hoveredBlock, setHoveredBlock] = useState(null)
  //the blocks that are highlighted, fills everything with false
  const [markedBlocks, setMarkedBlocks] = useState(new Array(Ncolumns).fill().map(_ => new Array(Nrows).fill(false)))

  let panResponder = PanResponder.create({
    //should This panResponder start calling functions (onPanResponderMove), in this case it will always if finger starts in the view it is attached to
    onMoveShouldSetPanResponder: () => true,
    //starts calling these functions when finger moves
    onPanResponderMove: (_, gesture) => {
      //calculates which index of the grid the finger is in
      let rowIndex = Math.floor((gesture.moveX - XOffset)/(width/Ncolumns))
      let columnIndex = Math.floor((gesture.moveY + scrollAmount - YOffset)/(height/Nrows))
      //checks if finger is hovering the same block for the reason mentioned in the comment above hoveredBlocks, also checks if finger is outside of the grid
      if (hoveredBlock != (columnIndex * Ncolumns) + rowIndex &&
      rowIndex < Ncolumns &&
      rowIndex >= 0 &&
      columnIndex < Nrows && columnIndex >= 0) {
        let temp = markedBlocks
        temp[rowIndex][columnIndex] = !markedBlocks[rowIndex][columnIndex]
        setHoveredBlock((columnIndex*Ncolumns) + rowIndex)
        setMarkedBlocks(temp)
      }
    },
    //hoverd block goes to null when finger is lifted
    onPanResponderRelease: () => {
      setHoveredBlock(null)
    },

  });

  const renderForeground = () => {
    return (
      <View style={{flex: 1, borderRadius: 15}}>
        <ImageBackground
          style={styles.imageHeader}
          imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
          source={require('images/Westwood_village.jpg')}>
          <LinearGradient
            colors={['transparent', black]}
            style={styles.linearGradTour}
            />
          <View style={styles.imageOverlay}>
            <Text style={styles.bold24}>
              {tour.name}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  //creates an area with width and height as specified in state, with Nrows and Ncolumns
  const blocks = () => {
    let blocks = []

    if (typeof markedBlocks != null) {
      for (let i = 0; i < Nrows; i++) {
        let rows = []
        for(let j = 0; j < Ncolumns; j++) {
          rows.push(
            <TouchableOpacity 
              style={{
                height: `${(1/Nrows) * 100}%`,
                width: `${(1/Ncolumns) * 100}%`,
                backgroundColor: markedBlocks[j][i]?primary:white,
                borderWidth: 0.5,
                borderColor: gray
              }}
              onPress={() => {
                let temp = [...markedBlocks]
                temp[j][i] = !markedBlocks[j][i]
                setMarkedBlocks(temp)
              }}
              key={(i * Ncolumns) + j}
            />
          )
        }
        blocks.push(rows)
      }
    }
    return blocks
  }

  return (
    <View style={{backgroundColor: white}}>
      {/*gets the scroll amount so that grid doesnt highlight wrong blocks */}
      <ScrollView
        onScroll={({nativeEvent}) => {
          setScrollAmount(nativeEvent.contentOffset.y)
        }}
      >
        {renderForeground()}
        <Text style={{fontFamily: 'Helvetica-Bold', marginLeft: 'auto', marginRight: 'auto', marginVertical: 20, fontSize: 18}}>
          Availability
        </Text>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}>
          <Text
            style={{fontSize: 12}}
          >SUN     MON     TUE     WED     THU     FRI     SAT</Text>
        </View>
        <View style={{position: 'absolute', fontSize: 12, top: 290, left: 32}}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 25,
              textAlign: 'right'
            }}
          >
            12 AM{'\n'}1 AM{'\n'}2 AM{'\n'}3 AM{'\n'}4 AM{'\n'}5 AM{'\n'}6 AM{'\n'}7 AM{'\n'}8 AM{'\n'}9 AM{'\n'}10 AM{'\n'}11 AM{'\n'}12 PM{'\n'}1 PM{'\n'}2 PM{'\n'}3 PM{'\n'}4 PM{'\n'}5 PM{'\n'}6 PM{'\n'}7 PM{'\n'}8 PM{'\n'}9 PM{'\n'}10 PM{'\n'}11 PM{'\n'}
          </Text>

        </View>
        <View
        onLayout={({nativeEvent}) => {
          setXOffset(nativeEvent.layout.x)
          setYOffset(nativeEvent.layout.y)
        }}
          style={{
            height: height,
            width: width,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            borderRadius: 5,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          {...panResponder.panHandlers}
        >
          {blocks()}
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => setMarkedBlocks(new Array(Ncolumns).fill().map(_ => new Array(Nrows).fill(false)))}
            style={{
              paddingHorizontal: 9,
              paddingVertical: 6,
              backgroundColor: primary,
              borderRadius: 5,
              marginVertical: 20,
            }}
          >
            <Text style={{color: white,}}>
              Clear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 9,
              paddingVertical: 6,
              backgroundColor: primary,
              borderRadius: 5,
              marginVertical: 20,
            }}
          >
            <Text style={{color: white,}}>
              Submit
            </Text>
          </TouchableOpacity>

        </View>

        <BackButton navigation={navigation}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  bold24: {
    fontSize: 32,
    fontWeight: '600',
    color: white,
    top: 80,
  },
  imageHeader: {
    width: '100%',
    height: 200,
    zIndex: -10,
    paddingTop: 100,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 110,
    paddingLeft: 40,
  },
  linearGradTour: {
    position: 'absolute',
    top: 150,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
});

export default Availability;
