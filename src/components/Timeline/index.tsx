import React from 'react'

export type TimelineProps = {
  isLoading?: boolean
} & React.ComponentPropsWithoutRef<'ol'>

const Timeline: React.FC<TimelineProps> = ({
  className,
  children,
  isLoading = false,
  ...others
}) => {
  const borderColor = isLoading
    ? 'border-content3 dark:border-content2'
    : 'border-default-500'
  return (
    <ol
      className={`${className ?? ''} relative border-s ${borderColor} ms-3`}
      {...others}
    >
      {children}
    </ol>
  )
}

export default Timeline
