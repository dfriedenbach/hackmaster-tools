import * as Constants from 'shared/constants';

interface INumericEnum {
    [index: number]: string
}

export function deepFreeze(obj: any) {
  if (!obj || (typeof obj !== Constants.ObjectType) || Object.isFrozen(obj)) {
    return obj;
  }
  if (Array.isArray(obj)) {
    obj.forEach(deepFreeze);
  } else {
    for (const prop of Object.getOwnPropertyNames(obj)) {
      deepFreeze(obj[prop]);
    }
  }
  return Object.freeze(obj);
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function limitToRange(num: number, min: number, max: number): number {
  return Math.max(Math.min(num, max), min);
}

export function simpleCurrencyString(amount: number): string {
  if (Math.abs(amount) >= 1) {
    return amount.toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'gp';
  }
  if (Math.abs(amount) >= 0.1) {
    return (amount * 10).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'sp';
  }
  return (amount * 100).toLocaleString('en-US', { maximumFractionDigits: 0 }) + 'cp';
}

export function getNumericEnumNames(table: INumericEnum): string[] {
  return Object.keys(table).filter(k => typeof table[k] === Constants.StringType).map(k => table[k])
}

export function tableLookup(table: INumericEnum, thresholds: ReadonlyArray<number>, roll: number): number {
  const enumNames = getNumericEnumNames(table);
  if (enumNames.length !== thresholds.length + 1) {
    throw new Error('table length mismatch');
  }
  let i = 0;
  for (const threshold of thresholds) {
    if (roll < threshold) {
      break;
    }
    i++;
  }
  // for 0-indexed enums we could just return i, but this method works with arbitrary numeric enum values
  return table[enumNames[i]];
}
