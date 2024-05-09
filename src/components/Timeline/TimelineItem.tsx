import React from 'react'
import { Skeleton } from '@nextui-org/react'

export type TimelineItemProps = {
  bulletContent: React.ReactNode
} & React.ComponentPropsWithoutRef<'li'>

export const TimelineItemSkeleton: React.FC = () => {
  return (
    <>
      <li className='ms-6 mb-10'>
        <Skeleton className='size-8 -start-4 rounded-full absolute' />
        <Skeleton className='h-3 w-1/5 rounded-full mt-2 mb-2' />
        <Skeleton className='h-5 w-1/6 rounded-full mb-2' />
        <Skeleton className='h-5 w-12 rounded-sm mb-2' />
        {new Array(5).fill(0).map((_, idx) => {
          return (
            <Skeleton
              key={`exp-skel-text-${idx}`}
              className={`h-3 rounded-full mb-1 ${idx < 4 ? 'w-full' : 'w-4/6'}`}
            />
          )
        })}
      </li>
    </>
  )
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  className,
  children,
  bulletContent,
  ...others
}) => {
  return (
    <li className={`${className ?? ''} ms-6 mb-10`} {...others}>
      <span className='absolute flex items-center justify-center size-8 rounded-full -start-4 bg-primary-200 dark:bg-primary-700 text-primary-700 dark:text-primary-200 '>
        {bulletContent}
      </span>
      {children}
    </li>
  )
}

export default TimelineItem
