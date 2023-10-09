import { Button, Grid } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import React from 'react'
import '../../style/products.css'
import '../../style/typography.css'
import { Link } from 'react-router-dom'

const Product = ({ isLoading, id, title, image, price, editable }) => {
  return (
    id && (
      <Grid
        container
        className="product-listing"
        direction="column"
        justifyContent="space-between"
        sx={{
          minHeight: '22.5rem',
          width: '100%',
          margin: '0rem'
        }}
      >
        {!isLoading && (
          <>
            <img
              className="product-listing-image"
              src={image}
              alt={title}
              style={{ height: '14rem' }}
            />
            <Grid item sx={{ padding: '1rem' }}>
              <h3 className="product-title">
                {title.length > 40 ? `${title.substring(0, 40)}...` : title}
              </h3>
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ padding: '1rem' }}
            >
              <Grid item>
                <h3 className="price" style={{ margin: '0rem' }}>
                  ${price.toFixed(2)}
                </h3>
              </Grid>
              {editable && (
                <Grid item>
                  <Link to={`/editListing/id/${id}`}>
                    <Button variant="contained" onClick={() => {}}>
                      <SettingsIcon />
                    </Button>
                  </Link>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Grid>
    )
  )
}

export default Product
