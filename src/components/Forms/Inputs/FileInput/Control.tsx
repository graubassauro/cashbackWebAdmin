import { ChangeEvent } from 'react'
import { Input, InputProps } from '@chakra-ui/react'

import { useFileInputContext } from '~contexts/FileListInputContext'

export type ControlProps = InputProps & {}

export function Control({ multiple = false, ...props }: ControlProps) {
  const { id, onFilesSelected } = useFileInputContext()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files, multiple)
  }

  return (
    <Input
      type="file"
      id={id}
      display="none"
      onChange={handleFilesSelected}
      multiple={multiple}
      {...props}
    />
  )
}
