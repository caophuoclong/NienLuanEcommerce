export const parseUrl = (name?: string) => {
  try {
    if (!name) {
      return "https://picsum.photos/400"
    }
    const { protocol } = new URL(name)
    if (protocol === "blob:" || protocol === "http:" || protocol === "https:")
      return name
  } catch (error) {
    return `${process.env.REACT_APP_SERVER_URL}/images/${name}`
  }
}
