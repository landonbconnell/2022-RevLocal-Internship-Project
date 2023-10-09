import React, { useState, useEffect } from 'react'
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Checkbox
} from '@mui/material'
import axios from 'axios'
import { connect } from 'react-redux'
import ProductInCart from '../components/cart/ProductInCart'
import '../style/checkout.css'
import { useNavigate } from 'react-router-dom'

export const CheckoutPage = ({
  isLoggedIn,
  userId,
  firstName,
  lastName,
  cart,
  subtotal,
  totalItemsInCart
}) => {
  const [value, setValue] = useState('')
  const [addressIsSaved, setAddressIsSaved] = useState(false)

  const [streetAddress1, setStreetAddress1] = useState('')
  const [streetAddress2, setStreetAddress2] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState()

  const navigate = useNavigate()

  const handleRadioChange = event => {
    setValue(event.target.value)
  }

  const handlePlaceOrder = async () => {
    if (addressIsSaved) {
      try {
        axios.patch(`/api/v1/users/id/${userId}/shippingAddress`, {
          shipping: {
            address: {
              street1: streetAddress1,
              street2: streetAddress2,
              state,
              city,
              zipCode
            }
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  let shipping = 0.0
  let tax = 0.0

  const nextDayPrice = (subtotal * 0.5).toFixed(2)
  const threeDayPrice = (subtotal * 0.2).toFixed(2)

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/')
    }
  }, [cart])

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/api/v1/users/id/${userId}/shippingAddress`)
        .then(response => response.json())
        .then(data => {
          setStreetAddress1(data.street1)
          setStreetAddress2(data.street2)
          setState(data.state)
          setCity(data.city)
          setZipCode(data.zipCode)
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <>
      <Grid container justifyContent="center" sx={{ padding: '1rem' }}>
        <Grid
          item
          xs={6}
          className="checkout-products"
          sx={{
            borderRadius: '0.625rem',
            marginRight: '1rem',
            padding: '1rem'
          }}
        >
          <h3 className="checkout-header">Review Cart and Shipping</h3>
          {cart.length > 0 && (
            <>
              {cart.map(product => (
                <ProductInCart
                  key={product.product}
                  id={product.product}
                  price={product.price}
                  quantity={product.quantity}
                />
              ))}
            </>
          )}
          <h3 className="checkout-shipping-text">Shipping</h3>
          <Grid
            container
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '10rem',
              padding: '1rem'
            }}
          >
            <Grid item xs={8} sx={{ display: 'flex' }}>
              <RadioGroup onChange={handleRadioChange}>
                <FormControlLabel
                  value="3 Day"
                  control={<Radio />}
                  label={
                    subtotal > 100 ? (
                      <h3 className="checkout-shipping">Free 3 Day Shipping</h3>
                    ) : (
                      <h3 className="checkout-shipping">
                        <b>${threeDayPrice}</b> for 3 Day Shipping
                      </h3>
                    )
                  }
                />
                <FormControlLabel
                  value="Next Day"
                  control={<Radio />}
                  label={
                    <h3 className="checkout-shipping">
                      <b>${nextDayPrice}</b> for Next Day Shipping
                    </h3>
                  }
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ border: '0.0625rem solid black', borderRadius: '0.625rem' }}
        >
          <Grid container justifyContent="space-between">
            <Grid item sx={{ padding: '1rem' }}>
              {totalItemsInCart < 2 ? (
                <p>Subtotal ({totalItemsInCart} item) </p>
              ) : (
                <p>Subtotal ({totalItemsInCart} items) </p>
              )}
              <p>Shipping</p>
              <p>Tax</p>
            </Grid>
            <Grid item sx={{ padding: '1rem' }}>
              <p className="checkout-totals">${subtotal.toFixed(2)}</p>
              {value === '3 Day' && subtotal >= 100 && (
                <p className="checkout-totals">Free</p>
              )}
              {value === '3 Day' && subtotal < 100 && (
                <p className="checkout-totals">
                  ${(shipping = subtotal * 0.2).toFixed(2)}
                </p>
              )}
              {value === 'Next Day' && (
                <p className="checkout-totals">
                  ${(shipping = subtotal * 0.5).toFixed(2)}
                </p>
              )}
              {value !== '3 Day' && value !== 'Next Day' && (
                <p className="checkout-totals">$0.00</p>
              )}
              <p className="checkout-totals">
                ${(tax = subtotal * 0.07).toFixed(2)}
              </p>
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <p className="checkout-order-total">Order Total</p>
            </Grid>
            <Grid item>
              <p className="checkout-totals">
                ${(shipping + subtotal + tax).toFixed(2)}
              </p>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            className="checkout-button"
            onClick={() => handlePlaceOrder()}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center', paddingTop: '0rem' }}>
        <Grid
          item
          xs={6}
          className="checkout-products"
          sx={{
            borderRadius: '0.625rem',
            marginRight: '1rem',
            padding: '1rem'
          }}
        >
          <h3 className="checkout-header">Shipping Address</h3>
          <Grid
            container
            justifyContent="space-evenly"
            sx={{ justifyContent: 'space-evenly' }}
          >
            <Grid item xs={5.5}>
              <TextField
                label="First Name"
                value={firstName}
                size="medium"
                className="checkout-input"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={5.5}>
              <TextField
                label="Last Name"
                value={lastName}
                size="medium"
                className="checkout-input"
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-evenly"
            sx={{ paddingTop: '1rem' }}
          >
            <Grid item xs={5.5}>
              <TextField
                onChange={event => setStreetAddress1(event.target.value)}
                value={streetAddress1}
                label="Street Address 1"
                size="medium"
                className="checkout-input"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={5.5}>
              <TextField
                onChange={event => setStreetAddress2(event.target.value)}
                value={streetAddress2}
                label="Street Address 2 (optional)"
                size="medium"
                className="checkout-input"
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-evenly"
            sx={{ paddingTop: '1rem' }}
          >
            <Grid item xs={3.5}>
              <TextField
                onChange={event => setCity(event.target.value)}
                value={city}
                label="City"
                size="medium"
                className="checkout-input"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={3.5}>
              <TextField
                onChange={event => setState(event.target.value)}
                value={state}
                label="State"
                size="medium"
                className="checkout-input"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={3.5}>
              <TextField
                onChange={event => setZipCode(event.target.value)}
                value={zipCode}
                label="ZIP code"
                size="medium"
                className="checkout-input"
                type="number"
                sx={{ width: '100%' }}
              />
            </Grid>
            {isLoggedIn && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={addressIsSaved}
                      onChange={() => setAddressIsSaved(!addressIsSaved)}
                    />
                  }
                  label="Save this address for future purchases"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  )
}
export const mapStateToProps = state => {
  return {
    isLoggedIn: state.logIn.isLoggedIn,
    userId: state.logIn.loggedInUser.userId,
    firstName: state.logIn.loggedInUser.firstName,
    lastName: state.logIn.loggedInUser.lastName,
    cart: state.cart.cart,
    subtotal: state.cart.subtotal,
    totalItemsInCart: state.cart.totalItemsInCart
  }
}
export default connect(mapStateToProps)(CheckoutPage)
