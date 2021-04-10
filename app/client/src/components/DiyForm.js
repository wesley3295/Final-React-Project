

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import { Autocomplete } from '@material-ui/lab';
import { useEffect,useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect,useDispatch } from 'react-redux'
import { createDiy, getTools } from '../actions'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        root: {
            width: 500,
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(.5),
            width: '50ch',
        },
    },
}));
 function DiyForm(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
       const [diy, setDiy] = useState({
           title: "",
           tools_attributes: [],
           supplies: "",
           instructions: "",
           user_id: undefined,
           category_id: undefined
       })
   
       const resetInputs = () => {
           setDiy({
               title: "",
               tools: [],
               supplies: "",
               instructions: ""
           })
       }
   
       const handleChange = (e) => {
               setDiy({
                   ...diy, [e.target.name]: e.target.value, user_id: props.currentUser.id,
               })
           }
   
   
       const onSubmit = (e) => {
           e.preventDefault()
           if (!diy) {
               alert('Please Complete The Form')
           }
           console.log('diy:', diy)
           props.createDiy(diy)
           resetInputs()
       }
   
       const createOptions = () => {
           return categories.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)
       }
   
       const getCategories = () => {
           return (
               fetch('/categories')
                   .then(res => {
                       return res.json();
                   })
                   .then(data => {
                       setCategories(data)
                   })
                   .catch(err => {
                       console.log(err)
                   })
           )
       }
   
   
       // eslint-disable-next-line
       useEffect(() => dispatch(() => props.getTools()), [dispatch])
       useEffect(() => getCategories(), [])
    const handleClickOpen = () => {
        setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
};

return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Create DIY
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create DIY</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Create and Share your DIY! 
          </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-category-native-simple">Category</InputLabel>
                     <Select
                        value={diy.category_id}
                        native
                        onChange={handleChange}
                        label="Category"
                        name='category_id'
                        inputProps={{
                            id: 'outlined-category-native-simple',
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
                    onChange={(event, value) => setDiy({...diy, tools_attributes:value})} // prints the selected value
                    name="tools"
                    id="tags-filled"
                    options={props.tools.map((option) => option.name)}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params}  variant="filled" label="Tools" placeholder="Tools Selection" />
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
                <TextField
                    id="instruction"
                    label="Instructions"
                    name="instructions"
                    multiline
                    rows={10}
                    defaultValue={diy.instructions}
                    onChange={handleChange}
                    variant="outlined"
                />
            </div>
            <Button onClick={handleClose} variant="contained" color="primary" type='submit'>
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
        tools: state.tools.tools
    }
}
export default connect(mapStateToProps, { createDiy, getTools })(DiyForm)