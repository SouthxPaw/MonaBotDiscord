function formatDate (date) {
  return new Intl.DateTimeFormat('en-US').format(date)
}

module.exports = formatDate
