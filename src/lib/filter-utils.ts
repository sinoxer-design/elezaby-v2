export interface FilterValues {
  priceMin?: number;
  priceMax?: number;
  brands: string[];
  inStockOnly: boolean;
  onSale: boolean;
  buyXGetY: boolean;
  minRating?: number;
}

export const emptyFilters: FilterValues = {
  priceMin: undefined,
  priceMax: undefined,
  brands: [],
  inStockOnly: false,
  onSale: false,
  buyXGetY: false,
  minRating: undefined,
};

export const DEFAULT_BRANDS = [
  "Panadol",
  "Centrum",
  "CeraVe",
  "GSK",
  "Voltaren",
  "Pampers",
  "Bioderma",
  "Nature's Bounty",
  "Bayer",
  "Avene",
  "Bepanthen",
];

export const RATING_OPTIONS = [
  { label: "4+ Stars", value: 4 },
  { label: "3+ Stars", value: 3 },
  { label: "2+ Stars", value: 2 },
];

/** Count how many filter criteria are active */
export function getActiveFilterCount(filters: FilterValues): number {
  return (
    filters.brands.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.buyXGetY ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0)
  );
}

/** Convert active filters to human-readable pills */
export function getActiveFilterLabels(filters: FilterValues): string[] {
  const labels: string[] = [];

  if (filters.priceMin || filters.priceMax) {
    const min = filters.priceMin ?? 0;
    const max = filters.priceMax ? ` - ${filters.priceMax}` : "+";
    labels.push(`${min}${max} EGP`);
  }
  filters.brands.forEach((b) => labels.push(b));
  if (filters.inStockOnly) labels.push("In Stock");
  if (filters.onSale) labels.push("On Sale");
  if (filters.buyXGetY) labels.push("Buy X Get Y");
  if (filters.minRating) labels.push(`${filters.minRating}+ Stars`);

  return labels;
}
