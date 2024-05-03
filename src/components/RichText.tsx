import React, { useMemo } from 'react'
import type { IRichText } from '@ammarahmedca/types'
import { createRichTextChildren } from '../hooks/richtext'
import MathJax from 'react-mathjax'

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
  return (
    <Component {...props}>
      <MathJax.Provider>{children}</MathJax.Provider>
    </Component>
  )
}

export default RichText
