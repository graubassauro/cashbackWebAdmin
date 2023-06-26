export function formatBreadcrumbLabel(breadcrumb: string) {
  const splittedEndpoint = breadcrumb.split('-')

  if (splittedEndpoint.length > 1) {
    const firstPathName =
      splittedEndpoint[0].charAt(0).toUpperCase() + splittedEndpoint[0].slice(1)
    const secondPathName =
      splittedEndpoint[0].charAt(0).toUpperCase() + splittedEndpoint[0].slice(1)

    return `${firstPathName} ${secondPathName}`
  } else {
    const firstPathName =
      splittedEndpoint[0].charAt(0).toUpperCase() + splittedEndpoint[0].slice(1)

    return firstPathName
  }
}
