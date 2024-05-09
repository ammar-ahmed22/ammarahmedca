import React from 'react'
import type { IPostMetadata } from '@ammarahmedca/types'
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Image,
  Skeleton,
} from '@nextui-org/react'
import { formatDistance } from 'date-fns'
import RichText from '../../components/RichText'
import { Chip } from '@nextui-org/react'
import { Link } from 'react-router-dom'

export const BlogCardSkeleton: React.FC<{ size?: 'sm' | 'lg' }> = ({
  size,
}) => {
  return (
    <Card className={`p-8 w-full`}>
      <Skeleton className='h-2 w-1/5 mb-2 rounded-full' />
      <Skeleton className='h-4 w-2/5 mb-4 rounded-full' />
      <Skeleton className='h-2 w-1/5 mb-4 rounded-full' />
      <Skeleton
        className={`w-full ${size && size === 'lg' ? 'h-64' : 'h-48'} rounded-lg mb-4`}
      />
      {new Array(4).fill(0).map((_, idx) => {
        return (
          <Skeleton
            key={`proj-skel-desc-${idx}`}
            className={`h-3 ${idx < 3 ? 'w-100 mb-2' : 'w-2/5 mb-4'} rounded-full`}
          />
        )
      })}
    </Card>
  )
}

export type BlogCardProps = {
  metadata: IPostMetadata
}

const BlogCard: React.FC<BlogCardProps> = ({ metadata }) => {
  const elapsed = formatDistance(
    new Date(metadata.date),
    new Date(),
    { addSuffix: true },
  )

  return (
    <Card
      className='py-8'
      isPressable
      as={Link}
      to={`/blog/${metadata.slug}`}
      state={metadata}
      classNames={{
        base: 'hover:bg-content2',
      }}
    >
      <CardHeader className='pb-4 pt-2 px-8 flex items-start justify-between'>
        <div>
          <p className='text-xs uppercase font-bold'>
            {metadata.category}
          </p>
          <h3 className='text-large font-bold'>{metadata.name}</h3>
          <p className='text-base text-default-500 font-light'>
            {elapsed}
          </p>
        </div>
      </CardHeader>
      <CardBody className='overflow-visible py-2 px-8 flex flex-col items-start space-y-5'>
        {metadata.image && (
          <Image
            src={metadata.image}
            classNames={{
              wrapper: 'w-full !max-w-full',
              img: 'w-full',
            }}
            isBlurred
            isZoomed
          />
        )}
        <RichText
          data={metadata.description}
          className='text-default-500'
        />
      </CardBody>
      <CardFooter className='px-8'>
        <div className='flex -m-1 flex-wrap'>
          {metadata.tags.map((tag, idx) => {
            return (
              <Chip
                key={`blog-post-${metadata.id}-tag-${idx}`}
                variant='bordered'
                className='m-1'
                size='sm'
              >
                {tag}
              </Chip>
            )
          })}
        </div>
      </CardFooter>
    </Card>
  )
}

export default BlogCard
