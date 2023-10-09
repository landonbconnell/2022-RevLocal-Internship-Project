import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../../style/PostNewProduct.css'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import '../../style/SetUpStore.css'
import { useParams } from 'react-router-dom'

const StoreSetUpPage4 = ({ sellerId, sellerName }) => {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [priceValue, setPriceValue] = useState('')
  const [imgURL, setImgURL] = useState('')
  const { shopId } = useParams()

  useEffect(() => {
    fetch('/api/v1/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.log(error))
  }, [])

  const submitChange = async () => {
    try {
      await axios.post('/api/v1/products', {
        seller: {
          id: sellerId,
          name: sellerName
        },
        title: titleValue,
        price: priceValue,
        description: descriptionValue,
        category: categoryValue,
        image: imgURL,
        rating: {
          rate: 0,
          count: 0
        }
      })
      setTitleValue('')
      setImgURL('')
      setCategoryValue('')
      setDescriptionValue('')
      setPriceValue('')
      setOpen(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  const clearFields = () => {
    setTitleValue('')
    setImgURL('')
    setCategoryValue('')
    setDescriptionValue('')
    setPriceValue('')
  }

  return (
    <>
      <Header />
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid
          item
          sx={{
            width: '75%',
            border: '0.0625rem solid black',
            borderRadius: '0.625rem',
            padding: '0rem',
            paddingBottom: '1rem',
            marginTop: '2rem'
          }}
        >
          <Typography
            variant="h4"
            className="typo"
            sx={{ paddingLeft: '3.75rem', paddingTop: '2.5rem' }}
          >
            Add Products To Your Shop
          </Typography>
          <Grid
            container
            justifyContent={'space-around'}
            alignItems={'flex-start'}
            flexDirection={'row'}
            sx={{ padding: '0rem' }}
          >
            {/* Title and Description fields */}
            <Grid item xs={5} className="new-product">
              <h3>Title</h3>
              <TextField
                value={titleValue}
                fullWidth
                size="small"
                onChange={event => setTitleValue(event.target.value)}
              />

              <h3 style={{ marginTop: '3rem' }}>Description</h3>
              <TextField
                fullWidth
                multiline
                value={descriptionValue}
                id="description"
                onChange={event => setDescriptionValue(event.target.value)}
                className="textfield"
              />
            </Grid>

            {/* Image and Category fields */}
            <Grid item xs={5} className="new-product">
              <h3>Image URL</h3>
              <TextField
                fullWidth
                size="small"
                value={imgURL}
                onChange={event => setImgURL(event.target.value)}
              />

              <Grid
                container
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                display={'flex'}
                flexDirection={'row'}
                sx={{ paddingLeft: '0rem', paddingRight: '0rem' }}
              >
                <Grid
                  item
                  xs={5.5}
                  sx={{
                    paddingLeft: '0rem',
                    paddingRight: '0rem'
                  }}
                >
                  <h3 style={{ marginTop: '1rem' }}>Category</h3>
                  <Autocomplete
                    sx={{ height: '4.5rem', padding: '0rem' }}
                    freeSolo
                    forcePopupIcon
                    fullWidth
                    value={categoryValue}
                    options={categories}
                    onInputChange={(event, input) => setCategoryValue(input)}
                    renderInput={params => <TextField {...params} label="" />}
                  />
                </Grid>
                <Grid
                  item
                  xs={5.5}
                  sx={{ paddingLeft: '0rem', paddingRight: '0rem' }}
                >
                  <h3 style={{ marginTop: '1rem' }}>Price</h3>
                  <TextField
                    fullWidth
                    id="price"
                    value={priceValue}
                    size="small"
                    onChange={event => setPriceValue(event.target.value)}
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <Button
                    variant="outlined"
                    onClick={() => clearFields()}
                    id="submit"
                    sx={{ marginTop: '3rem', width: '100%' }}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    onClick={() => submitChange()}
                    fullWidth
                    id="submit"
                    sx={{ marginTop: '3rem' }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        sx={{ height: '2.5rem' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%', opacity: '100' }}
        >
          Successfully listed!
        </Alert>
      </Snackbar>
      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: '10rem' }}
      >
        <Grid item xs="auto">
          <Link to={`/setUpShop/3/${shopId}`}>
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
          <Stepper activeStep={2} alternativeLabel>
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
          <Link to={`/setUpShop/4/${shopId}`}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ marginBottom: '2rem' }}
              // onClick={() => submitChange()}
            >
              Finalize Shop
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  return {
    sellerId: state.logIn.loggedInUser.userId,
    sellerName: state.logIn.loggedInUser.username
  }
}

export default connect(mapStateToProps)(StoreSetUpPage4)
