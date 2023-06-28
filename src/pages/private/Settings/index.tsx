import React, { useCallback, useMemo, useState } from 'react'
import { Flex, HStack, VStack } from '@chakra-ui/react'

import { TabButton } from '~components/Buttons'
import { Title } from '~components/Typograph/Title'
import { BodyLayout } from '~layouts/Body'

import { Profile } from './Tabs/Profile'
import { Admin } from './Tabs/Admin'

const settingsTabs = ['profile', 'admin'] as const
type SettingsTab = (typeof settingsTabs)[number]

type TabItemProps = {
  tab: SettingsTab
  title: string
  onSelected: (tab: SettingsTab) => void
  isAcitve: boolean
}

const TabItem = ({ title, tab, isAcitve, onSelected }: TabItemProps) => {
  const titleCapitalize = title.charAt(0).toUpperCase() + title.slice(1)

  const onSelectedTab = useCallback(() => {
    onSelected(tab)
  }, [onSelected, tab])

  return (
    <TabButton
      title={titleCapitalize}
      borderBottomWidth={1}
      borderBottomColor={isAcitve ? 'purple.900' : 'transparent'}
      onClick={onSelectedTab}
    />
  )
}

export function Settings() {
  const [selectedTab, setSelectedTab] = useState<SettingsTab>('profile')

  const tabs = useMemo((): Record<SettingsTab, React.JSX.Element | null> => {
    return {
      profile: <Profile />,
      admin: <Admin />,
    }
  }, [])

  return (
    <BodyLayout>
      <Title title="Settings" />
      <VStack spacing={2} mt="2">
        <HStack borderBottomWidth={1} w="100%">
          {settingsTabs.map((tab) => (
            <TabItem
              key={tab}
              tab={tab}
              title={tab}
              onSelected={setSelectedTab}
              isAcitve={selectedTab === tab}
            />
          ))}
        </HStack>
        <Flex w="100%" alignItems="center" justifyContent="center" flex={1}>
          {tabs[selectedTab]}
        </Flex>
      </VStack>
    </BodyLayout>
  )
}
