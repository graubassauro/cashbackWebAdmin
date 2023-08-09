import { format, formatDistanceToNow } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

function formatDate(date: string) {
  return format(new Date(date), 'MM/dd/yyyy', {
    locale: enUS,
  })
}

function distanceRelativeFromToday(date: string) {
  return formatDistanceToNow(new Date(date), {
    locale: enUS,
  })
}

export { formatDate, distanceRelativeFromToday }
