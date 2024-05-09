import React, { useState, useEffect } from 'react'
import { Input, InputProps } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export type ProjectSearchProps = {
  onQueryChange?: (q: string) => void
} & InputProps

const ProjectSearch: React.FC<ProjectSearchProps> = ({
  onQueryChange,
}) => {
  const [query, setQuery] = useState<string>('')
  useEffect(() => {
    if (onQueryChange) onQueryChange(query)
  }, [query, onQueryChange])
  return (
    <Input
      type='text'
      label='Search'
      placeholder='Search by name, language, framework or type'
      startContent={<MagnifyingGlassIcon className='size-4' />}
      value={query}
      onValueChange={setQuery}
      isClearable
    />
  )
}

export default ProjectSearch
