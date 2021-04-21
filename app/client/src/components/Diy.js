import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import StepCarousel from './StepCarousel'
import Carousel from './Carousel'
import {classes} from './CSS/DiyCss'


////////////////////////////////////////////////////////

function Diy(props) {
  const diy = props.diys.find(d=> d.id === parseInt(props.match.params.id))

  const [expanded, setExpanded] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  
////////////////////////////////////////////////////////
  
  function getSteps() {
    return diy.instructions&&diy.instructions.map(s=>"")
  }
  const steps = getSteps();
  
  const totalSteps = () => {
    return steps.length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  
  
  const handleNext = () => {
    const newActiveStep =
    isLastStep() && !allStepsCompleted()
    ? // It's the last step, but not all steps have been completed,
    // find the first step that has been completed
    steps.findIndex((step, i) => !(i in completed))
    : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const createdAt = () => {
    let d = new Date(diy.created_at)
    return (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear())
  }
  
  return (
    <Container maxWidth="lg">
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={createdAt()}
          subheader= {diy.user&&`by:${diy.user.username}`}
          
        />
        <Carousel diy={diy} activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack} handleNext={handleNext} />
        
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            add description to database
        </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <StepCarousel diy={diy} activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack} handleNext={handleNext} totalSteps={totalSteps} setCompleted={setCompleted} completed={completed} steps={steps} />
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    diys: state.diy.diys,
    loading: state.loading.loading
  }
}

export default connect(mapStateToProps)(Diy);
