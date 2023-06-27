import { cashbackApi } from '~api/cashback-api.service'

export interface IGenericPhoneNumberParams {
  phoneNumber: string
}

export interface IPhoneNumberVerificateCodeParams
  extends IGenericPhoneNumberParams {
  code: string
}

export interface IResetPasswordParams {
  newPassword: string
  phoneNumber: string
  token: string
}

const generateBaseUrl = (url: string) => `/account/${url}`

export const accountServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postPhoneNumberGenerateCode: build.mutation<
      void,
      IGenericPhoneNumberParams
    >({
      query: (body) => ({
        url: generateBaseUrl('phone-number/generate-code'),
        body,
        method: 'POST',
      }),
    }),
    postPhoneNumberVerificateCode: build.mutation<
      void,
      IPhoneNumberVerificateCodeParams
    >({
      query: (body) => ({
        url: generateBaseUrl('phone-number/verificate-code'),
        body,
        method: 'POST',
      }),
    }),
    postForgotPassword: build.mutation<void, IGenericPhoneNumberParams>({
      query: (body) => ({
        url: generateBaseUrl('forgot-password'),
        body,
        method: 'POST',
      }),
    }),
    putPasswordPhoneNumberReset: build.mutation<void, IResetPasswordParams>({
      query: (body) => ({
        url: generateBaseUrl('password/phone-number/reset'),
        body,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  usePostPhoneNumberGenerateCodeMutation,
  usePostPhoneNumberVerificateCodeMutation,
  usePostForgotPasswordMutation,
  usePutPasswordPhoneNumberResetMutation,
} = accountServiceApi
