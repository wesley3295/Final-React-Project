import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Login from './Login'
import { useStyles } from './MainMenuCss'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
function MainMenu({ currentUser,loading }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  console.log('current user:', currentUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    handleClose()
    setOpen(true);
  };
 

  const userLoggedIn = () => {
    return (
      [
        <MenuItem onClick={handleClose}>Profile</MenuItem>,
        <MenuItem onClick={handleClose}>My account</MenuItem>,
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      ])
  }
  const userLoggedOut = () => {
    return (
      [
        <MenuItem onClick={handleLoginOpen}>Login</MenuItem>,
        <Link to='/signup' style={{textDecoration:'none', color:"black"}}>
        <MenuItem  onClick={handleClose}>Sign Up</MenuItem>
        </Link>
      ])
  }


  return (
    <div>
      <MenuIcon className={classes.icon} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
      <Login open={open} setOpen={setOpen} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!currentUser ? (userLoggedOut()) : (userLoggedIn())}

      </Menu>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser.user,
    loading: state.loading.loading
  }
}
export default connect(mapStateToProps)(MainMenu)

