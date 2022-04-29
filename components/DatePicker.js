import React, { useState } from 'react'
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default ({setDates, dates, title}) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button title={title} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          //console.log(date)
          setDates([...dates, date])
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}