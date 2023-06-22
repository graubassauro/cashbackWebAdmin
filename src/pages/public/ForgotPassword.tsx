import { useCallback, useMemo, useState } from 'react'
import { ButtonProps, Text } from '@chakra-ui/react'

import { ButtonComponent } from '~components/Forms/Button'
import { FormLayout } from '~layouts/Form'
import { NavLink } from 'react-router-dom'
import { LightInput } from '~components/Forms/Inputs'

type PasswordRecoveryWrapperProps = ButtonProps & {
  description: string
  onHandleStepForward: () => void
}

const PasswordRecoveryWrapper = ({
  description,
  onHandleStepForward,
  ...rest
}: PasswordRecoveryWrapperProps) => {
  return (
    <>
      <Text>{description}</Text>
      <LightInput
        id="text"
        name="text"
        placeholder="Phone number"
        type="text"
      />
      <ButtonComponent title="Send" {...rest} onClick={onHandleStepForward} />
    </>
  )
}

type PassworInputGroupProps = ButtonProps & {
  onHandleStepForward: () => void
}

const PassworInputGroup = ({
  onHandleStepForward,
  ...rest
}: PassworInputGroupProps) => {
  return (
    <>
      <LightInput id="code" name="code" placeholder="Code" type="number" />
      <LightInput
        id="password"
        name="password"
        placeholder="New password"
        type="password"
      />
      <LightInput
        id="confirm_password"
        name="confirm_password"
        placeholder="Confirm Password"
        type="password"
      />
      <ButtonComponent
        title="Return to Login"
        {...rest}
        onClick={onHandleStepForward}
      />
    </>
  )
}

type PasswordConfirmProps = ButtonProps & {
  description: string
}

const PasswordConfirm = ({ description, ...rest }: PasswordConfirmProps) => {
  return (
    <>
      <Text>{description}</Text>
      <NavLink to="/">
        <ButtonComponent title="Save" {...rest} />
      </NavLink>
    </>
  )
}

const TOTAL_STEPS = 3

export function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1)

  console.log('current step: ' + currentStep)

  const handleStepForward = useCallback(() => {
    if (currentStep <= TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep, setCurrentStep])

  const handleStepBackwards = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep, setCurrentStep])

  const currentStepData = useMemo(() => {
    switch (currentStep) {
      case 2:
        return {
          title: 'New password',
          component: (
            <PassworInputGroup onHandleStepForward={handleStepForward} />
          ),
        }
      case 3:
        return {
          title: `That's all`,
          component: (
            <PasswordConfirm description="Now you can use our plataform again" />
          ),
        }
      default:
        return {
          title: 'Password recovery',
          component: (
            <PasswordRecoveryWrapper
              description="Type your phone number to receive the code to recovery your password"
              onHandleStepForward={handleStepForward}
              onClick={handleStepBackwards}
            />
          ),
        }
    }
  }, [currentStep, handleStepForward, handleStepBackwards])

  return (
    <FormLayout
      title={currentStepData.title}
      hasGoBackButton={currentStep === 1}
      hasGoStepButton={currentStep > 1}
      centeredForm
      onClick={handleStepBackwards}
    >
      {currentStepData.component}
    </FormLayout>
  )
}
