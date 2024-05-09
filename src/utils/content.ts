import { IBlock, IRichText } from '@ammarahmedca/types'

export type Heading = {
  level: 1 | 2 | 3
  plainText: string
}

export const extractHeadings = (blocks: IBlock[]): Heading[] => {
  const headings: Heading[] = []
  for (let block of blocks) {
    const { type, content } = block
    switch (type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        const parts = type.split('_')
        const level = parseInt(parts[1]) as 1 | 2 | 3
        const richText = content as IRichText[]
        headings.push({
          level,
          plainText: richText.map((rt) => rt.plainText).join(''),
        })
        break
      default:
        break
    }
  }
  return headings
}
