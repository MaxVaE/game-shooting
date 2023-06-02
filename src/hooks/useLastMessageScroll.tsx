interface Args {
  elementSelector: string
  padding?: number
  scrollBySelector?: string
}

export const useLastMessageScroll = ({ elementSelector, padding = 0, scrollBySelector }: Args) => () => {
  const elements = document.querySelectorAll(elementSelector)

  if (!elements.length) {
    return
  }

  elements[elements.length - 1].scrollIntoView(false)

  if (!scrollBySelector) {
    return
  }

  document.querySelector(scrollBySelector)?.scrollBy(0, padding)
}
