export enum NAME_GENDER {
  BOY = "BOY",
  GIRL = "GIRL",
  UNISEX = "UNISEX",
}

export const nameGenders = [NAME_GENDER.BOY, NAME_GENDER.GIRL, NAME_GENDER.UNISEX] as const;

export enum NAME_THEME {
  CUTE = "CUTE",
  ROYAL = "ROYAL",
  NATURE = "NATURE",
  MYTHOLOGY = "MYTHOLOGY",
  FLOWERS = "FLOWERS",
  UNIQUE = "UNIQUE",
  LITERATURE = "LITERATURE",
  COLOR = "COLOR",
}

export const nameThemes = [
  NAME_THEME.CUTE,
  NAME_THEME.ROYAL,
  NAME_THEME.NATURE,
  NAME_THEME.MYTHOLOGY,
  NAME_THEME.FLOWERS,
  NAME_THEME.UNIQUE,
  NAME_THEME.LITERATURE,
  NAME_THEME.COLOR,
] as const;

export enum NAME_ORIGIN {
  ARABIC = "ARABIC",
  CHINESE = "CHINESE",
  DUTCH = "DUTCH",
  ENGLISH = "ENGLISH",
  FINNISH = "FINNISH",
  FRENCH = "FRENCH",
  GERMAN = "GERMAN",
  HEBREW = "HEBREW",
  HINDI = "HINDI",
  IRISH = "IRISH",
  ITALIAN = "ITALIAN",
  JAPANESE = "JAPANESE",
  PORTUGUESE = "PORTUGUESE",
  SCANDINAVIAN = "SCANDINAVIAN",
  SCOTTISH = "SCOTTISH",
  SLAVIC = "SLAVIC",
  SPANISH = "SPANISH",
  TURKISH = "TURKISH",
}

export const nameOrigins = [
  NAME_ORIGIN.ARABIC,
  NAME_ORIGIN.CHINESE,
  NAME_ORIGIN.DUTCH,
  NAME_ORIGIN.ENGLISH,
  NAME_ORIGIN.FINNISH,
  NAME_ORIGIN.FRENCH,
  NAME_ORIGIN.GERMAN,
  NAME_ORIGIN.HEBREW,
  NAME_ORIGIN.HINDI,
  NAME_ORIGIN.IRISH,
  NAME_ORIGIN.ITALIAN,
  NAME_ORIGIN.JAPANESE,
  NAME_ORIGIN.PORTUGUESE,
  NAME_ORIGIN.SCANDINAVIAN,
  NAME_ORIGIN.SCOTTISH,
  NAME_ORIGIN.SLAVIC,
  NAME_ORIGIN.SPANISH,
  NAME_ORIGIN.TURKISH,
] as const;

export enum NAME_LENGTH {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}

export const nameLengths = [NAME_LENGTH.SHORT, NAME_LENGTH.MEDIUM, NAME_LENGTH.LONG] as const;

export enum NAME_FIRST_LETTER {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
}

export const nameFirstLetters = [
  NAME_FIRST_LETTER.A,
  NAME_FIRST_LETTER.B,
  NAME_FIRST_LETTER.C,
  NAME_FIRST_LETTER.D,
  NAME_FIRST_LETTER.E,
  NAME_FIRST_LETTER.F,
  NAME_FIRST_LETTER.G,
  NAME_FIRST_LETTER.H,
  NAME_FIRST_LETTER.I,
  NAME_FIRST_LETTER.J,
  NAME_FIRST_LETTER.K,
  NAME_FIRST_LETTER.L,
  NAME_FIRST_LETTER.M,
  NAME_FIRST_LETTER.N,
  NAME_FIRST_LETTER.O,
  NAME_FIRST_LETTER.P,
  NAME_FIRST_LETTER.Q,
  NAME_FIRST_LETTER.R,
  NAME_FIRST_LETTER.S,
  NAME_FIRST_LETTER.T,
  NAME_FIRST_LETTER.U,
  NAME_FIRST_LETTER.V,
  NAME_FIRST_LETTER.W,
  NAME_FIRST_LETTER.X,
  NAME_FIRST_LETTER.Y,
  NAME_FIRST_LETTER.Z,
] as const;

export enum ZODIAC {
  ARIES = "aries",
  TAURUS = "taurus",
  GEMINI = "gemini",
  CANCER = "cancer",
  LEO = "leo",
  VIRGO = "virgo",
  LIBRA = "libra",
  SCORPIO = "scorpio",
  SAGITTARIUS = "sagittarius",
  CAPRICORN = "capricorn",
  AQUARIUS = "aquarius",
  PISCES = "pisces",
}

export const zodiacs = [
  ZODIAC.ARIES,
  ZODIAC.TAURUS,
  ZODIAC.GEMINI,
  ZODIAC.CANCER,
  ZODIAC.LEO,
  ZODIAC.VIRGO,
  ZODIAC.LIBRA,
  ZODIAC.SCORPIO,
  ZODIAC.SAGITTARIUS,
  ZODIAC.CAPRICORN,
  ZODIAC.AQUARIUS,
  ZODIAC.PISCES,
] as const;

export enum AI_PROCESS_STATUS {
  CREATED = "created",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export const aiProcessStatuses = [
  AI_PROCESS_STATUS.CREATED,
  AI_PROCESS_STATUS.PROCESSING,
  AI_PROCESS_STATUS.COMPLETED,
  AI_PROCESS_STATUS.FAILED,
] as const;
