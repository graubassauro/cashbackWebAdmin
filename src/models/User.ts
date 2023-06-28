export type UserTokenDTO = {
  id: string
  uId: string
  firstName: string
  lastName: string
  email: string
  phone_number: string
}

export type UserDTO = {
  accessToken: string
  refreshToken: string
  expiresIn: number
  userToken: UserTokenDTO
}
