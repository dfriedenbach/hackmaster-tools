import * as Constants from './constants';

export function makeImmutable(obj: any) {
  if (!obj || (typeof obj !== Constants.ObjectType)) {
    return obj;
  }
  if (Array.isArray(obj)) {
    obj.forEach(makeImmutable);
  } else {
    for (const key of Object.keys(obj)) {
      makeImmutable(obj[key]);
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
