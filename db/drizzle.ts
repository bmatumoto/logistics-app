import { drizzle } from 'drizzle-orm/neon-http';
import { config } from "dotenv";
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);

// Passe o schema como segundo argumento
export const db = drizzle(sql, { schema })
