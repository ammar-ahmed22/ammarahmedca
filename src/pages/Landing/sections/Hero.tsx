import React, { useRef, useEffect, useState } from 'react'
import Signature from '../../../components/Signature'
import { useTextGradient } from '../../../hooks/styles'

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [sigWidth, setSigWidth] = useState(602)
  const updateSignatureWidth = () => {
    if (ref.current) {
      setSigWidth(ref.current.clientWidth)
    }
  }
  useEffect(() => {
    updateSignatureWidth()
    window.addEventListener('resize', updateSignatureWidth)
    window.addEventListener('load', updateSignatureWidth)

    return () => {
      window.removeEventListener('resize', updateSignatureWidth)
      window.removeEventListener('load', updateSignatureWidth)
    }
  }, [])

  const textGradient = useTextGradient({
    dir: 'r',
    from: 'primary-500',
    to: 'secondary-300',
  })
  return (
    <section
      className='min-h-screen transition relative w-full'
      ref={ref}
      id='hero'
    >
      <h1 className='font-display font-extrabold text-7xl text-right pt-[15vh]'>
        Hello 👋
      </h1>
      <h2 className='font-display font-extrabold text-6xl text-right '>
        I'm <span className={`${textGradient}`}>Ammar</span>
      </h2>
      <p className='text-2xl text-right text-default-500'>
        Engineering Student @{' '}
        <a
          href='https://google.ca'
          className={`${textGradient} hover:underline decoration-primary-500`}
        >
          University of Waterloo
        </a>
      </p>
      <Signature width={sigWidth} />
    </section>
  )
}

export default Hero
