import React,{ useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { createDiy, getTools } from "../actions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(0.5),
      width: "50ch",
    },
    stepButton:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(2),
    }
  },
}));
function DiyForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [steps, setSteps] = useState([]);
  const [diy, setDiy] = useState({
    title: "",
    tools_attributes: [],
    supplies: "",
    instructions: [],
    user_id: undefined,
    category_id: undefined,
  });
  

  function handleChangeInput(i, event) {
    const values = [...steps];
    const { name, value } = event.target;
    values[i][name] = value;
    setSteps(values);
    const diyInstructions = steps.map(s=>s.instructions)
    setDiy({...diy,instructions:diyInstructions})
  }
  function handleAddInput() {
    const values = [...steps];
    values.push({
      steps: "",
    });
    setSteps(values);
  }
  function handleRemoveInput(i) {
    const values = [...steps];
    values.splice(i, 1);
    setSteps(values);
  }
  const resetInputs = () => {
    setDiy({
        title: "",
        tools_attributes: [],
        supplies: "",
        instructions: [],
        user_id: undefined,
        category_id: undefined,
    });
  };

  const handleChange = (e) => {
    if(e.target.name==='category_id'){
      setDiy({
        ...diy,
        [e.target.name]: parseInt(e.target.value),
      });
    }else{
    setDiy({
      ...diy,
      [e.target.name]: e.target.value,
      user_id: props.currentUser.id,
    });}
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!diy) {
      alert("Please Complete The Form");
    }
    props.createDiy(diy, props.diys);
    resetInputs();
  };

  const createOptions = () => {
    return categories.map((c, i) => (
      <option key={i} value={c.id}>
        {c.name}
      </option>
    ));
  };

  const getCategories = () => {
    return fetch("/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
      if(props.currentUser===undefined){
        alert("Please Login To Make A DIY");
      }else{
        resetInputs()
    setOpen(true);}
  };

  const handleClose = () => {
      setSteps([{steps:""}])
    setOpen(false);
  };
  // eslint-disable-next-line
  useEffect(() => dispatch(() => props.getTools()), []);//<--- move to handleClickOpen
  useEffect(() => getCategories(), []);//<--- move to handleClickOpen
      // eslint-disable-next-line
  useEffect(() =>handleAddInput(), []);
  
  
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Create DIY
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create DIY</DialogTitle>
        <DialogContent>
          <DialogContentText>Create and Share your DIY!</DialogContentText>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            id="diyform"
          >
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-category-native-simple">
                  Category
                </InputLabel>
                <Select
                  value={diy.category_id}
                  native
                  onChange={handleChange}
                  label="Category"
                  name="category_id"
                  inputProps={{
                    id: "outlined-category-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  {createOptions()}
                </Select>

                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  placeholder="Name your DIY"
                  multiline
                  defaultValue={diy.title}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>

              <div className={classes.root}>
                <Autocomplete
                  multiple
                  onChange={(event, value) =>
                    setDiy({ ...diy, tools_attributes: value })
                  } // prints the selected value
                  name="tools"
                  id="tags-filled"
                  options={props.tools.map((option) => option.name)}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Tools"
                      placeholder="Tools Selection"
                    />
                  )}
                />
              </div>

              <TextField
                id="supplies"
                label="Supplies"
                name="supplies"
                placeholder="Supplies Needed"
                multiline
                defaultValue={diy.supplies}
                onChange={handleChange}
                variant="outlined"
              />
              {steps.map((step, idx) => {
                return (
                  <div key={`${step}-${idx}`}>
                      
                    <TextField
                      id="instruction"
                      name="instructions"
                      label={`Step ${idx+1}`}
                      multiline
                      rows={10}
                      defaultValue={step.steps}
                      onChange={e=>handleChangeInput(idx,e)}
                      variant="outlined"
                    />
                
              <br/>
                    <Button
                    className={classes.stepButton}
                    size="small"
                    onClick={() => handleAddInput()}
                    variant="contained"
                    color="primary"
                    type="button"
                      style={{marginTop:5,marginLeft:5}}
                      
                      >
                      Add Step
                    </Button>
                    <Button
                    className={classes.stepButton}
                    onClick={(idx) => handleRemoveInput(idx)}
                    variant="contained"
                    color="primary"
                    type="button"
                    size="small"
                    style={{marginTop:5,marginLeft:5}}
                    >
                      Delete Step
                    </Button>
                      </div>);
              })}
            </div>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              type="submit"
              style={{marginTop:10,marginLeft:5}}

            >
              Submit Diy
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser.user,
    tools: state.tools.tools,
    diys: state.diy.diys,
  };
};
export default connect(mapStateToProps, { createDiy, getTools })(DiyForm);
