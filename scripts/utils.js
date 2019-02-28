const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function formatCount(c) {
  if (c == 0)
    return 0
  for (var pow = 0; pow < lang.numbers.length; pow++) {
    if (c / Math.pow(10, pow * 3) >= 1 && c / Math.pow(10, pow * 3) < 1000) {
      return round(c / Math.pow(10, pow * 3), 3) + lang.numbers[pow]
    }
  }
  return round(c / Math.pow(10, (lang.numbers.length - 1) * 3), 3) + lang.numbers[(lang.numbers.length - 1)]
}

function round(n, p) {
  var factor = Math.pow(10, p);
  return Math.round(n * factor) / factor;
}
