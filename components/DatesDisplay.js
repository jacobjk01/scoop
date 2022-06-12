import React, { useState } from 'react'
import { Button, Text, View } from 'react-native'
import moment from 'moment'
/**
 * 
 * @param {{dates, title}} props 
 * @returns 
 */
const DatesDisplay = (props) => {
  if (props.dates == null || props.dates == []) {
    return <Text>dates is null or []</Text>
  }
  return (
    <>
      <Text style={{marginLeft: 30}}>{props.title}</Text>
      {/* TODO: be able to remove dates */}
      {props.dates.map((date, i) => {
              return (
                <View key={i} style={{marginLeft: 60}}>
                  <Text >{moment(date).format("MMM DD LT")}</Text>
                </ View>
              )
            })}
    </>
  )
}

export default DatesDisplay