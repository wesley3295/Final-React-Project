import {Router,Route,Switch} from 'react-router-dom'
import Home from "./components/Home"
import Diy from './components/Diy'
import editDiy from './components/EditDiyForm'
import SignUp from './components/SignUp'
import history from './history'
import {connect, useDispatch} from "react-redux"
import {getDiys} from './actions/index.js'
import {useEffect} from 'react'
import NavBar from './components/NavBar'
import CssBaseline from '@material-ui/core/CssBaseline';
const App = ({diys}) => {
  const dispatch = useDispatch()
  useEffect(()=>dispatch(getDiys()),[dispatch])
  return (
    <div>
      <Router history={history}>
      <CssBaseline />
        <NavBar/>
        <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/show/:id"  component={Diy}/>
        <Route exact path="/edit/:id"  component={editDiy}/>
        <Route exact path="/signup"  component={SignUp}/>
      </Switch>
    </Router>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    diys: state.diy.diys,
  }
}
export default connect(mapStateToProps,{getDiys})(App)


