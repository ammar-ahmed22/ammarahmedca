import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export type ErrorProps = {
  code?: number
  message?: string
}

const Error: React.FC<ErrorProps> = ({ code, message }) => {
  return (
    <div className='flex flex-col min-h-[70vh] justify-center items-center'>
      <ExclamationCircleIcon className='size-12 text-red-500' />
      <h2 className='font-display font-bold text-5xl text-center'>
        Error{code && `: ${code}`}
      </h2>
      {message && <p className='text-2xl text-center'>{message}</p>}
    </div>
  )
}

export default Error
