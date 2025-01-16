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
          I’m a second-year student at the University of Waterloo,
          proudly studying Nanotechnology Engineering—a field that
          often leaves people nodding politely while secretly Googling
          “What even is nanotechnology?” To break it down, it’s all
          about engineering from the bottom up, working at the
          nano-scale to create cool things like computer processors,
          medical robotics, and drug delivery systems. It’s as
          science-y as it sounds.
        </p>
        <p>
          That said, while I find nanotechnology fascinating
          academically (yes, I was the kid who watched science videos
          instead of cartoons), I’ve come to realize my professional
          heart belongs to software engineering. There’s just
          something about the instant feedback of a perfectly aligned
          div or a slick new app feature that gets me more excited
          than, say, tweaking a quantum dot.
        </p>
      </div>
      <h2
        className={`font-display font-extrabold text-4xl mb-5 leading-normal ${textGradient}`}
      >
        How Do I Spend My Time?
      </h2>
      <div className='flex flex-col space-y-3 text-default-600 text-lg mb-5'>
        <p>
          In my downtime, I do what any reasonable nerd would do:
          code. For me, coding is less about zeros and ones and more
          about a creative outlet (think of it as art but with a
          semicolon). Whether it’s building a new productivity tool or
          simulating algorithms, I love using logic and math to make
          cool stuff happen.
        </p>
        <p>
          When I’m not deep in a coding rabbit hole, you might find me
          hanging out with friends, playing sports, or just seeing who
          can come up with the stupidest takes (spoiler: it’s usually
          me). My wife and I also enjoy exploring new halal
          restaurants around the GTA—because who doesn’t love good
          food and better company?
        </p>
      </div>
      <h2
        className={`font-display font-extrabold text-4xl mb-5 leading-normal ${textGradient}`}
      >
        On Fatherhood
      </h2>
      <div className='flex flex-col space-y-3 text-default-600 text-lg mb-8'>
        <p>
          Recently, my life took a profound, chaotic, and absolutely
          beautiful turn: I became a dad in September 2024. Fatherhood
          has been equal parts overwhelming and magical. From 2 a.m.
          diaper duty to the first tiny smile, it’s a wild ride I
          wouldn’t trade for anything. If coding is my way of creating
          order, parenting is the ultimate lesson in embracing the
          chaos—and somehow, it’s the most rewarding challenge yet.
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
