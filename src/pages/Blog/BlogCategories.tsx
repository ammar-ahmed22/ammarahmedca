import React, { useState, useEffect } from 'react'
import Filter, { FilterSkeleton } from '../../components/Filter'
import { useQuery, gql } from '@apollo/client'
import { FolderIcon } from '@heroicons/react/24/solid'

const BLOG_CATEGORY_QUERY = gql`
  query BlogCategories {
    blogCategories
  }
`

type BlogCategoryQueryResponse = {
  blogCategories: string[]
}

export type BlogCategoriesProps = {
  onSelectionChange: (value?: string) => void
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  onSelectionChange,
}) => {
  const { data, loading } = useQuery<BlogCategoryQueryResponse>(
    BLOG_CATEGORY_QUERY,
  )
  const [value, setValue] = useState<string | undefined>()

  useEffect(() => {
    onSelectionChange(value)
  }, [value, onSelectionChange])

  if (loading && !data) {
    return <FilterSkeleton />
  }

  return (
    <Filter
      options={data!.blogCategories.map((cat) => ({
        value: cat,
        label: cat,
      }))}
      size='sm'
      variant='bordered'
      label='Categories'
      placeholder='Select categories to filter by'
      startContent={<FolderIcon className='size-4' />}
      className='w-full'
      value={value}
      onSelectionChange={(values: string[]) => {
        if (values.length === 0) {
          setValue(undefined)
        } else {
          setValue(values[0])
        }
      }}
      includeClear
    />
  )
}

export default BlogCategories
