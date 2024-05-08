import React, { useState, useEffect } from 'react'
import { Skeleton, SkeletonProps } from '@nextui-org/react'
import { randomInteger } from '../utils/math'

export type TextSkeletonProps = {
  /**
   * Number of text lines to render. Last line will be shortened
   */
  noOfLines?: number
  /**
   * Tailwind class for the height
   */
  height: string
  /**
   * Tailwind class for flex-col spacing
   */
  spacing?: string
  randomLines?: boolean
  min?: number
  max?: number
  width?: string
} & SkeletonProps

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  noOfLines,
  height,
  spacing,
  randomLines = false,
  min = 1,
  max,
  width,
  ...props
}) => {
  const [renderLines, setRenderLines] = useState(1)

  useEffect(() => {
    if (noOfLines) {
      if (noOfLines < 1)
        throw new Error(
          `prop 'noOfLines' must be greater than or equal to 1`,
        )
      setRenderLines(noOfLines)
    } else if (randomLines) {
      if (!max)
        throw new Error(
          `prop 'max' must be passed when using prop 'randomLines'`,
        )
      if (min >= max)
        throw new Error(`prop 'min' must be less than max`)
      if (min < 1) throw new Error(`prop 'min' must be at least 1`)
      setRenderLines(randomInteger(min, max))
    }
  }, [noOfLines, randomLines, max, min])

  if (renderLines === 1) {
    return (
      <Skeleton
        className={`${height} ${width ?? 'w-full'} rounded-full`}
        {...props}
      />
    )
  } else {
    return (
      <div className={`flex flex-col ${spacing ?? 'space-y-3'}`}>
        {new Array(renderLines).fill(0).map((_, idx) => {
          return (
            <Skeleton
              key={`text-skel-${idx}`}
              className={`${height} ${idx < renderLines - 1 ? width ?? 'w-full' : 'w-4/5'} rounded-full`}
              {...props}
            />
          )
        })}
      </div>
    )
  }
}

export default TextSkeleton
