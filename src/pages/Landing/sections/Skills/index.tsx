import React, { Key, useState } from 'react'
import { useTextGradient } from '../../../../hooks/styles'
import { Tab, Tabs } from '@nextui-org/react'
import {
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  CommandLineIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid'
import SkillChart from './SkillChart'
import { useBreakpointValue } from '../../../../hooks/mediaQuery'

const Skills: React.FC = () => {
  // Styling
  const gradient = useTextGradient({
    dir: 'r',
    from: 'primary-500',
    to: 'secondary-300',
  })

  type TabData = {
    key: string
    label: React.ReactNode
    icon?: React.ReactNode
  }

  const tabs: TabData[] = [
    {
      key: 'Language',
      label: 'Languages',
      icon: <CodeBracketIcon className='size-4' />,
    },
    {
      key: 'Framework',
      label: 'Frameworks',
      icon: <WrenchScrewdriverIcon className='size-4' />,
    },
    {
      key: 'Developer Tool',
      label: 'Developer Tools',
      icon: <CommandLineIcon className='size-4' />,
    },
    {
      key: 'Other',
      label: 'Other',
      icon: <LightBulbIcon className='size-4' />,
    },
  ]
  const [selectedTab, setSelectedTab] = useState<string>('Language')
  const tabSize = useBreakpointValue<'sm' | 'md' | 'lg'>({
    default: 'sm',
    md: 'md',
  })

  return (
    <section className='relative transition my-8'>
      <h2
        className={`${gradient} font-display text-6xl font-bold leading-normal mb-2`}
      >
        Skills
      </h2>
      <div className='flex w-full flex-col'>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key: Key) => {
            setSelectedTab(key as string)
          }}
          variant='underlined'
          color='primary'
          size={tabSize}
        >
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.key}
                title={
                  <div className='flex items-center space-x-2'>
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                }
                className='w-full'
              >
                <div className='flex items-center justify-center w-full h-[60vh]'>
                  <SkillChart type={tab.key} />
                </div>
              </Tab>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}

export default Skills
