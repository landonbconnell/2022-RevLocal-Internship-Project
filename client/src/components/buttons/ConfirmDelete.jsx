import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ConfirmDelete = ({ handleDelete }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        fullWidth
        id="delete"
        color="error"
        sx={{ marginTop: '3rem' }}
      >
        Delete Listing
      </Button>

      <Dialog
        sx={{ height: '18.75rem' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Are you sure you wish to delete this listing?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button
            onClick={() => {
              handleDelete()
              navigate('/')
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDelete
