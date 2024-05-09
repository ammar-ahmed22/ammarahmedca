import React, { useEffect, useState, useMemo } from 'react'
import { useTextGradient } from '../../../../hooks/styles'
import { useLazyQuery, useQuery } from '@apollo/client'
import { IProjectMetadata } from '@ammarahmedca/types'
import {
  PROJECT_METADATA_QUERY,
  ProjectMetadataQuery,
} from '../../../../graphql/queries/Metadata'
import {
  PROJECT_FILTER_OPTIONS_QUERY,
  ProjectFilterOptionsQuery,
} from '../../../../graphql/queries/FilterOpts'
import { Button, SelectProps } from '@nextui-org/react'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid'
import {
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { usePaginatedArray } from '../../../../hooks/paginated'
import Filter, { FilterSkeleton } from '../../../../components/Filter'
import ProjectCard, { ProjectCardSkeleton } from './ProjectCard'
import ProjectSearch from './ProjectSearch'

const Projects: React.FC = () => {
  // Styling
  const gradient = useTextGradient({
    dir: 'r',
    from: 'primary-500',
    to: 'secondary-300',
  })

  // State
  const [projects, setProjects] = useState<IProjectMetadata[]>([])
  const [languageFilters, setLanguageFilters] = useState<string[]>([])
  const [frameworkFilters, setFrameworkFilters] = useState<string[]>(
    [],
  )
  const [typeFilters, setTypeFilters] = useState<string[]>([])
  const [searching, setSearching] = useState(false)

  // Queries
  const [getProjectMetadata, { data, loading, error }] = useLazyQuery<
    ProjectMetadataQuery.Response,
    ProjectMetadataQuery.Variables
  >(PROJECT_METADATA_QUERY)
  const filterOptsResp = useQuery<ProjectFilterOptionsQuery.Response>(
    PROJECT_FILTER_OPTIONS_QUERY,
  )

  // Hooks
  const [paginatedProjects, { increase, hasMore, reset }] =
    usePaginatedArray(projects)

  const hasFilters = useMemo(() => {
    return (
      languageFilters.length > 0 ||
      frameworkFilters.length > 0 ||
      typeFilters.length > 0
    )
  }, [languageFilters, frameworkFilters, typeFilters])

  type ProjectFilterOptKey = keyof ProjectFilterOptionsQuery.Response
  type FilterMap = {
    key: ProjectFilterOptKey
    label: string
    placeholder: string
    setFilterValues: SetState<string[]>
    color?: SelectProps['color']
    icon?: React.ReactNode
  }
  const filterMaps: FilterMap[] = [
    {
      key: 'projectLanguages',
      label: 'Language',
      placeholder: 'Select languages to filter by',
      setFilterValues: setLanguageFilters,
      color: 'primary',
      icon: <CodeBracketIcon className='size-4' />,
    },
    {
      key: 'projectFrameworks',
      label: 'Framework',
      placeholder: 'Select frameworks to filter by',
      setFilterValues: setFrameworkFilters,
      color: 'secondary',
      icon: <WrenchScrewdriverIcon className='size-4' />,
    },
    {
      key: 'projectTypes',
      label: 'Type',
      placeholder: 'Select types to filter by',
      setFilterValues: setTypeFilters,
      color: 'default',
      icon: <TagIcon className='size-4' />,
    },
  ]

  useEffect(() => {
    getProjectMetadata({
      variables: {
        onlyPublished: true,
        languages: languageFilters,
        type: typeFilters,
        frameworks: frameworkFilters,
      },
    })
  }, [
    getProjectMetadata,
    languageFilters,
    typeFilters,
    frameworkFilters,
  ])

  useEffect(() => {
    if (!loading && data) {
      setProjects(data.projectMetadata)
    }
  }, [data, loading, error])

  return (
    <section className='transition relative my-8' id='projects'>
      <h2
        className={`${gradient} font-display text-6xl font-bold leading-normal mb-2`}
      >
        Projects
      </h2>
      <div className='mb-4'>
        <ProjectSearch
          onQueryChange={(query: string) => {
            if (query !== '' && data?.projectMetadata) {
              setSearching(true)
              setProjects(() => {
                const allProjects = data.projectMetadata
                const queryRegex = new RegExp(
                  query.toLowerCase(),
                  'g',
                )
                return allProjects.filter((project) => {
                  let match = false
                  // Check query against name
                  if (queryRegex.test(project.name.toLowerCase()))
                    match = true

                  // Check query against every language
                  project.languages?.forEach((lang) => {
                    if (queryRegex.test(lang.toLowerCase()))
                      match = true
                  })

                  // Check query against every framework
                  project.frameworks?.forEach((framework) => {
                    if (queryRegex.test(framework.toLowerCase()))
                      match = true
                  })

                  // Check query against every type
                  project.type.forEach((type) => {
                    if (queryRegex.test(type.toLowerCase()))
                      match = true
                  })

                  return match
                })
              })
            } else {
              setSearching(false)
            }
          }}
        />
      </div>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mb-4'>
        {filterOptsResp.loading &&
          new Array(3).fill(0).map((_, idx) => {
            return <FilterSkeleton key={`filter-skel-${idx}`} />
          })}
        {filterOptsResp.data && !searching && (
          <>
            {filterMaps.map((map) => {
              return (
                <Filter
                  options={filterOptsResp.data![map.key].map((o) => ({
                    label: o,
                    value: o,
                  }))}
                  multiSelect
                  includeClear
                  size='sm'
                  color={map.color ?? 'default'}
                  variant='bordered'
                  label={map.label}
                  placeholder={map.placeholder}
                  startContent={map.icon}
                  onSelectionChange={(values) =>
                    map.setFilterValues(values)
                  }
                />
              )
            })}
          </>
        )}
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
        {loading &&
          new Array(4).fill(0).map((_, idx) => {
            return <ProjectCardSkeleton key={`proj-skel-${idx}`} />
          })}
        {projects.length > 0 &&
          (hasFilters || searching
            ? projects
            : paginatedProjects
          ).map((project) => {
            return (
              <ProjectCard
                key={`project-${project.id}`}
                project={project}
              />
            )
          })}
      </div>
      <div className='flex justify-center mt-4'>
        {!hasFilters && !searching && (
          <Button
            variant='light'
            startContent={
              hasMore ? (
                <ArrowDownIcon className='size-4' />
              ) : (
                <ArrowUpIcon className='size-4' />
              )
            }
            onPress={() => {
              if (hasMore) {
                increase()
              } else {
                reset()
              }
            }}
          >
            Show {hasMore ? 'More' : 'Less'}
          </Button>
        )}
      </div>
    </section>
  )
}

export default Projects
