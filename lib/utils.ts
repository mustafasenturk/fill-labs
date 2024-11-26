import type { ClassValue } from 'clsx';
import { Dimensions, Platform } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
