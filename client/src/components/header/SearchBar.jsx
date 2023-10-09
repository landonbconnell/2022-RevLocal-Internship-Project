import React, { useState, useEffect } from 'react'
import { Grid, TextField, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import { connect, useDispatch } from 'react-redux'
import { setSearchBarInput } from '../../store/reducers/searchBarReducer'
import { useNavigate } from 'react-router-dom'

const SearchBar = searchBarInput => {
  const dispatch = useDispatch()
  const [input, setInput] = useState(searchBarInput.searchBarInput)
  const navigate = useNavigate()

  const handleClearClick = () => {
    setInput('')
    dispatch(setSearchBarInput({ input: '' }))
  }

  useEffect(() => {
    setInput(searchBarInput.searchBarInput)
  }, [searchBarInput])

  return (
    // search bar input field + button container
    <Grid
      container
      direction="row"
      sx={{
        padding: '0.625rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* search bar input field */}
      {/* className="searchbar" */}
      <Grid item xs={8} sx={{ paddingRight: '0rem' }}>
        <TextField
          sx={{
            background: '#FFFFFF',
            height: '2.5rem',
            justifyContent: 'center',
            border: '0.0625rem solid rgba(0, 0, 0, 0.2)',
            borderRadius: '0.625rem 0rem 0rem 0.625rem',
            padding: '0rem',
            width: '100%',
            boxShadow: '0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.125)'
          }}
          type="text"
          placeholder="Search..."
          onChange={event => setInput(event.target.value)}
          value={input}
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{ visibility: input ? 'visible' : 'hidden' }}
                onClick={handleClearClick}
              >
                <ClearIcon />
              </IconButton>
            )
          }}
        />
      </Grid>

      {/* search bar magnifying-glass button */}
      <Grid item className="search-button">
        <IconButton
          sx={{ padding: '0.4375rem' }}
          onClick={() => {
            dispatch(setSearchBarInput({ input: input }))
            navigate('/')
          }}
        >
          <SearchSharpIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    searchBarInput: state.searchbar.input
  }
}

export default connect(mapStateToProps)(SearchBar)
