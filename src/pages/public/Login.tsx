import { useCallback, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { Text, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs'
import { FormLayout } from '~layouts/Form'
// import { useAppDispatch } from '~redux/store'
import { setCredentials } from '~redux/auth'
import { usePostAuthLoginMutation } from '~services/auth.service'
import { useDispatch } from 'react-redux'

const loginFormSchema = z.object({
  phoneNumber: z.string(),
  password: z.string(),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function Login() {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  })

  const [requestAuthLogin, { isLoading, isSuccess, data: loginData }] =
    usePostAuthLoginMutation()

  const handleLogin = useCallback(
    (data: LoginFormInputs) => {
      const { phoneNumber, password } = data

      requestAuthLogin({
        PhoneNumber: phoneNumber,
        Password: password,
      })
    },
    [requestAuthLogin],
  )

  useEffect(() => {
    if (isSuccess && loginData) {
      console.log(isSuccess)
      dispatch(
        setCredentials({
          user: loginData.data.userToken,
          refresh_token: loginData.data.refreshToken,
          token: loginData.data.accessToken,
        }),
      )
    }
  }, [isSuccess, loginData, dispatch])

  return (
    <FormLayout title="Access">
      <VStack
        as="form"
        spacing={4}
        mb={4}
        alignItems="flex-end"
        onSubmit={handleSubmit(handleLogin)}
      >
        <LightInput
          id="phone-number"
          placeholder="Your Phone number"
          type="text"
          {...register('phoneNumber')}
          error={errors.phoneNumber}
        />
        <LightInput
          id="password"
          placeholder="Password"
          type="password"
          {...register('password')}
          error={errors.password}
        />

        <NavLink to="forgot-password">
          <Text
            color="yellow.700"
            fontWeight={700}
            textAlign="right"
            transition="ease-in 0.35s"
            textDecoration="underline"
          >
            Forgot my passsowrd
          </Text>
        </NavLink>
        <ButtonComponent
          title="Login"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting || isLoading || !isValid}
        />
      </VStack>

      <NavLink to="/create-account">
        <Text
          textAlign="center"
          transition="ease-in 0.35s"
          textDecorationColor="gray.300"
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {`Don't`} have an account? Click here
        </Text>
      </NavLink>
    </FormLayout>
  )
}
