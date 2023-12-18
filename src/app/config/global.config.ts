export const LOCAL_STORAGE_KEYS = { auth: 'QL-AUTH' };
export const CRYPT_KEY = 'SomeRondomKey';

export const PAGE_SIZE_OPTIONS: number[] = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
];
// Prendre par défaut la valeur minimal
export const MIN_PAGE_SIZE_OPTIONS = Math.min(...PAGE_SIZE_OPTIONS);
export const DEFAULT_PAGE_SIZE = 20;
