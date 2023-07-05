import { useCallback } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Icon, Text } from '@chakra-ui/react'
import { DotsThreeOutline } from '@phosphor-icons/react'

import { formatBreadcrumbLabel } from '~utils/formatBreadcrumbLabel'

export function BreadCrumb() {
  const locations = useLocation()
  const navigate = useNavigate()

  const endpoints = locations.pathname
    .split('/')
    .filter((endpoint) => endpoint !== '')

  const formattedEndpoints = endpoints.map((endpoint) => {
    const breadcrumbLabel = formatBreadcrumbLabel(endpoint)

    const actualPathName =
      endpoints[0] !== endpoint ? `${endpoints[0]}/${endpoint}` : endpoint

    const item = {
      pathName: actualPathName,
      breadcrumbName: breadcrumbLabel,
    }

    return item
  })

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

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

      <Icon
        as={DotsThreeOutline}
        w={6}
        h={6}
        borderRadius={6}
        color="gray.700"
        transition="ease-in 0.35s"
        _hover={{
          cursor: 'pointer',
        }}
        onClick={handleGoBack}
      />

      {formattedEndpoints.map((item, index) => (
        <BreadcrumbItem
          key={item.pathName}
          isCurrentPage={item.pathName === endpoints[endpoints.length - 1]}
        >
          {index === formattedEndpoints.length - 1 && (
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
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
