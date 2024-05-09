import React from 'react'
import { useTextGradient } from '../../hooks/styles'
import { Image } from '@nextui-org/react'
import Wedding from '../../assets/images/Wedding.jpg'

const About: React.FC = () => {
  const textGradient = useTextGradient({
    dir: 'r',
    from: 'primary-500',
    to: 'secondary-300',
  })

  return (
    <main className='relative transition min-h-screen'>
      <h1
        className={`font-display font-extrabold text-5xl ${textGradient} mt-[10vh] mb-5`}
      >
        About Me
      </h1>
      <div className='flex flex-col space-y-3 text-default-600 text-lg mb-5'>
        <p>
          I'm a second year student at the University of Waterloo
          studying Nanotechnology Engineering. As most others who hear
          about this field of engineering, you're probably very
          confused. Nanotechnology engineering is engineering from the
          bottom-up rather than the traditional top-down approach. We
          engineer devices and systems at the nano-scale such as
          computer processors, medical robotics, drug delivery systems
          etc.
        </p>
        <p>
          However, since my admission into the University of Waterloo,
          I have found an immense interest in software
          engineering/development. I have found a very particular
          interest in full-stack web and app development, due to
          which, my current and previous co-op terms have been in the
          web development field.
        </p>
        <p>
          In my current co-op placement, I am working in a frontend
          role. I aspire to work in a field where software and
          nanotechnology intersect.
        </p>
      </div>
      <h2
        className={`font-display font-extrabold text-4xl mb-5 leading-normal ${textGradient}`}
      >
        How Do I Spend My Time?
      </h2>
      <div className='flex flex-col space-y-3 text-default-600 text-lg mb-5'>
        <p>
          While it may sound extremely nerdy, what I love to do most
          in my free-time is code. As I've never been very talented in
          traditional forms of art, coding is my way of expressing
          myself. Whether that be through creating websites to help me
          with productivity or creating algorithm simulations, code
          helps me express my creativity through logic and
          mathematics.
        </p>
        <p>
          When I'm not coding you can find me watching Netflix. I tend
          to enjoy shows that have a good, thrilling storyline such as
          Breaking Bad, Ozark and Narcos. I also enjoy reality-style
          comedy shows like The Office, Parks and Recreation and
          Brooklyn Nine Nine. Aside from movies and TV shows, the rest
          of my time goes to spending time with my lovely wife, whom I
          married at the young age of 20 years old. We like to explore
          new halal restaurants around the GTA or watch movies
          together.
        </p>
      </div>
      <div className='flex flex-col items-center justify-center w-full mb-12'>
        <Image
          className='w-full md:max-w-3xl mb-2'
          src={Wedding}
          isBlurred
          isZoomed
        />
        <p className='text-default-500 text-xs'>
          My wife and I on our wedding day.
        </p>
      </div>
    </main>
  )
}

export default About
