import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useStyles} from './SignUpCss'
import {connect} from 'react-redux'
import {fetchUser} from '../actions'
 function Login({open,setOpen,fetchUser}) {
  const classes = useStyles()
  const [user, setUser] = React.useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }


const handleSubmit = (e)=> {
e.preventDefault();
fetchUser(user)
}


  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
              Login
          </DialogContentText>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="username"
            id="username"
            autoComplete="username"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            fullWidth
          />
          <Button onClick={handleClose} color="primary" type="submit">
            Login
          </Button>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default connect(null,{fetchUser})(Login)