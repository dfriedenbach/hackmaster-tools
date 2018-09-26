import { randInt } from './util';

export enum Honor {
  Poor = -1,
  Average = 0,
  Great = 1,
}

export interface IRollOptions {
  penetration?: boolean;
  crossbow?: boolean;
  honor?: Honor,
}
const defaultOptions = Object.freeze({
  honor: Honor.Average,
});

function rollDieInternal(size: number): number {
  return randInt(1, size);
}

export function rollDie(size: number, modifier: number = 0, options: IRollOptions = defaultOptions): number {
  let result = modifier;
  let rolled = rollDieInternal(size);
  result += rolled + (options.honor || Honor.Average);
  if (options.penetration && size > 2) {
    while (rolled === size || options.crossbow && rolled === size - 1) {
      rolled = rollDieInternal(size);
      result += rolled - 1 + (options.honor || Honor.Average);
    }
  }
  return result;
}

const diceRegex = /(\d*)d(\d+)([+-]\d+)?/i;

export function roll(input: string, options: IRollOptions = defaultOptions): number{
  const match = diceRegex.exec(input);
  if (!match) {
    return NaN;
  }
  const die = parseInt(match[2], 10);
  const quantity = match[1] ? parseInt(match[1], 10) : 1;
  const modifier = match[3] ? parseInt(match[3], 10) : 0;

  let result = 0;
  for (let i = 0; i < quantity; i++) {
    result += rollDie(die, 0, options);
  }
  return result + modifier;
}

