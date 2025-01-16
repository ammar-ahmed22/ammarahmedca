import React, { useEffect, useState } from 'react'
import { useTextGradient } from '../../hooks/styles'
import { Input } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import BlogTags from './BlogTags'
import BlogCategories from './BlogCategories'
import {
  BLOG_METADATA_QUERY,
  BlogMetadataQuery,
} from '../../graphql/queries/Metadata'
import { useQuery } from '@apollo/client'
import BlogCard, { BlogCardSkeleton } from './BlogCard'
import { useBreakpointValue } from '../../hooks/mediaQuery'
import { useDebounced } from '../../hooks/debounce'
import { clearConfigCache } from 'prettier'

const Blog: React.FC = () => {
  const textGradient = useTextGradient({
    dir: 'r',
    from: 'primary-500',
    to: 'secondary-300',
  })
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState<string | undefined>()
  const [query, debouncedQuery, setQuery] = useDebounced('', {
    delay: 400,
  })

  const { data, loading } = useQuery<
    BlogMetadataQuery.Response,
    BlogMetadataQuery.Variables
  >(BLOG_METADATA_QUERY, {
    variables: {
      onlyPublished:
        process.env.NODE_ENV === 'development' ? false : true,
      category,
      tags,
      query: debouncedQuery,
    },
  })
  const isMobile = useBreakpointValue({ default: true, md: false })

  return (
    <main className='relative transition min-h-screen'>
      <div className='flex flex-col items-center mt-[10vh] space-y-4 mb-12'>
        <h1
          className={`font-display font-extrabold text-5xl ${textGradient} leading-normal text-center`}
        >
          Blog
        </h1>
        <p className='text-default-500 md:text-xl text-lg md:w-3/5 w-full text-center'>
          Sometimes I like to write about things I've worked on, my
          experiences or anything else of interest to me.
        </p>
        {/* TODO: Implement search in backend and come back to this. */}
        <Input
          placeholder='Search by name, category or tag'
          label='Search'
          startContent={<MagnifyingGlassIcon className='size-4' />}
          isClearable
          value={query}
          onValueChange={setQuery}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-4'>
          <BlogTags
            onSelectionChange={(values: string[]) => setTags(values)}
          />
          <BlogCategories
            onSelectionChange={(value?: string) => setCategory(value)}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <div className='flex flex-col space-y-4'>
            {loading &&
              !data &&
              new Array(isMobile ? 4 : 2).fill(0).map((_, idx) => {
                return (
                  <BlogCardSkeleton
                    key={`blog-post-skel-left-${idx}`}
                  />
                )
              })}
            {data &&
              data.blogMetadata
                .filter((_, idx) => {
                  if (isMobile) return true
                  return idx % 2 === 0
                })
                .map((metadata) => {
                  return <BlogCard metadata={metadata} />
                })}
          </div>
          <div className='flex flex-col space-y-4 w-full'>
            {!isMobile &&
              loading &&
              !data &&
              new Array(2).fill(0).map((_, idx) => {
                return (
                  <BlogCardSkeleton
                    size='lg'
                    key={`blog-post-skel-right-${idx}`}
                  />
                )
              })}
            {!isMobile &&
              data &&
              data.blogMetadata
                .filter((_, idx) => idx % 2 !== 0)
                .map((metadata) => {
                  return <BlogCard metadata={metadata} />
                })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Blog
