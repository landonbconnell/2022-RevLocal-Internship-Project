import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  Snackbar,
  TextField
} from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import '../style/PostNewProduct.css'
import { setAllProps } from '../store/reducers/editListingReducer'
import Header from '../components/header/Header'
import { useParams } from 'react-router-dom'
import ConfirmDelete from '../components/buttons/ConfirmDelete'

const EditListing = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState(null)
  const [open, setOpen] = useState(false)
  const { id } = useParams()

  let updatedFields = {}

  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/v1/products/id/${id}`, updatedFields)
      setOpen(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/products/id/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetch('/api/v1/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.log(error))

    fetch(`/api/v1/products/id/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data[0])
        dispatch(setAllProps(data[0]))
      })
      .catch(error => console.log(error))
  }, [])

  return (
    product && (
      <>
        <Header />
        <h1 style={{ paddingTop: '3rem', paddingLeft: '2rem', margin: '0rem' }}>
          Edit Listing
        </h1>
        <Grid
          container
          justifyContent={'space-around'}
          alignItems={'flex-start'}
          display={'flex'}
          flexDirection={'row'}
          sx={{ padding: '1rem' }}
        >
          {/* Title and Description fields */}
          <Grid item xs={5} className="new-product">
            <h3>Title</h3>
            <TextField
              defaultValue={product.title}
              fullWidth
              size="small"
              onChange={event => (updatedFields.title = event.target.value)}
            />

            <h3 style={{ marginTop: '3rem' }}>Description</h3>
            <TextField
              defaultValue={product.description}
              fullWidth
              multiline
              id="description"
              onChange={event =>
                (updatedFields.description = event.target.value)
              }
            />
          </Grid>

          {/* Image and Category fields */}
          <Grid item xs={5} className="new-product">
            <h3>Image URL</h3>
            <TextField
              defaultValue={product.image}
              fullWidth
              size="small"
              onChange={event => (updatedFields.image = event.target.value)}
            />

            <Grid
              container
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              display={'flex'}
              flexDirection={'row'}
              sx={{
                padding: '1rem',
                paddingLeft: '0rem',
                paddingRight: '0rem'
              }}
            >
              <Grid
                item
                xs={5.5}
                sx={{ paddingLeft: '0rem', paddingRight: '0rem' }}
              >
                <h3 style={{ marginTop: '3rem' }}>Category</h3>
                <Autocomplete
                  sx={{ height: '4.5rem', padding: '0rem' }}
                  defaultValue={product.category}
                  freeSolo
                  forcePopupIcon
                  fullWidth
                  options={categories}
                  onInputChange={(event, input) =>
                    (updatedFields.category = input)
                  }
                  renderInput={params => <TextField {...params} label="" />}
                />
              </Grid>
              <Grid
                item
                xs={5.5}
                sx={{
                  padding: '1rem',
                  paddingLeft: '0rem',
                  paddingRight: '0rem'
                }}
              >
                <h3 style={{ marginTop: '3rem' }}>Price</h3>
                <TextField
                  defaultValue={product.price}
                  fullWidth
                  id="price"
                  size="small"
                  onChange={event => (updatedFields.price = event.target.value)}
                />
              </Grid>
              <Grid item xs={5.5}>
                <ConfirmDelete handleDelete={handleDelete} />
              </Grid>
              <Grid item xs={5.5}>
                <Button
                  variant="contained"
                  onClick={() => handleUpdate()}
                  fullWidth
                  id="submit"
                  sx={{ marginTop: '3rem' }}
                >
                  Update Listing
                </Button>
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
            Successfully updated listing!
          </Alert>
        </Snackbar>
      </>
    )
  )
}

export default EditListing
