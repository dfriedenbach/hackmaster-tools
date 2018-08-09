import { rollDie } from './dice';

export enum GemCategory {
  Ornamental,
  Semiprecious,
  Fancy,
  Precious,
  Gems,
  Jewels,
}

export enum GemSize {
  Tiny,
  VerySmall,
  Small,
  Average,
  Large,
  VeryLarge,
  Huge,
  Massive,
  Gargantuan,
}

export enum GemQuality {
  BadlyFlawed,
  Flawed,
  MinorInclusions,
  Average,
  Good,
  Excellent,
  NearPerfect,
  Perfect,
  Flawless,
}

export interface IGem {
  category: GemCategory;
  size: GemSize;
  quality: GemQuality;
}

const categoryThresholds = Object.freeze([26, 51, 71, 91, 100]);

function getCategory(roll: number): GemCategory {
  for (let i = 0; i < categoryThresholds.length; i++) {
    if (roll < categoryThresholds[i]) {
      return i as GemCategory;
    }
  }
  return GemCategory.Jewels;
}

const sizeThresholds = Object.freeze([6, 26, 46, 66, 86, 91, 97, 100]);

function getSize(roll: number): GemSize {
  for (let i = 0; i < sizeThresholds.length; i++) {
    if (roll < sizeThresholds[i]) {
      return i as GemSize;
    }
  }
  return GemSize.Gargantuan;
}

const qualityThresholds = sizeThresholds;

function getQuality(roll: number): GemQuality {
  for (let i = 0; i < qualityThresholds.length; i++) {
    if (roll < qualityThresholds[i]) {
      return i as GemQuality;
    }
  }
  return GemQuality.Flawless;
}

export function randomGem(): IGem {
  const category = getCategory(rollDie(100));
  const size = getSize(rollDie(100));
  const quality = getQuality(rollDie(100));

  return { category, size, quality }
}

