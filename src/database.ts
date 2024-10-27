import postgres, { PendingQuery, Row } from "postgres";

export default postgres();

// Utility method when we only want a single row
export async function one<T extends Row>(pendingResult: PendingQuery<T[]>) {
  const result = await pendingResult;

  if (result.count !== 1) {
    throw Error(`Failed to ${result.command}, expected 1 row but got ${result.count}`);
  }

  return result[0];
}
