export default function timeFormat(timestamp) {
  if (!timestamp) {
    return null
  }
  return new(Intl.DateTimeFormat('es-ES', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Europe/Madrid'
  }).format(timestamp))
}