import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs/LightInput'
import { FormLayout } from '~layouts/Form'

export function CreateAccount() {
  return (
    <FormLayout title="Create account" hasGoBackButton>
      <LightInput
        id="firstname"
        name="firstname"
        placeholder="Firstname"
        type="text"
      />
      <LightInput
        id="lastname"
        name="lastname"
        placeholder="Lastname"
        type="text"
      />
      <LightInput
        id="phonenumber"
        name="phonenumber"
        placeholder="Phone number"
        type="text"
      />
      <LightInput id="email" name="email" placeholder="E-mail" type="text" />
      <LightInput id="code" name="code" placeholder="ZIP code" type="text" />
      <LightInput
        id="address"
        name="address"
        placeholder="Address"
        type="text"
      />
      <LightInput
        id="country"
        name="country"
        placeholder="Country"
        type="text"
      />
      <LightInput
        id="password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <ButtonComponent title="Send" />
    </FormLayout>
  )
}
