export default function dateFormat(date) {
  const mn = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const d = new Date(date)
  let month = mn[d.getMonth()] 
  let day = d.getDate()
  let year = d.getFullYear()
  let hour = d.getHours().toString().padStart(2, '0')
  let minutes = d.getMinutes().toString().padStart(2, '0')
  if ( month.length < 2 ) month = `0${month}`
  if ( day.length < 2 ) day = `0${day}`
  return `${day} ${month}, ${year} - ${hour}:${minutes}`
}
