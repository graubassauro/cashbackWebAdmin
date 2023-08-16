import { IAddressLocationDTO } from '~services/location.service'

export function formatAddress(data: IAddressLocationDTO) {
  const countryAddress = data.address.country ? `, ${data.address.country}` : ''
  const cityAddress = data.address.city ? `${data.address.city},` : ''
  const stateAddress = data.address.state ? ` ${data.address.state}` : ''
  const roadAddress = data.address.road ? ` ${data.address.road}` : ''
  const suburbAddress = data.address.suburb ? ` ${data.address.suburb}` : ''

  const address =
    data.address.road && data.address.suburb
      ? `${data.address.road}, ${data.address.suburb} - `
      : data.address.road && !data.address.suburb
      ? `${roadAddress} - `
      : !data.address.road && data.address.suburb
      ? `${suburbAddress} - `
      : ''

  const streetFormattedValue = `${address}${cityAddress}${stateAddress}${countryAddress}`

  return streetFormattedValue
}

export function formatAddressList(data: IAddressLocationDTO[]) {
  const streetAddressList = data.map((l) => {
    const item = formatAddress(l)

    return {
      formattedDisplayName: item,
      item: l,
    }
  })

  return streetAddressList
}
