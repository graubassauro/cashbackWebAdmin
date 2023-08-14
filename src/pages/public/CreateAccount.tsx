import { useCallback, useEffect } from 'react'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs'
import { FormLayout } from '~layouts/Form'
import { setCredentials } from '~redux/auth'
import { usePostCreateMerchantMutation } from '~services/merchant.service'
import { usePostAuthLoginMutation } from '~services/auth.service'

const createMerchantAccountSchema = z.object({
  firstName: z
    .string()
    .min(5, 'The first name must have at least 5 characters'),
  lastName: z.string().min(5, 'The last name must have at least 5 characters'),
  email: z.string().email('Inform a valid email address'),
  phoneNumber: z
    .string()
    .min(6, 'Inform a valid phone number without special characters'),
  address: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type CreateMerchantAccountInputs = z.infer<typeof createMerchantAccountSchema>

export function CreateAccount() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateMerchantAccountInputs>({
    resolver: zodResolver(createMerchantAccountSchema),
    mode: 'onChange',
  })

  const passwordFieldValue = watch('password')

  const [
    requestCreateMerchant,
    { isLoading, isSuccess: isCreateMerchantSuccess, data: merchantData },
  ] = usePostCreateMerchantMutation()

  const [
    requestAuthLogin,
    {
      isLoading: isLoadingAuthLogin,
      isSuccess: isAuthLoginSuccess,
      data: loginData,
    },
  ] = usePostAuthLoginMutation()

  const handleCreateMerchantAccount = useCallback(
    (data: CreateMerchantAccountInputs) => {
      const { firstName, lastName, phoneNumber, address, email, password } =
        data

      requestCreateMerchant({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password,
      })
    },
    [requestCreateMerchant],
  )

  /**
   * First useEffect after successful merchant creation
   */
  useEffect(() => {
    if (isCreateMerchantSuccess && merchantData) {
      requestAuthLogin({
        PhoneNumber: merchantData.data.phoneNumber,
        Password: passwordFieldValue,
        isPersistent: false,
      })
    }
  }, [
    isCreateMerchantSuccess,
    merchantData,
    requestAuthLogin,
    passwordFieldValue,
  ])

  /**
   * Second useEffect after successful login
   */
  useEffect(() => {
    if (isAuthLoginSuccess && loginData) {
      dispatch(
        setCredentials({
          user: loginData.data.userToken,
          refresh_token: loginData.data.refreshToken,
          token: loginData.data.accessToken,
          is_first_login: true,
        }),
      )
      navigate('/')
    }
  }, [isAuthLoginSuccess, loginData, dispatch, navigate])

  return (
    <FormLayout title="Create account" hasGoBackButton>
      <VStack
        as="form"
        spacing={4}
        onSubmit={handleSubmit(handleCreateMerchantAccount)}
      >
        <LightInput
          id="firstname"
          placeholder="Firstname"
          type="text"
          {...register('firstName')}
          error={errors.firstName}
        />
        <LightInput
          id="lastname"
          placeholder="Lastname"
          type="text"
          {...register('lastName')}
          error={errors.lastName}
        />
        <LightInput
          id="phonenumber"
          placeholder="Phone number"
          type="text"
          {...register('phoneNumber')}
          error={errors.phoneNumber}
        />
        <LightInput
          id="address"
          placeholder="Address"
          type="text"
          {...register('address')}
          error={errors.address}
        />
        <LightInput
          id="email"
          placeholder="E-mail"
          type="text"
          {...register('email')}
          error={errors.email}
        />
        <LightInput
          id="password"
          placeholder="Password"
          type="password"
          {...register('password')}
          error={errors.password}
        />
        <ButtonComponent
          type="submit"
          title="Send"
          isLoading={isSubmitting || isLoadingAuthLogin}
          disabled={isSubmitting || isLoading || !isValid}
        />
      </VStack>
    </FormLayout>
  )
}
