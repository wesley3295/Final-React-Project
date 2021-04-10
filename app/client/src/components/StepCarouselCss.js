import {makeStyles} from '@material-ui/core/styles';

 const useStyles = makeStyles((theme) => ({
    rootpic: {
        
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 1000,
        width: 1000,
    },
    root: {
        width: 1000,
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export const classes = useStyles
