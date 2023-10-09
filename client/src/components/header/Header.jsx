import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import ShoppingCart from './ShoppingCart'
import { Grid } from '@mui/material'
import AccountMenu from './AccountMenu'
import LoginButton from './LoginButton'
import { connect } from 'react-redux'

const Header = props => {
  return (
    <Grid
      container
      className="header"
      sx={{ alignItems: 'center', justifyContent: 'space-around' }}
    >
      {/* logo */}
      <Grid item xs={2.5}>
        <Logo />
      </Grid>

      {/* search bar */}
      <Grid item xs={4}>
        <SearchBar />
      </Grid>

      {/* log in button or my account */}
      <Grid container item justifyContent="center" xs={2}>
        {props.isLoggedIn ? <AccountMenu /> : <LoginButton />}
      </Grid>

      {/* shopping cart */}
      <Grid item xs={1}>
        <ShoppingCart />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.logIn.isLoggedIn
  }
}

export default connect(mapStateToProps)(Header)
