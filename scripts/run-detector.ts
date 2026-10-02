// Runs detector/detector.sql against the seeded in-memory database and prints the result.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { db, resetDb } from '@/lib/db';

const sql = readFileSync(fileURLToPath(new URL('../detector/detector.sql', import.meta.url)), 'utf8');

await resetDb();
const result = await db.query(sql);

if (result.rows.length === 0) {
  console.log('Detector returned no rows.');
} else {
  console.table(result.rows);
  console.log(`${result.rows.length} booking(s) flagged.`);
}
