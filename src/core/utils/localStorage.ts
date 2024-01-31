export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value)
}

export const getFromLocalStorage = (key: string): any | undefined => {
  const item = JSON.stringify(localStorage.getItem(key))
  if (item && item.length > 0) {
    return JSON.parse(item)
  }
  return undefined
}

export const getUsernameFromLocalStorage = () => {
  const username = JSON.parse(JSON.stringify(localStorage.getItem('username')))
  if (username) return username
  return ''
}
