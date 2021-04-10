import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import {classes} from './StepCarouselCss';


export default function HorizontalNonLinearStepper({diy,activeStep,setActiveStep, handleBack, handleNext, completed, setCompleted,totalSteps,steps}) {
    function getStepContent(step) {
       return diy.instructions[step]
        
    }
    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
      };
      const completedSteps = () => {
        return Object.keys(completed).length;
      };
    
    const handleStep = (step) => () => {
        setActiveStep(step);
    };


    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div>
        
        <div className={classes.root}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
            </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
              </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                Next
              </Button>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}
