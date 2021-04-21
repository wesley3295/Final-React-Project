import React from 'react';
// import DiyForm from './DiyForm.js'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from "./Copyright"
import { useStyles } from './CSS/HomeCss'
import DiyList from './DiyList'
import { connect } from 'react-redux'

function Home({currentUser}) {
  // const { error, isPending, data: diys } = useFetch('http://localhost:3001/diys')
  const classes = useStyles();
// const [diyForm,setDiyForm] = useState(true)

// const handleDiyForm=() =>{
//   currentUser.id ? setDiyForm(false) : alert('Please Login To Make A DIY')
// }


  return (
    <React.Fragment>
      <CssBaseline />
     
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            
            {/* {diyForm ? <Button onClick={handleDiyForm}>Create DIY</Button>:<DiyForm setDiyForm={setDiyForm}/>} */}
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <DiyList />
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
      currentUser: state.user.currentUser.user
  }
}
export default connect(mapStateToProps)(Home)