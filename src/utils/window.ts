export const createID = (str: string) => {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .filter((s) => !!s)
    .join('-')
    .toLowerCase()
}

/**
 * Calculates the distance from the top of the element to the top of the viewport
 * @note This value will change based on scroll position.
 * @param element
 */
export const viewportDistance = (element: HTMLElement) => {
  return element.getBoundingClientRect().top
}

/**
 * Calculates the distance from the top of the element to the top of the page
 * @note This value does **NOT** change based on scroll position.
 * @param element
 */
export const pageDistance = (element: HTMLElement) => {
  return viewportDistance(element) + window.scrollY
}

export const scrollToElement = (
  selector: string,
  offset: number = 0,
) => {
  const el = document.querySelector(selector) as HTMLElement | null
  if (!el) return
  const offsetPos = pageDistance(el) - offset
  window.scrollTo({
    top: offsetPos,
    behavior: 'smooth',
  })
}
