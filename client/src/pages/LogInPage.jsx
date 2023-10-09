import React, { useState } from 'react'
import '../style/loginPage.css'
import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logIn } from '../store/reducers/logInReducer'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LogInPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [helperText, setHelperText] = useState('')
  const [error, setError] = useState(false)
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (username, password) => {
    fetch(`/api/v1/users/username/${username}/password/${password}`)
      .then(response => response.json())
      .then(user => {
        if (user) {
          dispatch(
            logIn({
              userId: user._id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              isShopSetUp: user.selling.isShopSetUp
            })
          )
          navigate('/')
        } else {
          setHelperText('Username or password are incorrect')
          setError(true)
        }
      })
  }

  const handleClickAfterError = () => {
    if (error) {
      setError(false)
      setHelperText('')
    }
  }

  useEffect(() => {
    if (username && password && !error) {
      setIsLoginButtonDisabled(false)
    } else {
      setIsLoginButtonDisabled(true)
    }
  }, [username, password, error])

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={5}
        sx={{
          border: '0.0625rem solid black',
          borderRadius: '0.625rem',
          padding: '1rem'
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="center"
          sx={{ padding: '1rem' }}
        >
          <Grid item xs={12} sx={{ padding: '1rem' }}>
            <Typography variant="h4" sx={{ paddingBottom: '0.5rem' }}>
              Log In
            </Typography>
            <Link to="/registerUser">
              <Typography paragraph style={{ color: 'blue' }}>
                or create an account
              </Typography>
            </Link>
            <Divider sx={{ paddingTop: '1rem' }} />
          </Grid>
          <Grid item xs={12} sx={{ padding: '1rem' }}>
            <TextField
              onChange={event => setUsername(event.target.value)}
              onClick={() => handleClickAfterError()}
              error={error}
              required
              size="medium"
              className="textfield"
              label="Username"
              value={username}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ padding: '1rem' }}>
            <TextField
              onChange={event => setPassword(event.target.value)}
              onClick={() => handleClickAfterError()}
              error={error}
              helperText={helperText}
              required
              size="medium"
              className="textfield"
              label="Password"
              type="password"
              value={password}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ padding: '1rem' }}>
            <Button
              disabled={isLoginButtonDisabled}
              className="loginPage-Button"
              variant="contained"
              onClick={() => handleSubmit(username, password)}
              fullWidth
            >
              Log In
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LogInPage
