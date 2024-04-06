import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  apiKey: process.env.API_KEY,
  database: {
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
}));
