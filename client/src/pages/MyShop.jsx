import { Grid, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Product from '../components/products/Product'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Header from '../components/header/Header'

export const MyShop = ({ seller }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [myProducts, setMyProducts] = useState(null)

  useEffect(() => {
    fetch(`/api/v1/products/page/${currentPage}/seller/${seller}/?limit=4`)
      .then(response => response.json())
      .then(data => setMyProducts(data))
      .then(setIsLoading(false))
      .catch(err => console.log(err))
  }, [currentPage])

  return (
    myProducts && (
      <>
        <Header />
        <h2 style={{ marginTop: '4rem' }}>My Listings</h2>

        {!isLoading && (
          <Grid
            container
            alignItems="center"
            columnSpacing={3}
            justifyContent="flex-start"
          >
            <Grid item xs={1} sx={{ margin: '0rem' }}>
              {myProducts.totalPages > 1 && currentPage > 1 && (
                <Button
                  onClick={() => {
                    setCurrentPage(currentPage - 1)
                    setIsLoading(true)
                  }}
                >
                  <ArrowBackIcon />
                </Button>
              )}
            </Grid>

            {myProducts.docs.map(({ _id, title, image, price, rating }) => (
              <Grid item xs={2.5} key={_id}>
                <Link to={`/products/id/${_id}`}>
                  <Product
                    id={_id}
                    title={title}
                    image={image}
                    price={price}
                    rating={rating}
                    editable={true}
                  />
                </Link>
              </Grid>
            ))}

            <Grid item xs={1}>
              {myProducts.totalPages > 1 &&
                currentPage < myProducts.totalPages && (
                  <Button
                    color="primary"
                    onClick={() => {
                      setCurrentPage(currentPage + 1)
                      setIsLoading(true)
                    }}
                  >
                    <ArrowForwardIcon />
                  </Button>
                )}
            </Grid>
          </Grid>
        )}
      </>
    )
  )
}

export const mapStateToProps = state => {
  return {
    seller: state.logIn.loggedInUser.userId
  }
}
export default connect(mapStateToProps)(MyShop)
