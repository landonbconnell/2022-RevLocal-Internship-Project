import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import axios from 'axios'

const StoreSetUpPage2 = () => {
  const [shopName, setShopName] = useState('')
  const [isUniqueLogin, setIsUniqueLogin] = useState(true)
  const [shopNameHelperText, setShopNameHelperText] = useState(' ')
  const { shopId } = useParams()

  const handleCheckAvailability = async () => {
    if (shopName) {
      try {
        const { data } = await axios.get(`/api/v1/shops/name/${shopName}`)
        setIsUniqueLogin(data.isUniqueLogin)
        if (!data.isUniqueLogin) {
          setShopNameHelperText('Shop Name is Already Taken')
        } else {
          setShopNameHelperText(' ')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleOnBlur = () => {
    if (!shopName) {
      setIsUniqueLogin(false)
      setShopNameHelperText('Shop Name is Required')
    }
  }

  const submitNameChange = async () => {
    try {
      await axios.patch(`/api/v1/shops/id/${shopId}`, {
        name: shopName
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    handleCheckAvailability()
  }, [shopName])

  return (
    <>
      <Header />

      <Grid container justifyContent="center">
        <Box width="100%" />
        <Grid item xs="auto">
          <h1 style={{ margin: '0rem' }}>Name your shop:</h1>
        </Grid>
        <Box width="100%" />
        <Grid container justifyContent="center" sx={{ height: '5rem' }}>
          <Grid item xs={3}>
            <TextField
              size="small"
              fullWidth
              onBlur={() => handleOnBlur()}
              onChange={event => setShopName(event.target.value)}
              error={!isUniqueLogin}
              helperText={shopNameHelperText}
            />
          </Grid>
        </Grid>

        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingTop: '18rem' }}
        >
          <Grid item xs="auto">
            <Link to="/setUpShop/1">
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                sx={{ marginBottom: '2rem' }}
              >
                Previous Step
              </Button>
            </Link>
          </Grid>
          <Grid item xs={8}>
            <Stepper activeStep={0} alternativeLabel>
              <Step key={1}>
                <StepLabel>Name your shop</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>Personalize shop</StepLabel>
              </Step>
              <Step key={3}>
                <StepLabel>Stock your shop</StepLabel>
              </Step>
            </Stepper>
          </Grid>
          <Grid item xs="auto">
            <Link to={`/setUpShop/3/${shopId}`}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ marginBottom: '2rem' }}
                disabled={!isUniqueLogin || shopName === ''}
                onClick={() => submitNameChange()}
              >
                Next Step
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default StoreSetUpPage2
