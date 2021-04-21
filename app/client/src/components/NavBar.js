import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MainMenu from './MainMenu'
import Typography from '@material-ui/core/Typography';
import React from 'react'
import DiyForm from './DiyForm.js'
import { connect } from 'react-redux'
import {useStyles} from './CSS/NavBarCss'
import history from '../history'

const NavBar = ({ currentUser }) => {
    // const [diyForm, setDiyForm] = useState(true)
    const classes = useStyles()

    // const handleDiyForm = () => {
    //     currentUser&&currentUser.id ? setDiyForm(false) : alert('Please Login To Make A DIY')
    // }
    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.menuButton}>
        <MainMenu edge="start" />
            </div>
            <div className={classes.title}>
          <Typography onClick={()=>history.push('/')} variant="h6" color="inherit">
                            Do It!
          </Typography>
          </div>
          <div >
            <DiyForm />
          </div>
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


