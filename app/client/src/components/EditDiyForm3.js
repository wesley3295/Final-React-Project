import Chip from '@material-ui/core/Chip';
import { Autocomplete } from '@material-ui/lab';
import { useEffect } from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { patchDiy, getTools } from '../actions'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux'
import { getDiy } from '../actions'
import Container from '@material-ui/core/Container';
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

function EditDiyForm(props) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    
    
    const resetInputs = () => {
        setDiy({
            title: "",
            tools_attributes: [],
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
        props.patchDiy(diy,props.diy.id)
        // props.setDiyForm(true)
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
         const [diy, setDiy] = useState({
            title: "",
            tools_attributes: [],
            supplies: "",
            instructions: "",
            user_id: undefined,
            category_id: undefined
        })
        
        
        // eslint-disable-next-line
        
        
        useEffect(() => getCategories(), [])
        useEffect(()=>dispatch(()=>props.getTools()) , [dispatch])
        useEffect(() =>dispatch(getDiy(parseInt(props.match.params.id))) , [dispatch])
        useEffect(() =>{setDiy({
            title: "",
            tools_attributes: props.diy.tools&&props.diy.tools.map(t=>t.name),
            supplies: "",
            instructions: [],
            user_id: undefined,
            category_id: undefined
        })},[props.diy.tools])
        
        if (props.loading) {
            return (
                <div>
              ...Loading
            </div>
          )
        }

      
    return (
<Container maxWidth="sm">
        
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
            <div>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-category-native-simple">Category</InputLabel>
                    <Select
                        value={props.diy.category_id}
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
                        defaultValue={props.diy.title}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </FormControl>

                <div className={classes.root}>
                <Autocomplete
                    multiple
                     value={diy.tools_attributes}
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
                        <TextField {...params}  variant="filled"  label="Tools" placeholder="Tools Selection" />
                        )}
                        />
                        </div>


                <TextField
                    id="supplies"
                    label="Supplies"
                    name="supplies"
                    placeholder="Supplies Needed"
                    multiline
                    defaultValue={props.diy.tools&&props.diy.supplies}
                    onChange={handleChange}
                    variant="outlined"
                />
                {props.diy.tools&&props.diy.instructions.map((s,i)=>
                <TextField
                    id="instruction"
                    label={`Step ${i+1}`}
                    name="instructions"
                    multiline
                    rows={10}
                    defaultValue={s}
                    onChange={handleChange}
                    variant="outlined"
                />
                )}
            </div>
            <Button variant="contained" color="primary" type='submit'>
                Edit Diy
         </Button>
        </form>
        </Container>
    );
}
const mapStateToProps = (state) => {
    return {
        diy: state.diy.showDiy,
        currentUser: state.user.currentUser.user,
        tools: state.tools.tools,
        loading: state.loading.loading
    }
}
export default connect(mapStateToProps, { patchDiy, getTools })(EditDiyForm)

