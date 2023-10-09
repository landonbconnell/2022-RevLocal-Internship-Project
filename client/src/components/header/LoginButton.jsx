import React from 'react'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Grid container>
      <Grid item className="logInButton" sx={{ padding: '1.625rem' }}>
        <Link to="/login">
          <h3>Log In / Sign Up</h3>
        </Link>
      </Grid>
    </Grid>
  )
}

export default LoginButton
