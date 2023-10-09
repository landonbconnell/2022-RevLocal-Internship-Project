import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import { Grid, Typography } from '@mui/material'

const SellerPage = () => {
  const [shop, setShop] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { shopId } = useParams()

  useEffect(() => {
    fetch(`/api/v1/shops/id/${shopId}`)
      .then(response => response.json())
      .then(shop => {
        setShop(shop.shop)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    !isLoading && (
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid
          container
          item
          justifyContent="flex-start"
          xs={12}
          sx={{ backgroundImage: `url(${shop.bannerURL})`, height: '250px' }}
        />
        <Grid item sx={{ padding: '2rem', backgroundColor: 'light gray' }}>
          <img
            src={shop.logoURL}
            alt=""
            style={{
              maxWidth: '10rem',
              maxHeight: '10rem',
              borderRadius: '20rem'
            }}
          />
          <Grid item container>
            <Grid item>
              <Typography variant="h5">{shop.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  )
}

export default SellerPage
