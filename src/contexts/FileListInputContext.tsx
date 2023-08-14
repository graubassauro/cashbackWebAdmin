import { createContext, ReactNode, useContext, useId, useState } from 'react'

interface FileListInputProviderProps {
  children: ReactNode
}

type FileInputContextType = {
  id: string
  files: File[]
  onFilesSelected: (files: File[], multiple: boolean) => void
  onFileUnSelect: (fileName: string, multiple: boolean) => void
}

const FileInputContext = createContext({} as FileInputContextType)

export function FileListInputProvider({
  children,
}: FileListInputProviderProps) {
  const id = useId()
  const [files, setFiles] = useState<File[]>([])

  function onFilesSelected(files: File[], multiple: boolean) {
    if (multiple) {
      setFiles((state) => [...state, ...files])
    } else {
      setFiles(files)
    }
  }

  function onFileUnSelect(fileName: string, multiple: boolean) {
    if (multiple) {
      const updatedFileList = files.filter((f) => f.name !== fileName)

      setFiles(updatedFileList)
    } else {
      setFiles([])
    }
  }
  return (
    <FileInputContext.Provider
      value={{ id, files, onFilesSelected, onFileUnSelect }}
    >
      {children}
    </FileInputContext.Provider>
  )
}

export const useFileInputContext = () => useContext(FileInputContext)
