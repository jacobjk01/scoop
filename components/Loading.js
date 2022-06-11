import React, { useState } from 'react'
import { Button, Text, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native'

export default () => {

  return (
    <>
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{height: '100%'}}>
        <ActivityIndicator size='large' />
      </ScrollView>
    </SafeAreaView>
    </>
  )
}