import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import '../../style/products.css'

const SelectQuantity = ({ value, onChange }) => {
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  return (
    <Select
      value={value}
      onChange={onChange}
      className="quantity"
      displayEmpty
      input={<OutlinedInput />}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100
          }
        }
      }}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      {quantities.map(number => (
        <MenuItem key={`quantity #${number}`} value={number}>
          {number}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectQuantity
