import React from 'react'
import Button from '@mui/material/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const AddToCart = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className="add-to-cart"
      endIcon={<ShoppingCartIcon />}
    >
      Add to Cart
    </Button>
  )
}

export default AddToCart
