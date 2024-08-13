export default function capitalize(string) {
  if (typeof string !== 'string') {
    throw new TypeError('El argumento debe ser una string')
  }

  if (string.length === 0) {
    return ''
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
