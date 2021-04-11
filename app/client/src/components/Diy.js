import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux'
import { getDiy } from '../actions'
import StepCarousel from './StepCarousel'
import Carousel from './Carousel'

const useStyles = makeStyles((theme) =>
({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}),
);

function Diy(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const dispatch = useDispatch()
  useEffect(()=>console.log('instructions',props.diy))
  useEffect(() => dispatch(getDiy(parseInt(props.match.params.id))), [])
  if (props.loading) {
    return (
      <div>
      ...Loading
    </div>
  )
}


function getSteps() {
  return props.diy.instructions&&props.diy.instructions.map(s=>"")
  // return ['', '', '','', '', ''];
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
    let d = new Date(props.diy.created_at)
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
          subheader= {`by:${props.diy.user.username}`}
          
        />
        <Carousel diy={props.diy} activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack} handleNext={handleNext} />
        
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
            <StepCarousel diy={props.diy} activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack} handleNext={handleNext} totalSteps={totalSteps} setCompleted={setCompleted} completed={completed} steps={steps} />
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    diy: state.diy.showDiy,
    loading: state.loading.loading
  }
}

export default connect(mapStateToProps)(Diy);
