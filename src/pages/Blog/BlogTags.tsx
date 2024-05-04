import React, { useState, useEffect } from 'react'
import Filter, { FilterSkeleton } from '../../components/Filter'
import { useQuery, gql } from '@apollo/client'
import { TagIcon } from '@heroicons/react/24/solid'

const BLOG_TAG_QUERY = gql`
  query BlogTags {
    blogTags
  }
`

type BlogTagQueryResponse = {
  blogTags: string[]
}

export type BlogTagsProps = {
  onSelectionChange: (values: string[]) => void
}

const BlogTags: React.FC<BlogTagsProps> = ({ onSelectionChange }) => {
  const { data, loading } =
    useQuery<BlogTagQueryResponse>(BLOG_TAG_QUERY)
  const [values, setValues] = useState<string[]>([])

  useEffect(() => {
    onSelectionChange(values)
  }, [values, onSelectionChange])

  if (loading && !data) {
    return <FilterSkeleton />
  }

  return (
    <Filter
      options={data!.blogTags.map((tag) => ({
        value: tag,
        label: tag,
      }))}
      multiSelect
      size='sm'
      variant='bordered'
      label='Tags'
      placeholder='Select tags to filter by'
      startContent={<TagIcon className='size-4' />}
      className='w-full'
      value={values}
      onSelectionChange={setValues}
      includeClear
    />
  )
}

export default BlogTags
