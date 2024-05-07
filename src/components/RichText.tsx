import React, { useMemo } from 'react'
import type { IRichText } from '@ammarahmedca/types'
import { createRichTextChildren } from '../utils/richtext'

export type RichTextProps<C extends React.ElementType> = {
  as?: C
  data: IRichText[]
} & React.ComponentPropsWithoutRef<C>

const RichText = <C extends React.ElementType>({
  as,
  data,
  ...props
}: RichTextProps<C>) => {
  const Component = as || 'p'
  const children: React.ReactNode[] = useMemo(() => {
    return createRichTextChildren(data)
  }, [data])
  return <Component {...props}>{children}</Component>
}

export default RichText
