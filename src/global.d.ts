import React from 'react'

declare global {
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>
}

export {}
