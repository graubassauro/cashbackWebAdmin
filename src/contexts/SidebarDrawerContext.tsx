import { createContext, ReactNode, useContext } from 'react'
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'

interface SidebarDrawerProdiverProps {
  children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProdiverProps) {
  const disclosure = useDisclosure()

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
