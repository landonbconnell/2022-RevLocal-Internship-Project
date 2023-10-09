import React, { useState } from 'react'
import { Badge, Grid, Drawer, ClickAwayListener } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import { connect } from 'react-redux'
import '../../style/Header.css'
import ProductInCart from '../cart/ProductInCart'
import TotalInCart from '../cart/TotalInCart'

export const ShoppingCart = ({ cart, totalItemsInCart }) => {
  const [open, setOpen] = useState(false)

  return (
    <Grid
      container
      sx={{
        justifyContent: 'right',
        alignItems: 'center'
      }}
    >
      <Grid item className="shopping-cart" sx={{ paddingRight: '1.875rem' }}>
        <IconButton onClick={() => setOpen(true)}>
          <Badge badgeContent={totalItemsInCart} color="error">
            <ShoppingCartIcon sx={{ width: '2.5rem', height: '2.5rem' }} />
          </Badge>
        </IconButton>
        <ClickAwayListener
          onClickAway={() => open && setOpen(false)}
          mouseEvent="onMouseDown"
        >
          <Drawer
            open={open}
            anchor={'right'}
            onClose={() => setOpen(false)}
            variant="persistent"
            PaperProps={{
              sx: { width: '30%' }
            }}
          >
            {cart.length > 0 ? (
              <>
                {cart.map(product => (
                  <ProductInCart
                    key={product.product}
                    id={product.product}
                    price={product.price}
                    quantity={product.quantity}
                  />
                ))}
                <TotalInCart />
              </>
            ) : (
              <h1>No Items In Cart</h1>
            )}
          </Drawer>
        </ClickAwayListener>
      </Grid>
    </Grid>
  )
}

export const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    totalItemsInCart: state.cart.totalItemsInCart
  }
}
export default connect(mapStateToProps)(ShoppingCart)
