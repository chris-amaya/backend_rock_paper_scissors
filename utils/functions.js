function mod(a, b) {
  const c = a % b
  return c < 0 ? c + b : c
}

function compare(choice1, choice2, option = 'default') {
  if (!choice1 || !choice2) {
    throw new Error('No values given')
  }

  const choices =
    option === 'default'
      ? ['rock', 'paper', 'scissors']
      : ['rock', 'spock', 'paper', 'lizard', 'scissors']

  const x = choices.indexOf(choice1)
  const y = choices.indexOf(choice2)
  if (x === y) {
    return 'TIE'
  }
  if (mod(x - y, choices.length) < choices.length / 2) {
    return 'PLAYER_1'
  } else {
    return 'PLAYER_2'
  }
}

module.exports = {
  compare,
}
