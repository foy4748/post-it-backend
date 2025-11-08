import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  flash_db_secret: process.env.FLUSH_DB_SECRET,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,

  // Gemini related
  gemini_key: process.env.GOOGLE_GEMINI_API_KEY,

  // Redis related
  redisUser: process.env.REDIS_USERNAME,
  redisPassword: process.env.REDIS_PASSWORD,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};
