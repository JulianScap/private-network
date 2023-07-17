import { readFileSync } from 'fs';

import Config from './Config.js';

export const publicKey = readFileSync(Config.publicKeyPath);
export const publicKeyString = publicKey.toString();

export const privateKey = readFileSync(Config.privateKeyPath);
