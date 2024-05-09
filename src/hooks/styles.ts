export type GradientDirections =
  | 't'
  | 'tr'
  | 'r'
  | 'br'
  | 'b'
  | 'bl'
  | 'l'
  | 'tl'

export type UseTextGradientParams = {
  dir: GradientDirections
  from: string
  to: string
}

export const useTextGradient = ({
  dir,
  from,
  to,
}: UseTextGradientParams) => {
  return `inline-block bg-gradient-to-${dir} from-${from} to-${to} text-transparent bg-clip-text`
}
