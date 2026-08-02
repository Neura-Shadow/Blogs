/**
 * Merge transport metadata with a reviewed local catalog record.
 * Public claims, taxonomy, links, and covers remain local-authoritative.
 */
export function mergeReviewedCatalogRecord<T extends Record<string, any>>(localRecord: T, remoteRecord: Partial<T>): T {
  return {
    ...remoteRecord,
    ...localRecord
  } as T
}
