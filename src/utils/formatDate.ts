import { format } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

export function formatDate(date: string) {
  return format(new Date(date), 'MM/dd/yyyy', {
    locale: enUS,
  })
}
