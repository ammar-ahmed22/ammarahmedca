import React, { useRef, useEffect } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export type LatexProps<C extends React.ElementType> = {
  as?: C
  expression: string
  display?: boolean
} & React.ComponentPropsWithRef<C>

const Latex = <C extends React.ElementType>({
  as,
  expression,
  display = false,
  ...props
}: LatexProps<C>) => {
  const Component = as || 'span'
  const ref = useRef<HTMLElement>(null)
  const displayStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }

  useEffect(() => {
    if (ref && ref.current) {
      katex.render(expression, ref.current, { displayMode: display })
    }
  }, [expression])

  return (
    <Component
      ref={ref}
      style={display ? displayStyle : undefined}
      {...props}
    />
  )
}

export default Latex
