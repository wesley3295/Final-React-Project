import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MainMenu from './MainMenu'
import Typography from '@material-ui/core/Typography';
import React from 'react'
import DiyForm from './DiyForm.js'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import history from '../history'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      
    },
  }));
const NavBar = ({ currentUser }) => {
    const classes = useStyles();
    // const [diyForm, setDiyForm] = useState(true)
  

    // const handleDiyForm = () => {
    //     currentUser&&currentUser.id ? setDiyForm(false) : alert('Please Login To Make A DIY')
    // }
    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <MainMenu edge="start" className={classes.menuButton}/>
                   {/* <Link color="inherit" href="/" className={classes.title}> */}
          <Typography onClick={()=>history.push('/')} variant="h6" color="inherit" className={classes.title}>
                            Do It!
          </Typography>
                   {/* </Link> */}
          {/* {diyForm ? <Button color='inherit' onClick={handleDiyForm}>Create DIY</Button> : <DiyForm setDiyForm={setDiyForm} />} */}
            <DiyForm/>
        </Toolbar>
      </AppBar>
    </div>
        
    )
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser.user
    }
}
export default connect(mapStateToProps)(NavBar)


