import React, { useState } from 'react'
import axios from 'axios'
import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import '../style/RegisterUser.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const RegisterUserPage = () => {
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true)

  const [username, setUsername] = useState(null)
  const [errorUsername, setErrorUsername] = useState(false)

  const [password, setPassword] = useState(null)
  const [errorPassword, setErrorPassword] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState(' ')

  const [confirmPassword, setConfirmPassword] = useState(null)
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState(
    ' '
  )

  const [email, setEmail] = useState(null)
  const [errorEmail, setErrorEmail] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState(' ')

  const [firstName, setFirstName] = useState(null)
  const [errorFirstName, setErrorFirstName] = useState(false)

  const [lastName, setLastName] = useState(null)
  const [errorLastName, setErrorLastName] = useState(false)

  useEffect(() => {
    if (
      username &&
      password &&
      confirmPassword &&
      email &&
      firstName &&
      lastName &&
      !errorUsername &&
      !errorPassword &&
      !errorConfirmPassword &&
      !errorEmail &&
      !errorFirstName &&
      !errorLastName
    ) {
      setSubmitIsDisabled(false)
    } else {
      setSubmitIsDisabled(true)
    }
  }, [
    username,
    password,
    confirmPassword,
    email,
    firstName,
    lastName,
    errorUsername,
    errorPassword,
    errorConfirmPassword,
    errorEmail,
    errorFirstName,
    errorLastName
  ])

  const handlePasswordValidation = password => {
    const passwordRegex = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    )
    if (passwordRegex.test(password)) {
      setPassword(password)
      setPasswordHelperText('')
      setErrorPassword(false)
    } else {
      setPasswordHelperText(
        'Valid passwords contain at least 8 characters, 1 number, and uppercase and lowercase letters'
      )
      setErrorPassword(true)
    }
  }

  const handleEmailValidation = email => {
    const emailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    if (emailRegex.test(email)) {
      setEmail(email)
      setEmailHelperText('')
      setErrorEmail(false)
    } else {
      setEmailHelperText('Must be Valid Email')
      setErrorEmail(true)
    }
  }

  const handleSubmit = async () => {
    if (username && password && email && firstName && lastName) {
      try {
        await axios.post('/api/v1/users', {
          username,
          password,
          email,
          firstName,
          lastName
        })
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const comparePasswords = () => {
    if (password === confirmPassword && password && confirmPassword) {
      setConfirmPasswordHelperText('')
      setErrorConfirmPassword(false)
      handlePasswordValidation(password)
    } else {
      if (password && confirmPassword) {
        setConfirmPasswordHelperText('Passwords must match')
      }
      setErrorPassword(true)
      setErrorConfirmPassword(true)
    }
  }

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
          justifyContent="space-between"
          sx={{ padding: '1rem' }}
        >
          <Grid item xs={12} sx={{ padding: '1rem' }}>
            <Typography variant="h4">Sign Up</Typography>
            <Divider sx={{ paddingTop: '2rem' }} />
          </Grid>
          <Grid item xs={6} sx={{ padding: '1rem' }}>
            <TextField
              onChange={event => setFirstName(event.target.value)}
              onBlur={() =>
                !firstName ? setErrorFirstName(true) : setErrorFirstName(false)
              }
              error={errorFirstName}
              required
              size="medium"
              className="textfield"
              label="First Name"
              fullWidth
              helperText=" "
            />
          </Grid>
          <Grid item xs={6} sx={{ padding: '1rem' }}>
            <TextField
              onChange={event => setLastName(event.target.value)}
              onBlur={() =>
                !lastName ? setErrorLastName(true) : setErrorLastName(false)
              }
              error={errorLastName}
              required
              size="medium"
              className="textfield"
              label="Last Name"
              fullWidth
              helperText=" "
            />
          </Grid>
          <Grid item xs={12} sx={{ padding: '1rem' }}>
            <TextField
              onBlur={event => {
                handleEmailValidation(event.target.value)
              }}
              error={errorEmail}
              required
              size="medium"
              className="textfield"
              label="Email"
              fullWidth
              helperText={emailHelperText}
            />
          </Grid>
          <Grid item xs={6} sx={{ padding: '1rem' }}>
            <TextField
              onChange={event => setUsername(event.target.value)}
              onBlur={() =>
                !username ? setErrorUsername(true) : setErrorUsername(false)
              }
              error={errorUsername}
              required
              size="medium"
              className="textfield"
              label="Username"
              fullWidth
              helperText=" "
            />
          </Grid>
          <Grid item xs={6} sx={{ padding: '1rem' }}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  onChange={event => {
                    setPassword(event.target.value)
                  }}
                  onBlur={event => {
                    handlePasswordValidation(event.target.value)
                  }}
                  helperText={passwordHelperText}
                  error={errorPassword}
                  required
                  size="medium"
                  className="textfield"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: '0rem', paddingTop: '2rem' }}>
                <TextField
                  onChange={event => {
                    setConfirmPassword(event.target.value)
                    setErrorConfirmPassword(true)
                    setConfirmPasswordHelperText('Passwords must match')
                  }}
                  onBlur={() => {
                    comparePasswords()
                  }}
                  helperText={confirmPasswordHelperText}
                  error={errorConfirmPassword}
                  required
                  size="medium"
                  className="textfield"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Link to="/login">
                <Button
                  variant="contained"
                  disabled={submitIsDisabled}
                  onClick={() => handleSubmit()}
                  sx={{ marginTop: '1rem' }}
                  fullWidth
                >
                  Sign Up
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RegisterUserPage
