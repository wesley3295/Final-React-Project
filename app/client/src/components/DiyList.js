import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./HomeCss";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import {deleteDiy} from '../actions'
export function DiyList(props) {
  const classes = useStyles();
const dispatch=useDispatch()
  const editButton = (diy) => {

    if (props.currentUser !== undefined) {
      if (props.currentUser.id === diy.user_id) {
        return (
          <>
            <Button href={`/edit/${diy.id}`} size="small" color="primary">
              Edit
            </Button>
            <Button onClick={()=>dispatch(deleteDiy(diy.id))} size="small" color="primary">
              Delete
            </Button>
          </>
        );
      }
    }
  };

  // useEffect(()=>editButton(),[props.currentUser])
  if (props.loading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {props.diys.map((diy, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={props.images[i]}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {diy.title}
                  </Typography>
                  <Typography>
                    type: {diy.category.name}
                    <br />
                    by: {diy.user.username}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href={`/show/${diy.id}`} size="small" color="primary">
                    View
                  </Button>
                  {editButton(diy)}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    diys: state.diy.diys,
    images: state.diy.images,
    loading: state.loading.loading,
    currentUser: state.user.currentUser.user,
  };
};

export default connect(mapStateToProps,{deleteDiy})(DiyList);
