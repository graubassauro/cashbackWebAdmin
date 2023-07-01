import { NavLink, useLocation } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react'

import { formatBreadcrumbLabel } from '~utils/formatBreadcrumbLabel'

export function BreadCrumb() {
  const locations = useLocation()

  const endpoints = locations.pathname
    .split('/')
    .filter((endpoint) => endpoint !== '')

  const formattedEndpoints = endpoints.map((endpoint) => {
    const breadcrumbLabel = formatBreadcrumbLabel(endpoint)

    const item = {
      pathName: `${endpoint}`,
      breadcrumbName: breadcrumbLabel,
    }

    return item
  })

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <NavLink to="/">
          <Text
            fontSize={18}
            fontWeight={400}
            color="gray.900"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            Dasbhoard
          </Text>
        </NavLink>
      </BreadcrumbItem>

      {formattedEndpoints.map((item) => (
        <BreadcrumbItem
          key={item.pathName}
          isCurrentPage={item.pathName === endpoints[endpoints.length - 1]}
        >
          <NavLink to={`/${item.pathName}`}>
            <Text
              fontSize={18}
              fontWeight={
                item.pathName === endpoints[endpoints.length - 1] ? 700 : 400
              }
              color="gray.900"
            >
              {item.breadcrumbName}
            </Text>
          </NavLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
