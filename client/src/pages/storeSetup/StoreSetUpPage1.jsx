import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import axios from 'axios'
import { connect } from 'react-redux'

const StoreSetUpPage1 = seller => {
  const navigate = useNavigate()

  const verifySellerHasAShop = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/shops/hasAShop/${seller.seller.userId}`
      )
      if (!data.sellerHasAShop) {
        createNewShop()
      } else {
        navigate(`/setUpShop/2/${data.id}`)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const createNewShop = async () => {
    try {
      const { data } = await axios.post('/api/v1/shops', {
        sellerId: seller.seller.userId,
        sellerName: seller.seller.username
      })
      navigate(`/setUpShop/2/${data.id}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Header />

      <Grid container alignItems="center" direction="column">
        <Grid item xs={12}>
          <h1 style={{ paddingLeft: '0rem', marginBottom: '0rem' }}>
            Welcome!
          </h1>
        </Grid>
        <Grid item xs={12}>
          <Typography paragraph sx={{ marginLeft: '0rem' }}>
            Before you can start selling, you must first set up your shop. Don't
            worry, this won't take long!
          </Typography>
        </Grid>

        <Grid
          container
          item
          justifyContent="flex-end"
          sx={{ paddingTop: '25rem' }}
        >
          <Grid item xs={2}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ marginBottom: '2rem' }}
              onClick={() => verifySellerHasAShop()}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  return {
    seller: state.logIn.loggedInUser
  }
}

export default connect(mapStateToProps)(StoreSetUpPage1)
