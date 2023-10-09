import React, { useEffect, useState } from 'react'
import AddToCart from '../components/buttons/AddToCart'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import { Grid, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'
import SelectQuantity from '../components/buttons/SelectQuantity'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/reducers/cartReducer'

const ProductPage = () => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [shopId, setShopId] = useState('')
  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/v1/products/id/${id}`)
      .then(response => response.json())
      .then(product => {
        setProduct(product[0])
        setIsLoading(false)
        console.log(product)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (product) {
      fetch(`/api/v1/shops/sellerId/${product.seller.id}`)
        .then(response => response.json())
        .then(shopId => {
          setShopId(shopId.shopId)
        })
        .catch(error => console.log(error))
    }
  }, [product])

  return (
    <>
      <Header />
      {!isLoading && (
        <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={4} sx={{ padding: '3.125rem', marginTop: '1.25rem' }}>
            <img
              className="product-page-image"
              src={product.image}
              alt={product.title}
            />
          </Grid>
          <Grid item xs={4}>
            {/* Product title */}
            <div>
              <h3 className="product-title">{product.title}</h3>
              {product && product.seller && (
                <Link to={`/shop/${shopId}`}>
                  <Typography
                    sx={{ marginTop: '1rem', marginBottom: '0rem' }}
                    paragraph
                  >
                    {product.seller.name}
                  </Typography>
                </Link>
              )}
            </div>

            {/* Price and rating */}
            <div className="price-and-rating">
              <h3 className="product-price">${product.price.toFixed(2)}</h3>
              {product && product.rating && (
                <Rating
                  className="rating"
                  precision={0.1}
                  value={product.rating.rate}
                  readOnly
                />
              )}
            </div>

            {/* Description */}
            <Typography paragraph sx={{ padding: '1rem' }}>
              {product.description}
            </Typography>

            {/* Add to cart and quantity selector */}
            <div>
              <AddToCart
                onClick={() => {
                  dispatch(
                    addToCart({
                      product: id,
                      quantity: selectedQuantity,
                      price: product.price
                    })
                  )
                }}
              />
              <SelectQuantity
                value={selectedQuantity}
                onChange={event => setSelectedQuantity(event.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ProductPage
