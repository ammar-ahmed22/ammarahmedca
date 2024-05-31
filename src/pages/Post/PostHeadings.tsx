import React, { useMemo, useEffect, useState, useRef } from 'react'
import type { Heading } from '../../utils/content'
import { scrollToElement, pageDistance } from '../../utils/window'
import { useBreakpointValue } from '../../hooks/mediaQuery'
import {
  Dropdown,
  Button,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
} from '@nextui-org/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { createHeadingID } from '../../utils/content'

export type PostHeadingsProps = {
  headings: Heading[]
}

const PostHeadings: React.FC<PostHeadingsProps> = ({ headings }) => {
  const maxHeading = useMemo(() => {
    return Math.min(...headings.map((h) => h.level))
  }, [headings])
  const [active, setActive] = useState(-1)

  const handleClick = (targetId: string) => {
    const navHeight = document.querySelector(
      '#mainNav',
    ) as HTMLElement | null
    let offset = 0
    if (navHeight) offset = navHeight.offsetHeight
    if (targetId) scrollToElement('#' + targetId, offset)
  }

  const isXl = useBreakpointValue({ default: false, xl: true })
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nav = document.querySelector('#mainNav') as HTMLElement
    const handleScroll = (e: Event) => {
      let offsetScrollPos = window.scrollY + nav.offsetHeight
      if (headings) {
        let prevEl =
          active > 0
            ? document.querySelector(
                `#${createHeadingID(headings[active - 1], headings)}`,
              )
            : undefined
        let nextEl =
          active < headings.length - 1
            ? document.querySelector(
                `#${createHeadingID(headings[active + 1], headings)}`,
              )
            : undefined
        if (prevEl) {
          const prevDist = pageDistance(prevEl as HTMLElement)
          if (offsetScrollPos <= prevDist)
            setActive((prev) => prev - 1)
        }

        if (nextEl) {
          const nextDist = pageDistance(nextEl as HTMLElement)
          if (offsetScrollPos >= nextDist)
            setActive((prev) => prev + 1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings, active])

  if (isXl) {
    return (
      <div
        ref={mainRef}
        className={`fixed z-20 top-[30vh] bottom-0 right-[calc(0.5*(100vw-56rem))] translate-x-full hidden xl:block w-[calc(0.5*(1280px-56rem))] ps-2 pe-2 pb-2 overflow-y-auto`}
      >
        <h5 className='font-semibold text-sm text-default-900 pb-2'>
          On this page
        </h5>
        <ul className='text-default-600/75 text-sm leading-6'>
          {headings.map((heading, idx) => {
            const id = createHeadingID(heading, headings)
            const levelDiff = Math.abs(maxHeading - heading.level)
            return (
              <li
                key={id + idx}
                className={`ml-${2 * levelDiff + 2 * Math.max(levelDiff - 1, 0)} ${idx === active ? 'text-primary' : 'hover:text-default-800'}`}
              >
                <a
                  href={`#${id}`}
                  onClick={(
                    e: React.MouseEvent<
                      HTMLAnchorElement,
                      MouseEvent
                    >,
                  ) => {
                    e.preventDefault()
                    handleClick(id)
                  }}
                >
                  {heading.plainText}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return (
      <>
        {headings && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                className='fixed z-20 right-4 bottom-4 bg-default/75'
                isIconOnly
                variant='flat'
              >
                <EllipsisVerticalIcon className='size-5' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection title='On this page'>
                {headings.map((heading, idx) => {
                  const id = createHeadingID(heading, headings)
                  const levelDiff = Math.abs(
                    maxHeading - heading.level,
                  )
                  const offset =
                    2 * levelDiff + 2 * Math.max(levelDiff - 1, 0)
                  return (
                    <DropdownItem
                      key={id}
                      classNames={{
                        title: `ml-${offset} ${active === idx ? 'text-primary' : ''}`,
                      }}
                      onPress={() => {
                        handleClick(id)
                      }}
                    >
                      <a
                        href={`#${id}`}
                        onClick={(
                          e: React.MouseEvent<
                            HTMLAnchorElement,
                            MouseEvent
                          >,
                        ) => {
                          e.preventDefault()
                        }}
                      >
                        {heading.plainText}
                      </a>
                    </DropdownItem>
                  )
                })}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        )}
      </>
    )
  }
}

export default PostHeadings
