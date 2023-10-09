import React from 'react'
import { useEffect, useState } from 'react'
import { Grid, Pagination } from '@mui/material'
import Product from './Product'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import '../../style/products.css'
import { setTotalPages } from '../../store/reducers/pageReducer'
import { resetSearchBarInput } from '../../store/reducers/searchBarReducer'
import {
  resetCategories,
  setIsFetchingProducts
} from '../../store/reducers/selectCategoriesReducer'

const Products = ({ selectedCategories, totalPages, searchBarInput }) => {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAllProducts = () => {
    setIsLoading(true)
    fetch(`/api/v1/products/page/${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.docs)
        dispatch(setTotalPages(data.totalPages))
      })
      .then(setIsLoading(false))
      .catch(error => console.log(error))
  }

  const fetchProductsByCategory = async () => {
    setIsLoading(true)
    let categories = ''
    for (let i = 0; i < selectedCategories.length; i++) {
      categories += `${selectedCategories[i]},`
    }
    dispatch(setIsFetchingProducts(true))
    await fetch(`/api/v1/products/page/${currentPage}/category/${categories}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.docs)
        dispatch(setTotalPages(data.totalPages))
      })
      .then(() => {
        setIsLoading(false)
        dispatch(setIsFetchingProducts(false))
      })
      .catch(error => console.log(error))
  }

  const fetchProductsBySearch = () => {
    setIsLoading(true)
    fetch(`/api/v1/products/page/${currentPage}/title/${searchBarInput}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.docs)
        dispatch(setTotalPages(data.totalPages))
      })
      .then(setIsLoading(false))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (selectedCategories.length === 0 && !searchBarInput) {
      fetchAllProducts()
    } else if (selectedCategories.length > 0 && !searchBarInput) {
      fetchProductsByCategory()
    } else {
      fetchProductsBySearch()
    }
  }, [currentPage])

  useEffect(() => {
    if (selectedCategories.length === 0 && !searchBarInput) {
      fetchAllProducts()
    } else if (selectedCategories.length > 0 && !searchBarInput) {
      setCurrentPage(1)
      fetchProductsByCategory()
    }
  }, [selectedCategories])

  useEffect(() => {
    if (!searchBarInput) {
      fetchAllProducts()
    } else {
      fetchProductsBySearch()
    }
  }, [searchBarInput])

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : searchBarInput && products.length === 0 ? (
        <>
          <h1 style={{ padding: '0rem' }}>
            {`Sorry, we couldn't find any results for '${searchBarInput}'...`}
          </h1>
          <h3>Please try searching for something else instead</h3>
        </>
      ) : (
        <>
          {products.map(({ _id, title, image, price }) => (
            <Grid
              item
              xs={4}
              sx={{ padding: '1rem', paddingTop: '0rem' }}
              key={_id}
            >
              <Link
                to={`/products/id/${_id}`}
                onClick={() => {
                  dispatch(resetSearchBarInput())
                  dispatch(resetCategories())
                }}
              >
                <Product
                  isLoading={isLoading}
                  id={_id}
                  title={title}
                  image={image}
                  price={price}
                  editable={false}
                />
              </Link>
            </Grid>
          ))}
          {totalPages > 1 && (
            <Grid container justifyContent="center" sx={{ padding: '1rem' }}>
              <Grid item>
                <Pagination
                  count={totalPages}
                  shape="rounded"
                  page={currentPage}
                  onChange={(event, page) => {
                    setCurrentPage(page)
                  }}
                />
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    selectedCategories: state.selectedCategories.selectedCategories,
    totalPages: state.page.totalPages,
    searchBarInput: state.searchbar.input
  }
}
export default connect(mapStateToProps)(Products)
