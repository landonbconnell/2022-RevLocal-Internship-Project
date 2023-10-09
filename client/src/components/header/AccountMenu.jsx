import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import Img from '../../store/imgs/avatar2.jpg'
import { connect, useDispatch } from 'react-redux'
import { logOut } from '../../store/reducers/logInReducer'

const AccountMenu = (isShopSetUp, isLoggedIn, userId) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // isLoggedIn &&
  // useEffect(() => {
  //   fetch(`/api/v1/shops/id/${shopId}`)
  //     .then(response => response.json())
  //     .then(shop => {
  //       setIsShop(shop)
  //     })
  //     .catch(error => console.log(error))
  // }, [])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{
              width: '2.5rem',
              height: '2.5rem',
              padding: '0rem'
            }}
            src={Img}
          />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        marginThreshold={0}
        sx={{ maxHeight: '11.5rem' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0rem 0.125rem 0.5rem rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isShopSetUp.isShopSetUp && (
          <Link to="/myProfile">
            <MenuItem>MyShop</MenuItem>
          </Link>
        )}

        {isShopSetUp.isShopSetUp ? (
          <Link to="/sell">
            <MenuItem>Sell</MenuItem>
          </Link>
        ) : (
          <Link to="/setUpShop/1">
            <MenuItem>Set Up Shop</MenuItem>
          </Link>
        )}

        <Divider sx={{ marginTop: '0.75rem', marginBottom: '0.75rem' }} />
        <MenuItem>
          Settings
          <ListItemIcon sx={{ padding: '0rem' }}>
            <Settings fontSize="small" sx={{ paddingLeft: '1.4rem' }} />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => dispatch(logOut())}>
          <Link to="/">
            Logout
            <ListItemIcon sx={{ padding: '0rem' }}>
              <Logout fontSize="small" sx={{ paddingLeft: '2.75rem' }} />
            </ListItemIcon>
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isShopSetUp: state.logIn.loggedInUser.isShopSetUp,
    userId: state.logIn.loggedInUser.userId,
    isLoggedIn: state.logIn.isLoggedIn
  }
}
export default connect(mapStateToProps)(AccountMenu)
