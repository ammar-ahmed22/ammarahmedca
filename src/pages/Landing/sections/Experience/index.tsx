import React, { useEffect, useState } from 'react'
import { useTextGradient } from '../../../../hooks/styles'
import {
  EXPERIENCE_QUERY,
  ExperienceQuery,
} from '../../../../graphql/queries/Experience'
import { useQuery } from '@apollo/client'
import { usePaginatedArray } from '../../../../hooks/paginated'
import Timeline from '../../../../components/Timeline'
import TimelineItem, {
  TimelineItemSkeleton,
} from '../../../../components/Timeline/TimelineItem'
import {
  CalendarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid'
import { intlFormat } from 'date-fns'
import RichText from '../../../../components/RichText'
import { Button, Chip } from '@nextui-org/react'

const Experience: React.FC = () => {
  // Styling
  const gradient = useTextGradient({
    dir: 'r',
    from: 'primary-500',
    to: 'secondary-300',
  })

  // State
  const [experiences, setExperiences] = useState<
    ExperienceQuery.Response['experiences']
  >([])

  // Queries
  const { data, loading, error } =
    useQuery<ExperienceQuery.Response>(EXPERIENCE_QUERY)

  // Hooks
  const [paginatedExperiences, { increase, reset, hasMore }] =
    usePaginatedArray(experiences)

  useEffect(() => {
    if (!loading && data) {
      setExperiences(data.experiences)
    }
  }, [data, loading, error])

  return (
    <section className='transition relative my-8' id='experience'>
      <h2
        className={`${gradient} font-display text-6xl font-bold leading-normal mb-2`}
      >
        Experience
      </h2>
      <Timeline isLoading>
        {loading &&
          !data &&
          new Array(4).fill(0).map((_, idx) => {
            return <TimelineItemSkeleton key={`exp-skel-${idx}`} />
          })}
        {data &&
          paginatedExperiences.map((experience) => {
            const start = intlFormat(
              new Date(experience.timeframe.start),
              { month: 'long', year: 'numeric', timeZone: 'UTC' },
            )
            const end = experience.timeframe.end
              ? intlFormat(new Date(experience.timeframe.end), {
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'UTC',
                })
              : 'Present'
            return (
              <TimelineItem
                bulletContent={<CalendarIcon className='size-4' />}
              >
                <p className='text-default-500 pt-1 mb-2'>
                  {start} - {end}
                </p>
                <h3 className='font-display font-bold text-2xl'>
                  {experience.company}
                </h3>
                <h5 className='text-lg mb-2'>{experience.role}</h5>
                <Chip
                  className='mb-2'
                  variant='dot'
                  size='sm'
                  radius='sm'
                  color='primary'
                >
                  {experience.type}
                </Chip>
                <RichText
                  data={experience.description}
                  className='text-default-500 text-lg mb-3'
                />
                <p className='text-xs font-bold uppercase'>
                  {experience.skills.join(' \u{2022} ')}
                </p>
              </TimelineItem>
            )
          })}
      </Timeline>
      <div className='flex justify-center mt-4'>
        {data && (
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

export default Experience
