import { RootState } from '~redux/store'

export const authenticationHeader = (
  headers: Headers,
  { getState }: { getState: () => unknown },
) => {
  const { token } = (getState() as RootState).auth
  headers.set('Access-Control-Allow-Origin', '*')

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  if (!headers.has('Content-type')) {
    headers.set('Content-Type', 'application/json')
  }

  return headers
}
