import { IBlock, IRichText } from '@ammarahmedca/types'
import { createID } from './window'

export type Heading = {
  level: 1 | 2 | 3
  plainText: string
}

/**
 * Extracts the heading objects from the blocks into simplified `Heading` objects
 *
 * @param {IBlock[]} blocks
 * @returns {Heading[]}
 */
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

/**
 * Creates a unique CSS id for the heading given all of the headings for the page
 *
 * @param {Heading} heading
 * @param {Heading[]} all
 */
export const createHeadingID = (
  heading: Heading,
  all: Heading[],
): string => {
  const idx = all.findIndex(
    (value) =>
      value.level === heading.level &&
      value.plainText === heading.plainText,
  )
  // Iterate backwards until we find the parent (anything less than the current level)
  let parent: Heading | undefined
  for (let i = idx - 1; i >= 0; i--) {
    const curr = all[i]
    if (curr.level < heading.level) {
      parent = curr
      break
    }
  }
  let id = createID(heading.plainText)
  if (parent) {
    return `${createID(parent.plainText)}_${id}`
  } else {
    return id
  }
}
