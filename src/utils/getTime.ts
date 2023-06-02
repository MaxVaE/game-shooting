export const getTime = (timestamp: number) => {
  let date: Date
  const { length } = timestamp.toString()

  if (length < 13) {
    date = new Date(timestamp * 1000)
  } else {
    date = new Date(timestamp)
  }

  const hour = date.getHours()
  const minute = date.getMinutes()

  const minuteString = minute < 10 ? `0${minute}` : minute
  const hourString = hour < 10 ? `0${hour}` : hour

  return `${hourString}:${minuteString}`
}
