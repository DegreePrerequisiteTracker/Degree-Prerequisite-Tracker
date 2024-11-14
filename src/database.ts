import postgres, { PendingQuery, Row } from "postgres";

export default postgres();

export async function oneOrNull<T extends Row>(pendingResult: PendingQuery<T[]>): Promise<T | null> {
  const result = await pendingResult;

  if (result.count > 1) {
    throw Error(`Failed to ${result.command}, expected 0 or 1 rows but got ${result.count}`);
  }

  return result?.[0] ?? null;
}

// Utility method when we only want a single row
export async function one<T extends Row>(pendingResult: PendingQuery<T[]>) {
  const result = await pendingResult;

  if (result.count !== 1) {
    throw Error(`Failed to ${result.command}, expected 1 row but got ${result.count}`);
  }

  return result[0];
}
