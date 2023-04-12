export const parseUrl = (name) => {
  try {
    if (!name) {
      return "https://picsum.photos/400"
    }
    const { protocol } = new URL(name)
    if (protocol === "blob:" || protocol === "http:" || protocol === "https:")
      return name
  } catch (error) {
    return `${process.env.REACT_APP_BASE_URL}/images/${name}`
  }
}
