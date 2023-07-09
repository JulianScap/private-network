import dotenv from 'dotenv';

const parsed = dotenv.parse();

export const { backendUrl } = parsed;
