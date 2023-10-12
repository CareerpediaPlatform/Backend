import bcrypt from 'bcrypt'
import * as CryptoJS from 'crypto-js'
import { AES_ENC_KEY } from '../Loaders/config'

export async function hashPassword (plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, 5)
}

export async function comparePasswords (hashedPassword: string, plainPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export async function comparehashPasswords(hashedPassword, hashedOldPassword) {
  try {
    // Compare the two hashed passwords
    const passwordsMatch = await bcrypt.compare(hashedOldPassword, hashedPassword);
    return passwordsMatch;
  } catch (error) {
    // Handle any errors that may occur during the comparison
    throw error;
  }
}

export function generatePasswordWithPrefixAndLength(length: number, prefix: string): string {
  const prefixLength = prefix.length;

  if (prefixLength >= length) {
    throw new Error("Total password length is too short for the given prefix.");
  }

  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
  const remainingLength = length - prefixLength;

  let password = prefix;

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}







