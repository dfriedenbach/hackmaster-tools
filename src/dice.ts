
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rollDie(size: number, modifier: number = 0): number {
  return randInt(1, size) + modifier;
}

const diceRegex = /(\d*)d(\d+)([+-]\d+)?/i;

export function roll(input: string): number | undefined {
  const match = diceRegex.exec(input);
  if (!match) {
    return;
  }
  const die = parseInt(match[2], 10);
  const quantity = match[1] ? parseInt(match[1], 10) : 1;
  const modifier = match[3] ? parseInt(match[3], 10) : 0;

  let result = 0;
  for (let i = 0; i < quantity; i++) {
    result += rollDie(die);
  }
  return result + modifier;
}

