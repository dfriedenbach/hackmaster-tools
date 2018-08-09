import * as Constants from './constants';

export function makeImmutable(obj: any) {
  if (!obj || (typeof obj !== Constants.ObjectType)) {
    return obj;
  }
  if (Array.isArray(obj)) {
    obj.forEach(makeImmutable);
  } else {
    for (const key in obj) {
      makeImmutable(obj[key]);
    }
  }
  return Object.freeze(obj);
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
