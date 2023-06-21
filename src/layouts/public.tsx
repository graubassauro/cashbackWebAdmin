import { Grid, Image, useBreakpointValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import LoginImage from '~assets/images/login.png'

export function PublicLayout() {
  const isToShowImage = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Grid
      w="100%"
      h="100%"
      templateColumns={isToShowImage ? '1fr 1fr' : '1fr'}
      minH="100vh"
    >
      <Outlet />
      {isToShowImage ? (
        <Image
          src={LoginImage}
          alt="Login"
          h="100vh"
          w="100%"
          objectFit="fill"
        />
      ) : null}
    </Grid>
  )
}
