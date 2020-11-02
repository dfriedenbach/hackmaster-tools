import { roll, rollDie } from "game/dice";
import * as Util from "shared/util";

export enum Type {
  Paper,
  Fabric,
  Furnishing,
  Painting,
  ScrimWood,
  Ceramics,
  Glass,
  Stone,
  Metal,
  Magic,
}
export const typeDescriptions = Object.freeze([
  "paper art",
  "fabric art",
  "furnishing",
  "painting",
  "scrimshaw or woodwork",
  "ceramics",
  "glasswork",
  "stonework",
  "metalwork",
  "magical",
]);

export enum Renown {
  Unknown,
  Obscure,
  City,
  Region,
  Nation,
  Continent,
  World,
  Movement,
}
export const renownDescriptions = Object.freeze([
  "unknown artist",
  "obscure artist",
  "city renowned artist",
  "regionally renowned artist",
  "nationally renowned artist",
  "continentally renowned artist",
  "world famous artist",
  "movement leader",
]);

export enum Size {
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
export const sizeDescriptions = Object.freeze([
  "tiny",
  "very small",
  "small",
  "average size",
  "large",
  "very large",
  "huge",
  "massive",
  "gargantuan",
]);

export enum MaterialQuality {
  Awful,
  Poor,
  BelowAverage,
  Average,
  AboveAverage,
  Good,
  Excellent,
  Finest,
  Unique,
}
export const materialDescriptions = Object.freeze([
  "awful materials",
  "poor materials",
  "below average materials",
  "average materials",
  "above average materials",
  "good materials",
  "excellent materials",
  "finest materials",
  "unique materials",
]);

export enum WorkQuality {
  Awful,
  Poor,
  BelowAverage,
  Average,
  AboveAverage,
  Good,
  Excellent,
  Brilliant,
  Masterpiece,
}
export const workDescriptions = Object.freeze([
  "awfully executed",
  "poorly executed",
  "below average execution",
  "average execution",
  "above average execution",
  "good execution",
  "excellent execution",
  "brilliant execution",
  "masterpiece",
]);

export enum AgeRange {
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
}

export enum Condition {
  BadlyDamaged,
  Damaged,
  Worn,
  Average,
  Good,
  Excellent,
  NearPerfect,
  Perfect,
  Flawless,
}
export const conditionDescriptions = Object.freeze([
  "badly damaged",
  "damaged",
  "worn",
  "average condition",
  "good condition",
  "excellent condition",
  "near-perfect condition",
  "perfect condition",
  "flawless condition",
]);

export enum Subject {
  Abstract,
  Monster,
  HumanOrDemi,
  Natural,
  Historical,
  Religious,
  WealthyOrNoble,
  Royalty,
}
export const subjectDescriptions = Object.freeze([
  "abstract",
  "monster",
  "human or demi-human",
  "natural",
  "historical",
  "religious",
  "wealthy/noble",
  "royalty",
]);

export interface IArt {
  type: Type;
  renown: Renown;
  size: Size;
  materialQuality: MaterialQuality;
  workQuality: WorkQuality;
  age: number;
  condition: Condition;
  subject: Subject;
  value: number;
}

const typeThresholds = Object.freeze([6, 16, 31, 46, 61, 71, 81, 91, 100]);
const renownThresholds = Object.freeze([16, 31, 46, 66, 86, 96, 100]);
const sizeThresholds = Object.freeze([6, 26, 46, 66, 86, 91, 97, 100]);
const qualityThresholds = sizeThresholds;
const ageThresholds = Object.freeze([26, 76, 151, 301, 601, 1501, 3001]);
const conditionThresholds = sizeThresholds;
const subjectThresholds = Object.freeze([11, 21, 31, 51, 71, 91, 100]);

const conditionModifiersByType = Object.freeze([
  -2,
  -2,
  -1,
  -1,
  -1,
  0,
  0,
  1,
  2,
  3,
]);
const ageRangeModifiersByType = Object.freeze([
  -2,
  -2,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  0,
]);
const subjectValueModifiers = Object.freeze([-2, -1, 0, 0, 0, 0, 1, 2]);

const valueLookup = Object.freeze([
  1,
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  85,
  100,
  125,
  150,
  200,
  250,
  325,
  400,
  500,
  650,
  800,
  1000,
  1250,
  1500,
  2000,
  2500,
  3000,
  4000,
  5000,
  6000,
  7500,
  10000,
  12500,
  15000,
  20000,
  25000,
  30000,
  40000,
  50000,
  60000,
  70000,
  85000,
  100000,
  125000,
  150000,
  200000,
  250000,
  300000,
  400000,
  500000,
  650000,
  800000,
  1000000,
]);

function getQuality(renown: Renown) {
  const baseMaterial = Util.tableLookup(
    MaterialQuality,
    qualityThresholds,
    rollDie(100)
  );
  const baseWork = Util.tableLookup(
    WorkQuality,
    qualityThresholds,
    rollDie(100)
  );
  const materialQuality = Util.limitToRange(
    baseMaterial + renown - 3,
    MaterialQuality.Awful,
    MaterialQuality.Unique
  );
  const workQuality = Util.limitToRange(
    baseWork + renown - 3,
    WorkQuality.Awful,
    WorkQuality.Masterpiece
  );
  return { materialQuality, workQuality };
}

function getAge(type: Type): number {
  const baseAge =
    roll("5d4", { penetration: true }) * rollDie(20, 0, { penetration: true });
  const modifier = ageRangeModifiersByType[type];
  const baseRange = Util.tableLookup(AgeRange, ageThresholds, baseAge);
  if (!modifier || baseRange === AgeRange.Zero) {
    return baseAge;
  }
  // the rules are fuzzy on how this is supposed to work so I'm just generating a random number with an even distribution in the new range
  // also note that age range modifiers cannot be positive, which conveniently excludes the only non-finite range (3001+)
  const modifiedRange = Math.max(baseRange + modifier, AgeRange.Zero);
  const max = ageThresholds[modifiedRange] - 1;
  const min =
    modifiedRange === AgeRange.Zero ? 5 : ageThresholds[modifiedRange - 1];
  return Util.randInt(min, max);
}

function getCondition(type: Type): Condition {
  const baseCondition = Util.tableLookup(
    Condition,
    conditionThresholds,
    rollDie(100)
  );
  const modifier = conditionModifiersByType[type];
  return Util.limitToRange(
    baseCondition + modifier,
    Condition.BadlyDamaged,
    Condition.Flawless
  );
}

function getValue(
  r: Renown,
  sz: Size,
  m: MaterialQuality,
  w: WorkQuality,
  age: number,
  c: Condition,
  subject: Subject
): number {
  const a = Util.tableLookup(AgeRange, ageThresholds, age);
  const sb = subjectValueModifiers[subject];
  let index = r + sz + m + w + a + c + sb + 2;
  index = Util.limitToRange(index, 0, valueLookup.length - 1);
  return valueLookup[index];
}

export function randomArt(): IArt {
  const type: Type = Util.tableLookup(Type, typeThresholds, rollDie(100));
  const renown = Util.tableLookup(Renown, renownThresholds, rollDie(100));
  const size = Util.tableLookup(Size, sizeThresholds, rollDie(100));
  const { materialQuality, workQuality } = getQuality(renown);
  const age = getAge(type);
  const condition = getCondition(type);
  const subject = Util.tableLookup(Subject, subjectThresholds, rollDie(100));
  const value = getValue(
    renown,
    size,
    materialQuality,
    workQuality,
    age,
    condition,
    subject
  );

  return {
    type,
    renown,
    size,
    materialQuality,
    workQuality,
    age,
    condition,
    subject,
    value,
  };
}
