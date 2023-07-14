import { readFileSync } from 'fs';

export const publicKey = readFileSync('.keys/public-key.pem');
export const publicKeyString = publicKey.toString();
