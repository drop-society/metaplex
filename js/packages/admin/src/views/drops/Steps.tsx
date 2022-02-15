import { Step as MuiStep, StepButton, Stepper } from '@mui/material';
import * as React from 'react';
import { useForm } from 'src/reusable/Form';
import { Step } from 'src/reusable/Steps';

export const DropSteps: Array<ProgressStep<
{name?: string, location?: string} // Drop Details State
>>= [
  {
    step: "Setup Drop",
    substeps: [
      {
        step: "Drop Details",
        component: <></>,
        state: {
        }
      },
      {
        step: "Images",
        component: <></>,
        state: {
        }
      },
    ]
  },
  {
    step: "Create Event",
    substeps: [
      {
        step: "Event Details",
        component: <></>,
        state: {

        }
      },
      {
        step: "Venue",
        component: <></>,
        state: {

        },
      },
      {
        step: "Tickets and Pricing",
        component: <></>,
        state: {

        },
      },
    ]
  },
  {
    step: "NFT tokenization", 
    substeps: [
      {
        step: "Token Details",
        component: <></>,
        state: {

        },
      },
      {
        step: "Confirm & List Tickets",
        component: <></>,
        state: {

        },
      },
      {
        step: "Posters",
        component: <></>,
        state: {

        },
      },
    ]
  },
  {
    step: "Rewards",
    substeps: [
      {
        step: "Reward Details",
        component: <></>,
        state: {

        },
      },
      {
        step: "NFT collection to airdrop",
        component: <></>,
        state: {
        },
      },
      {
        step: "Confirm & List Tickets",
        component: <></>,
        state: {
        },
      },
    ]
  },
];




export interface StepCompleted {
  completed: boolean;
  substepsCompleted: {
    [index: number]: StepCompleted
  }
};

export interface DropFormState<T> {
  steps: Array<ProgressStep<T>>
  stepsCompleted: {
    [index: number]:  StepCompleted
  };
  step: number;
  subStep: number;
}

export const initialDropState: DropFormState<{}> = {
  steps: DropSteps,
  step: 0,
  subStep: 0,
  stepsCompleted: {}
}

type ProgressSubStep<T>  = {
  component: React.ReactNode;
  state: T;
} & Step;

export type ProgressStep<T> = {
  substeps: Array<ProgressSubStep<T>>
} & Step;

export const useCompleteStep = () => {
  const {setFieldValue, values: {stepsCompleted}} = useForm<DropFormState<{}>>()

  const setStepCompleted = (i: number, subi: number) => () => {
    let {completed, ...newStepsCompleted} = { ...stepsCompleted[i] } as StepCompleted

    if (subi !== undefined ) {
      setFieldValue('subStep', subi)
      setFieldValue('stepsCompleted', {
        ...stepsCompleted, [i]: { 
          ...newStepsCompleted, 
          substepsCompleted: {
            ...newStepsCompleted?.substepsCompleted, 
            [subi]: {completed: true} 
          }
        }
      })
    }
  }

  return [stepsCompleted, setStepCompleted];
}


export const useGoToStep = () => {
  const {setFieldValue} = useForm<DropFormState<{}>>()

  const goToStep = (i?: number, subi?: number) => () => {
    console.log('i: ', i, ' subi: ', subi)
    if (i !== undefined) {
      setFieldValue('step', i)
    }
    if (subi !== undefined) {
      setFieldValue('subStep', subi)
    }
  }

  return goToStep;
}

export function Steps() {
  const {values: {stepsCompleted, steps, step, subStep}} = useForm<DropFormState<{}>>()

  // custom hook to go to a step
  const goToStep = useGoToStep()
  console.log('step: ', step, ' substep: ', subStep)


  return (
     <Stepper nonLinear orientation="horizontal" activeStep={step}>
      {steps?.map(({ step: stepName }, index) => (
        <MuiStep key={index} completed={stepsCompleted[index]?.completed}>
          <StepButton color="inherit" onClick={goToStep(index, 0)}>
            {stepName}
          </StepButton>
        </MuiStep>
      ))}
    </Stepper>
  )
}

export function SubSteps() {
  const {values: {stepsCompleted, subStep, steps, step}} = useForm<DropFormState<{}>>()

  // custom hook to go to a step
  const goToStep = useGoToStep()

  return (
     <Stepper nonLinear orientation="vertical" activeStep={subStep}>
      {steps[step]?.substeps?.map(({ step: subStepName }, index) => (
        <MuiStep key={index} completed={stepsCompleted[step]?.substepsCompleted?.completed}>
          <StepButton color="inherit" onClick={goToStep(undefined, index)}>
            {subStepName}
          </StepButton>
        </MuiStep>
      ))}
    </Stepper>
  )
}