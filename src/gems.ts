import { rollDie } from './dice';
import * as Util from './util';

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
export const sizeDescriptions = Object.freeze(
  ['tiny', 'very small', 'small', 'average size', 'large', 'very large', 'huge', 'massive', 'gargantuan']
);

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
export const qualityDescriptions = Object.freeze(
  ['badly flawed', 'flawed', 'minor inclusions', 'average quality', 'good quality', 'excellent quality', 'near-perfect', 'perfect', 'flawless']
);

export interface IGem {
  category: GemCategory;
  name: string;
  size: GemSize;
  quality: GemQuality;
  hasShine: boolean;
  value: number;
}

const categoryThresholds = Object.freeze([26, 51, 71, 91, 100]);
const sizeThresholds = Object.freeze([6, 26, 46, 66, 86, 91, 97, 100]);
const qualityThresholds = sizeThresholds;
const baseValueLookup = Object.freeze([0, 0.1, 0.5, 1, 1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000]);

const gemNames: string[][] = Util.deepFreeze([
  ['Azurite', 'Banded Agate', 'Blue Quartz', 'Eye Agate', 'Hematite', 'Lapis Lazuli', 'Malachite', 'Moss Agate', 'Obsidian', 'Rhodochrosite', 'Tiger Eye', 'Turquoise'],
  ['Bloodstone', 'Carnelian', 'Chalcedony', 'Chrysoprose', 'Citrine', 'Jasper', 'Moonstone', 'Onyx', 'Rock Crystal', 'Sardonyx', 'Smoky Quartz', 'Star Rose Quartz'],
  ['Amber', 'Alexandrite', 'Amethyst', 'Chrysoberyl', 'Coral', 'Garnet (red/brown/green)', 'Jade', 'Jet', 'Pearl', 'Spinel (red/brown/green)', 'Tourmaline', 'Zircon'],
  ['Aquamarine', 'Garnet', 'Pearl (black)', 'Peridot', 'Spinel (deep blue)', 'Topaz'],
  ['Black Opal', 'Emerald', 'Fire Opal', 'Garnet (purple star)', 'Opal', 'Oriental Amethyst', 'Oriental Topaz', 'Sapphire', 'Star Ruby', 'Star Sapphire'],
  ['Black Sapphire', 'Diamond', 'Jacinth', 'Oriental Emerald', 'Ruby', 'Gut Stone'],
]);

function getName(category: GemCategory): string {
  const names = gemNames[category]
  if (!names) {
    return 'Error: Invalid Gem Category';
  }
  return names[rollDie(names.length) - 1] || 'Error: Bad Name Index';
}

function getBaseValue(category: GemCategory, size: GemSize, quality: GemQuality): number {
  let index = category + size + quality - 1;
  index = Util.limitToRange(index, 0, baseValueLookup.length - 1);
  return baseValueLookup[index];
}

export function randomGem(): IGem {
  const category = Util.tableLookup(GemCategory, categoryThresholds, rollDie(100));
  const name = getName(category);
  const size = Util.tableLookup(GemSize, sizeThresholds, rollDie(100));
  const quality = Util.tableLookup(GemQuality, qualityThresholds, rollDie(100));
  const value = getBaseValue(category, size, quality);

  return { category, name, size, quality, hasShine: false, value }
}

