export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key: string): any | undefined => {
  const item = localStorage.getItem(key)
  if (item && item.length > 0) {
    return JSON.parse(item)
  }
  return undefined
}
