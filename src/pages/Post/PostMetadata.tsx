import React from 'react'
import type { IPostMetadata } from '@ammarahmedca/types'
import { useTextGradient } from '../../hooks/styles'
import { formatDistance } from 'date-fns'
import { Chip, Skeleton } from '@nextui-org/react'
import { useBreakpointValue } from '../../hooks/mediaQuery'

export type PostMetadataProps = {
  metadata: IPostMetadata
}

export const PostMetadataSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col space-y-3 my-8'>
      <Skeleton className='h-4 w-16 rounded-lg' />
      <Skeleton className='h-12 w-4/5 rounded-lg' />
      <Skeleton className='h-6 w-24 rounded-lg' />
    </div>
  )
}

const PostMetadata: React.FC<PostMetadataProps> = ({ metadata }) => {
  const textGradient = useTextGradient({
    dir: 'r',
    from: 'primary-500',
    to: 'secondary-300',
  })
  const chipSize = useBreakpointValue<'sm' | 'md' | 'lg'>({
    default: 'sm',
    md: 'md',
  })
  const elapsed = formatDistance(
    new Date(metadata.date),
    new Date(),
    { addSuffix: true },
  )
  return (
    <div className='flex flex-col space-y-3 my-8'>
      <p className='text-base md:text-lg font-extrabold uppercase'>
        {metadata.category}
      </p>
      <h1
        className={`text-4xl md:text-6xl font-bold ${textGradient} font-display !leading-tight`}
      >
        {metadata.name}
      </h1>
      <p className='text-default-500 text-base md:text-lg'>
        {elapsed}
      </p>
      <div className='flex -m-1 flex-wrap'>
        {metadata.tags.map((tag, idx) => {
          return (
            <Chip
              key={`tag-${idx}`}
              variant='bordered'
              className='m-1'
              size={chipSize}
            >
              {tag}
            </Chip>
          )
        })}
      </div>
    </div>
  )
}

export default PostMetadata
