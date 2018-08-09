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
  name: string;
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

const gemNames: string[][] = Util.makeImmutable([
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
  const name = getName(category);
  const size = getSize(rollDie(100));
  const quality = getQuality(rollDie(100));

  return { category, name, size, quality }
}
