import React, { useState } from 'react'
import { Button, Text } from 'react-native'
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
      <Text>{props.title}</Text>
      {/* TODO: be able to remove dates */}
      {props.dates.map(date => {
              return (
                <>
                  <Text>{date.toString()}</Text>
                </>
              )
            })}
    </>
  )
}

export default DatesDisplay