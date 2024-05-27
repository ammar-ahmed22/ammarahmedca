import React from 'react'
import type { NavigationOption } from '.'
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/react'
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
} from '@heroicons/react/16/solid'
import { FaGithub } from 'react-icons/fa'
import { useTheme, useThemeValue } from '../../hooks/theme'
import { useNavigate } from 'react-router-dom'

export type MobileNavigationProps = {
  active?: string
  options: NavigationOption[]
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  active,
  options,
}) => {
  const { toggleTheme } = useTheme()
  const ThemeIcon = useThemeValue(MoonIcon, SunIcon)
  const themeText = useThemeValue('Dark Mode', 'Light Mode')
  const nav = useNavigate()
  return (
    <div className='relative flex md:hidden items-center ml-auto'>
      <Dropdown
        // showArrow
        radius='sm'
        backdrop='blur'
        classNames={{
          base: 'before:bg-default-200',
          content: 'p-0 border-small border-divider bg-background',
        }}
      >
        <DropdownTrigger>
          <Button isIconOnly variant='light' color='default'>
            <Bars3Icon className='size-5' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Custom item styles'
          disabledKeys={['profile']}
          className='p-3'
          variant='light'
          itemClasses={{
            base: [
              'w-64',
              'rounded-md',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-default-100',
              'dark:data-[hover=true]:bg-default-50',
              'data-[selectable=true]:focus:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500',
            ],
            title: ['text-lg'],
          }}
        >
          <DropdownSection
            aria-label='Navigation options'
            showDivider
          >
            {options.map((opt) => {
              const isActive = opt.id === active
              return (
                <DropdownItem
                  key={`nav-opt-${opt.id}`}
                  as='a'
                  href={opt.to}
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  onPress={() => nav(opt.to)}
                  classNames={{
                    base: [
                      'w-64',
                      'rounded-md',
                      !isActive && 'text-default-500',
                      'transition-opacity',
                      isActive && 'text-default-900',
                      !isActive &&
                        'data-[hover=true]:text-foreground',
                      !isActive && 'data-[hover=true]:bg-default-100',
                      !isActive &&
                        'dark:data-[hover=true]:bg-default-50',
                      'data-[selectable=true]:focus:bg-default-50',
                      'data-[pressed=true]:opacity-70',
                      'data-[focus-visible=true]:ring-default-500',
                    ],
                    title: ['text-lg', isActive && 'font-bold'],
                  }}
                >
                  {opt.element}
                </DropdownItem>
              )
            })}
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              startContent={<ThemeIcon className='size-4' />}
              onPress={toggleTheme}
            >
              {themeText}
            </DropdownItem>
            <DropdownItem
              startContent={<FaGithub className='size-4' />}
              as='a'
              href='https://github.com/ammar-ahmed22/ammarahmedca'
            >
              GitHub
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default MobileNavigation
