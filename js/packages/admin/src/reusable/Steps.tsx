import * as React from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stepper, { StepperProps } from '@mui/material/Stepper';

export interface Step {
  step: React.ReactNode;
}

type useStepProps = { 
  steps: Step[]; 
  activeStep: number; 
  completed: { [k: number]: boolean; }; 
  completedSteps: () => number; 
  totalSteps: () => number; 
  setActiveStep: React.Dispatch<React.SetStateAction<number>>; 
  setCompleted: React.Dispatch<React.SetStateAction<{ [k: number]: boolean; }>>; 
  handleBack: () => void; 
  handleStep: (step: number) => () => void; 
  handleComplete: () => void; 
  handleReset: () => void; 
  handleNext: () => void; 
  allStepsCompleted: () => boolean; 
}

export function useSteps(steps: Array<Step>): useStepProps {
  const [stepsInState, setSteps] = React.useState(steps);

  React.useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);


  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps?.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? // It's the last step, but not all steps have been completed,

      // find the first step that has been completed
      steps?.findIndex((ignore, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return { steps: stepsInState, activeStep, completed, completedSteps, totalSteps, setActiveStep, setCompleted, handleBack, handleStep, handleComplete, handleReset, handleNext, allStepsCompleted };
}
export default function StepperWrapper({ steps = [], orientation = "vertical" }: { steps: Array<Step> } & StepperProps) {

  const { activeStep, allStepsCompleted, handleNext, handleComplete, handleReset, handleBack, completed, completedSteps, totalSteps, handleStep } = useSteps(steps);
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear orientation={orientation} activeStep={activeStep}>
        {steps?.map(({ step }, index) => (
          <Step key={index} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {step}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Steps Completed
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}