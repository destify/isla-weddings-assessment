// In-memory Postgres for local development and tests (PGlite).
// Do not change this file or data/*.sql: reviewer tests depend on them.
import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const schemaSql = readFileSync(fileURLToPath(new URL('../data/schema.sql', import.meta.url)), 'utf8');
const seedSql = readFileSync(fileURLToPath(new URL('../data/seed.sql', import.meta.url)), 'utf8');

let instance: PGlite | null = null;
let ready: Promise<PGlite> | null = null;

async function create(withSeed: boolean): Promise<PGlite> {
  const pg = new PGlite();
  await pg.exec(schemaSql);
  if (withSeed) await pg.exec(seedSql);
  instance = pg;
  return pg;
}

function getDb(): Promise<PGlite> {
  if (!ready) ready = create(true);
  return ready;
}

/** Recreate the database, seeded with data/seed.sql unless `seed: false`. */
export async function resetDb(options: { seed?: boolean } = {}): Promise<void> {
  if (ready) await ready;
  if (instance) await instance.close();
  instance = null;
  ready = create(options.seed ?? true);
  await ready;
}

export const db = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async query<T = any>(sql: string, params?: unknown[]) {
    const pg = await getDb();
    return pg.query<T>(sql, params);
  },
};
