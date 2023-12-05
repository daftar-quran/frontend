import { CRYPT_KEY } from '@app/config';
import * as CryptoTS from 'crypto-ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const LocalStorageSetItem = (key: string, text: any): void => {
  try {
    text = JSON.stringify(text);
    text = CryptoTS.AES.encrypt(text, CRYPT_KEY).toString();
    localStorage.setItem(key, text);
  } catch (error) {
    localStorage.setItem(key, '');
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const LocalStorageGetItem = (key: string): any => {
  let text: string;
  try {
    text = localStorage.getItem(key);
    text = CryptoTS.AES.decrypt(text, CRYPT_KEY).toString(CryptoTS.enc.Utf8);
    text = JSON.parse(text);
  } catch (error) {
    text = null;
  }
  return text;
};

export const LocalStorageClear = (): void => {
  localStorage.clear();
};

export const LocalStorageRemoveItem = (key: string): void => {
  localStorage.removeItem(key);
};
