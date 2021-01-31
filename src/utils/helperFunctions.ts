const groupBy = function(array: any[], key: string | number) {
  return array.reduce(function(prev, curr) {
    ;(prev[curr[key]] = prev[curr[key]] || []).push(curr)
    return prev
  }, {})
}

export { groupBy }
