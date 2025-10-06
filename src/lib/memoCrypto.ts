import CryptoJS from 'crypto-js';

const FALLBACK_KEY = import.meta.env.VITE_SECRET_KEY || 'default-memo-secret-key';

export const encryptMemo = (content: string, userId: string): string => {
  if (!content.trim()) return '';
  try {
    const key = userId || FALLBACK_KEY;
    return CryptoJS.AES.encrypt(content, key).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return content; // fallback to plain text
  }
};

export const decryptMemo = (encryptedContent: string, userId: string): string => {
  if (!encryptedContent.trim()) return '';
  try {
    const key = userId || FALLBACK_KEY;
    const decrypted = CryptoJS.AES.decrypt(encryptedContent, key).toString(CryptoJS.enc.Utf8);
    return decrypted || encryptedContent; // return original if fails
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedContent; // fallback to raw
  }
};
