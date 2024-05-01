import React, { useRef, useEffect, useState } from 'react'
import Signature from '../../../components/Signature'

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [sigWidth, setSigWidth] = useState(602);
  const updateSignatureWidth = () => {
    if (ref.current) {
      setSigWidth(ref.current.clientWidth);
    }
  }
  useEffect(() => {
    updateSignatureWidth();
    window.addEventListener("resize", updateSignatureWidth)

    return () => {
      window.removeEventListener("resize", updateSignatureWidth)
    }
  }, [])
  return (
    <section className='min-h-screen transition relative' ref={ref} >
      <h1 className='font-display font-extrabold text-7xl text-right pt-[15vh]'>
        Hello 👋
      </h1>
      <h2 className='font-display font-extrabold text-6xl text-right '>
        I'm{' '}
        <span className='inline-block bg-gradient-to-r from-primary-500 to-secondary-300 text-transparent bg-clip-text'>
          Ammar
        </span>
      </h2>
      <p className='text-2xl text-right text-default-500'>
        Engineering Student @{' '}
        <a
          href='https://google.ca'
          className='inline-block bg-gradient-to-r from-primary-500 to-secondary-300 text-transparent bg-clip-text hover:underline decoration-primary-500'
        >
          University of Waterloo
        </a>
      </p>
      <Signature width={sigWidth} />
    </section>
  )
}

export default Hero
