import React from 'react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Button,
  Chip,
  Skeleton,
} from '@nextui-org/react'
import { IProjectMetadata } from '@ammarahmedca/types'
import { FaGithub } from 'react-icons/fa'
import {
  ArrowUpRightIcon,
  CalendarIcon,
} from '@heroicons/react/24/solid'
import { format, intlFormat } from 'date-fns'
import RichText from '../../../../components/RichText'

export type ProjectCardProps = {
  project: IProjectMetadata
}

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <Card className='p-8 w-full h-80'>
      <Skeleton className='h-2 w-1/5 mb-2 rounded-full' />
      <Skeleton className='h-4 w-2/5 mb-4 rounded-full' />
      {new Array(5).fill(0).map((_, idx) => {
        return (
          <Skeleton
            key={`proj-skel-desc-${idx}`}
            className={`h-3 ${idx < 4 ? 'w-100 mb-2' : 'w-2/5 mb-4'} rounded-full`}
          />
        )
      })}
      <Skeleton className='h-2 w-1/5 mb-2 rounded-full' />
      <div className='flex flex-wrap -m-1 mb-2'>
        {new Array(2).fill(0).map((_, idx) => {
          return (
            <Skeleton
              key={`proj-skel-lang-${idx}`}
              className='h-6 w-1/5 rounded-full m-1'
            />
          )
        })}
      </div>
      <Skeleton className='h-2 w-1/5 mb-2 rounded-full' />
      <div className='flex flex-wrap -m-1'>
        {new Array(3).fill(0).map((_, idx) => {
          return (
            <Skeleton
              key={`proj-skel-fram-${idx}`}
              className='h-6 w-1/5 rounded-full m-1'
            />
          )
        })}
      </div>
    </Card>
  )
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const start = intlFormat(
    new Date(project.dateRange.start),
    {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }
  )
  const end = project.dateRange.end
    ? intlFormat(new Date(project.dateRange.end), { month: "long", year: "numeric", timeZone: "UTC" })
    : 'Present'
  return (
    <Card key={`project-${project.id}`} className='py-8'>
      <CardHeader className='pb-0 pt-2 px-8 flex items-start justify-between'>
        <div>
          <p className='text-xs uppercase font-bold'>
            {project.type.join(' \u{2022} ')}
          </p>
          <h4 className='text-large font-bold'>{project.name}</h4>
        </div>
        <div className='flex'>
          {project.github && (
            <Button
              isIconOnly
              variant='light'
              size='md'
              as='a'
              href={project.github}
              target='_blank'
            >
              <FaGithub className='size-5' />
            </Button>
          )}
          {project.external && (
            <Button
              isIconOnly
              variant='light'
              size='md'
              as='a'
              href={project.external}
              target='_blank'
            >
              <ArrowUpRightIcon className='size-5' />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className='overflow-visible py-2 px-8 flex flex-col items-start space-y-2'>
        {/* <p className="text-default-500">
          {project.description.map(rt => rt.plainText).join("")}
        </p> */}
        <RichText
          as='p'
          className='text-default-500'
          data={project.description}
        />
        <div className='flex flex-col items-start space-y-2'>
          {project.languages.length > 0 && (
            <>
              <h5 className='text-xs uppercase font-bold'>
                Languages
              </h5>
              <div className='flex -m-1 flex-wrap'>
                {project.languages.map((lang) => {
                  return (
                    <Chip
                      key={`project-${project.id}-${lang}`}
                      color='primary'
                      variant='bordered'
                      className='m-1'
                    >
                      {lang}
                    </Chip>
                  )
                })}
              </div>
            </>
          )}
          {project.frameworks.length > 0 && (
            <>
              <h5 className='text-xs uppercase font-bold'>
                Frameworks
              </h5>
              <div className='flex -m-1 flex-wrap'>
                {project.frameworks.map((lang) => {
                  return (
                    <Chip
                      key={`project-${project.id}-${lang}`}
                      color='secondary'
                      variant='bordered'
                      className='m-1'
                    >
                      {lang}
                    </Chip>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </CardBody>
      <CardFooter className='flex flex-col items-start px-8'>
        <div className='div flex items-center text-default-500 space-x-2'>
          <CalendarIcon className='size-5' />
          <p className='text-sm '>
            {start} - {end}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
