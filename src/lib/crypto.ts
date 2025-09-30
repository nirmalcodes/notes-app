import CryptoJS from 'crypto-js';

const isProd = import.meta.env.PROD;
const STORAGE_KEY = 'auth_user';
const SECRET_KEY =
  import.meta.env.VITE_SECRET_KEY || '488a3186ce0ed1a6566dac7ec81e9cc836859800b6c6472dcb2c93ddaarbmEWC';

export const secureStoreUser = (user: object) => {
  const raw = JSON.stringify(user);

  const payload = isProd ? CryptoJS.AES.encrypt(raw, SECRET_KEY).toString() : raw;

  localStorage.setItem(STORAGE_KEY, payload);
};

export const secureLoadUser = (): any | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const data = isProd ? CryptoJS.AES.decrypt(stored, SECRET_KEY).toString(CryptoJS.enc.Utf8) : stored;

    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const clearStoredUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};
