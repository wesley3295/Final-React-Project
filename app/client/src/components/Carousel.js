import React from 'react'
import { classes } from './StepCarouselCss';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const tutorialSteps = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=1000&h=500&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=1000&h=500&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&h=500&q=80',
    },
    {
        label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=1000&h=500&q=60',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=1000&h=500&q=60',
    },
];

//activeStep,handleNext,handleBack
const Carousel = ({diy,activeStep}) => {

    return (
        <div className={classes.root}>
            <Paper square elevation={3} className={classes.header}>
                <Typography align="center" variant="h3">{diy.title}</Typography>
            </Paper>
            <img
                className={classes.img}
                src={tutorialSteps[activeStep].imgPath}
                alt={tutorialSteps[activeStep].label}
            />
            
        </div>
    )
}

export default Carousel
