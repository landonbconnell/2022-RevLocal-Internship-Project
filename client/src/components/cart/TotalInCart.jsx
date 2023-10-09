import { Button } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const TotalInCart = ({ subtotal }) => {
  return (
    <>
      <h3>{`Subtotal: $${Math.abs(subtotal).toFixed(2)}`}</h3>
      <Link to="/checkout">
        <Button variant="contained" sx={{ width: '100%' }}>
          Checkout
        </Button>
      </Link>
    </>
  )
}

export const mapStateToProps = state => {
  return {
    subtotal: state.cart.subtotal
  }
}

export default connect(mapStateToProps)(TotalInCart)
