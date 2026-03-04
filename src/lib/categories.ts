// Hierarchical category system — 3-tier: Primary → Sub → Deep

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  imageUrl: string;
  emoji: string;
  productCount: number;
  order: number;
}

// ── Full category tree ──────────────────────────────────────────────
export const categories: Category[] = [
  // ─── Primary Categories ───
  { id: "med",   name: "Medicines",              slug: "medicines",     parentId: null, imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop", emoji: "💊", productCount: 2450, order: 1 },
  { id: "skin",  name: "Skincare",               slug: "skincare",      parentId: null, imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop", emoji: "✨", productCount: 890,  order: 2 },
  { id: "vit",   name: "Vitamins & Supplements", slug: "vitamins",      parentId: null, imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop", emoji: "🧬", productCount: 560,  order: 3 },
  { id: "baby",  name: "Baby Care",              slug: "baby-care",     parentId: null, imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop", emoji: "👶", productCount: 340,  order: 4 },
  { id: "hair",  name: "Hair Care",              slug: "hair-care",     parentId: null, imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop", emoji: "💇", productCount: 420,  order: 5 },
  { id: "pc",    name: "Personal Care",          slug: "personal-care", parentId: null, imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", emoji: "🧴", productCount: 780,  order: 6 },
  { id: "fa",    name: "First Aid",              slug: "first-aid",     parentId: null, imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop", emoji: "🩹", productCount: 150,  order: 7 },
  { id: "dent",  name: "Dental Care",            slug: "dental-care",   parentId: null, imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", emoji: "🦷", productCount: 230,  order: 8 },

  // ─── Medicines → Sub-Categories ───
  { id: "med-pain",    name: "Pain Relief",     slug: "pain-relief",      parentId: "med", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop", emoji: "🤕", productCount: 320, order: 1 },
  { id: "med-cold",    name: "Cold & Flu",      slug: "cold-flu",         parentId: "med", imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop", emoji: "🤧", productCount: 210, order: 2 },
  { id: "med-anti",    name: "Antibiotics",     slug: "antibiotics",      parentId: "med", imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop", emoji: "🦠", productCount: 180, order: 3 },
  { id: "med-digest",  name: "Digestive Health",slug: "digestive-health", parentId: "med", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=200&fit=crop", emoji: "🫄", productCount: 150, order: 4 },
  { id: "med-allergy", name: "Allergy Relief",  slug: "allergy-relief",   parentId: "med", imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&h=200&fit=crop", emoji: "🌿", productCount: 90,  order: 5 },

  // ─── Medicines → Deep Categories ───
  { id: "med-pain-tab",  name: "Tablets",      slug: "pain-tablets",           parentId: "med-pain",   imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop", emoji: "💊", productCount: 180, order: 1 },
  { id: "med-pain-syr",  name: "Syrups",       slug: "pain-syrups",            parentId: "med-pain",   imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop", emoji: "🧪", productCount: 45,  order: 2 },
  { id: "med-pain-top",  name: "Topical",      slug: "pain-topical",           parentId: "med-pain",   imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop", emoji: "🧴", productCount: 95,  order: 3 },
  { id: "med-cold-dec",  name: "Decongestants",slug: "decongestants",          parentId: "med-cold",   imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop", emoji: "👃", productCount: 110, order: 1 },
  { id: "med-cold-cgh",  name: "Cough Syrups", slug: "cough-syrups",           parentId: "med-cold",   imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop", emoji: "🫗", productCount: 100, order: 2 },
  { id: "med-anti-cap",  name: "Capsules",     slug: "antibiotic-capsules",    parentId: "med-anti",   imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop", emoji: "💊", productCount: 95,  order: 1 },
  { id: "med-anti-sus",  name: "Suspensions",  slug: "antibiotic-suspensions", parentId: "med-anti",   imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop", emoji: "🧪", productCount: 85,  order: 2 },
  { id: "med-dig-ant",   name: "Antacids",     slug: "antacids",               parentId: "med-digest", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=200&fit=crop", emoji: "🫧", productCount: 80,  order: 1 },
  { id: "med-dig-lax",   name: "Laxatives",    slug: "laxatives",              parentId: "med-digest", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=200&fit=crop", emoji: "💧", productCount: 70,  order: 2 },

  // ─── Skincare → Sub-Categories ───
  { id: "skin-moist", name: "Moisturizers",   slug: "moisturizers",   parentId: "skin", imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&h=200&fit=crop", emoji: "💦", productCount: 280, order: 1 },
  { id: "skin-clean", name: "Cleansers",      slug: "cleansers",      parentId: "skin", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop", emoji: "🫧", productCount: 190, order: 2 },
  { id: "skin-sun",   name: "Sun Protection", slug: "sun-protection", parentId: "skin", imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop", emoji: "☀️", productCount: 120, order: 3 },
  { id: "skin-treat", name: "Treatments",     slug: "treatments",     parentId: "skin", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop", emoji: "🔬", productCount: 300, order: 4 },

  // ─── Skincare → Deep Categories ───
  { id: "skin-moist-face", name: "Face Creams",   slug: "face-creams",   parentId: "skin-moist", imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&h=200&fit=crop", emoji: "🧴", productCount: 150, order: 1 },
  { id: "skin-moist-body", name: "Body Lotions",  slug: "body-lotions",  parentId: "skin-moist", imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop", emoji: "🤲", productCount: 90,  order: 2 },
  { id: "skin-moist-lip",  name: "Lip Care",      slug: "lip-care",      parentId: "skin-moist", imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop", emoji: "👄", productCount: 40,  order: 3 },
  { id: "skin-clean-fw",   name: "Face Wash",     slug: "face-wash",     parentId: "skin-clean", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop", emoji: "🧼", productCount: 110, order: 1 },
  { id: "skin-clean-mic",  name: "Micellar Water",slug: "micellar-water",parentId: "skin-clean", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop", emoji: "💧", productCount: 80,  order: 2 },
  { id: "skin-sun-sc",     name: "Sunscreen",     slug: "sunscreen",     parentId: "skin-sun",   imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop", emoji: "🧴", productCount: 85,  order: 1 },
  { id: "skin-sun-as",     name: "After Sun",     slug: "after-sun",     parentId: "skin-sun",   imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop", emoji: "🌅", productCount: 35,  order: 2 },
  { id: "skin-treat-ser",  name: "Serums",        slug: "serums",        parentId: "skin-treat", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop", emoji: "💎", productCount: 160, order: 1 },
  { id: "skin-treat-mask", name: "Masks",         slug: "masks",         parentId: "skin-treat", imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop", emoji: "🎭", productCount: 140, order: 2 },

  // ─── Vitamins → Sub-Categories ───
  { id: "vit-multi",  name: "Multivitamins", slug: "multivitamins", parentId: "vit", imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop", emoji: "💊", productCount: 180, order: 1 },
  { id: "vit-immune", name: "Immunity",      slug: "immunity",      parentId: "vit", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop", emoji: "🛡️", productCount: 120, order: 2 },
  { id: "vit-bone",   name: "Bone & Joint",  slug: "bone-joint",    parentId: "vit", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=200&fit=crop", emoji: "🦴", productCount: 90,  order: 3 },
  { id: "vit-energy", name: "Energy & Focus",slug: "energy-focus",  parentId: "vit", imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop", emoji: "⚡", productCount: 170, order: 4 },

  // ─── Vitamins → Deep Categories ───
  { id: "vit-multi-adult", name: "Adults",    slug: "adult-multivitamins", parentId: "vit-multi",  imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop", emoji: "🧑", productCount: 100, order: 1 },
  { id: "vit-multi-kids",  name: "Kids",      slug: "kids-multivitamins",  parentId: "vit-multi",  imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop", emoji: "👧", productCount: 80,  order: 2 },
  { id: "vit-immune-vc",   name: "Vitamin C", slug: "vitamin-c",           parentId: "vit-immune", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop", emoji: "🍊", productCount: 60,  order: 1 },
  { id: "vit-immune-zinc", name: "Zinc",      slug: "zinc",                parentId: "vit-immune", imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop", emoji: "⚙️", productCount: 60,  order: 2 },
  { id: "vit-bone-d",      name: "Vitamin D", slug: "vitamin-d",           parentId: "vit-bone",   imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop", emoji: "☀️", productCount: 50,  order: 1 },
  { id: "vit-bone-calc",   name: "Calcium",   slug: "calcium",             parentId: "vit-bone",   imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=200&fit=crop", emoji: "🥛", productCount: 40,  order: 2 },

  // ─── Baby Care → Sub-Categories ───
  { id: "baby-diaper", name: "Diapers & Wipes", slug: "diapers-wipes", parentId: "baby", imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=200&fit=crop", emoji: "🧷", productCount: 120, order: 1 },
  { id: "baby-skin",   name: "Baby Skincare",   slug: "baby-skincare", parentId: "baby", imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop", emoji: "🧴", productCount: 80,  order: 2 },
  { id: "baby-feed",   name: "Feeding",         slug: "feeding",       parentId: "baby", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop", emoji: "🍼", productCount: 90,  order: 3 },
  { id: "baby-health", name: "Baby Health",     slug: "baby-health",   parentId: "baby", imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop", emoji: "🌡️", productCount: 50,  order: 4 },

  // ─── Hair Care → Sub-Categories ───
  { id: "hair-shamp", name: "Shampoo",         slug: "shampoo",         parentId: "hair", imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200&h=200&fit=crop", emoji: "🧴", productCount: 150, order: 1 },
  { id: "hair-cond",  name: "Conditioner",     slug: "conditioner",     parentId: "hair", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop", emoji: "💆", productCount: 100, order: 2 },
  { id: "hair-treat", name: "Hair Treatments", slug: "hair-treatments", parentId: "hair", imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=200&h=200&fit=crop", emoji: "🧪", productCount: 110, order: 3 },
  { id: "hair-style", name: "Styling",         slug: "styling",         parentId: "hair", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop", emoji: "💁", productCount: 60,  order: 4 },

  // ─── Personal Care → Sub-Categories ───
  { id: "pc-deo",   name: "Deodorants",    slug: "deodorants",    parentId: "pc", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop", emoji: "🌸", productCount: 200, order: 1 },
  { id: "pc-bath",  name: "Bath & Shower", slug: "bath-shower",   parentId: "pc", imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=200&fit=crop", emoji: "🚿", productCount: 180, order: 2 },
  { id: "pc-shave", name: "Shaving",       slug: "shaving",       parentId: "pc", imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200&h=200&fit=crop", emoji: "🪒", productCount: 120, order: 3 },
  { id: "pc-fem",   name: "Feminine Care", slug: "feminine-care", parentId: "pc", imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop", emoji: "🌷", productCount: 90,  order: 4 },

  // ─── First Aid → Sub-Categories ───
  { id: "fa-band",  name: "Bandages",     slug: "bandages",     parentId: "fa", imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200&h=200&fit=crop", emoji: "🩹", productCount: 50, order: 1 },
  { id: "fa-anti",  name: "Antiseptics",  slug: "antiseptics",  parentId: "fa", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop", emoji: "🧴", productCount: 40, order: 2 },
  { id: "fa-therm", name: "Thermometers", slug: "thermometers", parentId: "fa", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=200&fit=crop", emoji: "🌡️", productCount: 30, order: 3 },

  // ─── Dental Care → Sub-Categories ───
  { id: "dent-paste", name: "Toothpaste",    slug: "toothpaste",  parentId: "dent", imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop", emoji: "🪥", productCount: 90, order: 1 },
  { id: "dent-brush", name: "Toothbrushes",  slug: "toothbrushes",parentId: "dent", imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop", emoji: "🪥", productCount: 60, order: 2 },
  { id: "dent-wash",  name: "Mouthwash",     slug: "mouthwash",   parentId: "dent", imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop", emoji: "💧", productCount: 50, order: 3 },
  { id: "dent-floss", name: "Floss & Picks", slug: "floss-picks", parentId: "dent", imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop", emoji: "🧵", productCount: 30, order: 4 },
];

// ── Category Colors (brand design system) ─────────────────────────────
export const CATEGORY_COLORS: Record<string, {
  bg: string;
  activeBg: string;
  border: string;
  banner: string;
  light: string;
}> = {
  med:  { bg: "bg-brand-50",  activeBg: "bg-brand-100",  border: "border-brand-400",  banner: "from-brand-700 to-brand-500", light: "bg-brand-50" },
  skin: { bg: "bg-cyan-50",   activeBg: "bg-cyan-100",   border: "border-cyan-400",   banner: "from-cyan-600 to-cyan-400",   light: "bg-cyan-50" },
  vit:  { bg: "bg-sand-100",  activeBg: "bg-sand-200",   border: "border-brand-300",  banner: "from-brand-600 to-cyan-500",  light: "bg-sand-100" },
  baby: { bg: "bg-cyan-50",   activeBg: "bg-cyan-100",   border: "border-cyan-300",   banner: "from-cyan-500 to-brand-500",  light: "bg-cyan-50" },
  hair: { bg: "bg-brand-50",  activeBg: "bg-brand-100",  border: "border-brand-300",  banner: "from-brand-600 to-brand-400", light: "bg-brand-50" },
  pc:   { bg: "bg-sand-100",  activeBg: "bg-sand-200",   border: "border-cyan-400",   banner: "from-cyan-700 to-cyan-500",   light: "bg-sand-100" },
  fa:   { bg: "bg-brand-50",  activeBg: "bg-brand-100",  border: "border-brand-400",  banner: "from-brand-700 to-brand-600", light: "bg-brand-50" },
  dent: { bg: "bg-cyan-50",   activeBg: "bg-cyan-100",   border: "border-cyan-400",   banner: "from-cyan-600 to-brand-500",  light: "bg-cyan-50" },
};

// ── Subcategory with deep children ────────────────────────────────────
export interface SubcategoryWithDeep extends Category {
  deepCategories: Category[];
}

export function getSubcategoriesWithDeep(primaryId: string): SubcategoryWithDeep[] {
  return getChildren(primaryId).map((sub) => ({
    ...sub,
    deepCategories: getChildren(sub.id),
  }));
}

// ── Helper Functions ────────────────────────────────────────────────

/** All top-level categories */
export function getPrimaryCategories(): Category[] {
  return categories
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.order - b.order);
}

/** Direct children of a given category */
export function getChildren(parentId: string): Category[] {
  return categories
    .filter((c) => c.parentId === parentId)
    .sort((a, b) => a.order - b.order);
}

/** Lookup by slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Lookup by id */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Get the tier depth: 0 = primary, 1 = sub, 2 = deep */
export function getCategoryDepth(cat: Category): number {
  let depth = 0;
  let current: Category | undefined = cat;
  while (current?.parentId) {
    depth++;
    current = getCategoryById(current.parentId);
  }
  return depth;
}

/** Breadcrumb path from root → given category (inclusive) */
export function getCategoryPath(catOrSlug: Category | string): Category[] {
  const cat =
    typeof catOrSlug === "string"
      ? getCategoryBySlug(catOrSlug)
      : catOrSlug;
  if (!cat) return [];

  const path: Category[] = [cat];
  let current: Category | undefined = cat;
  while (current?.parentId) {
    current = getCategoryById(current.parentId);
    if (current) path.unshift(current);
  }
  return path;
}

/** All descendant category IDs (recursive) */
export function getDescendantIds(parentId: string): string[] {
  const directChildren = categories.filter((c) => c.parentId === parentId);
  const ids: string[] = [];
  for (const child of directChildren) {
    ids.push(child.id);
    ids.push(...getDescendantIds(child.id));
  }
  return ids;
}

/** All category IDs that belong to a given category (self + descendants) */
export function getCategoryAndDescendantIds(categoryId: string): string[] {
  return [categoryId, ...getDescendantIds(categoryId)];
}

/** Walk up parentId chain to find the root primary category */
export function getPrimaryAncestor(cat: Category): Category {
  let current = cat;
  while (current.parentId) {
    const parent = getCategoryById(current.parentId);
    if (!parent) break;
    current = parent;
  }
  return current;
}

/** Resolve the sub-category tier for any category depth:
 *  depth 0 (primary) → first child sub-category
 *  depth 1 (sub)     → self
 *  depth 2 (deep)    → parent (the sub-category)
 */
export function resolveSubCategory(cat: Category): Category | undefined {
  const depth = getCategoryDepth(cat);
  if (depth === 0) {
    const children = getChildren(cat.id);
    return children[0];
  }
  if (depth === 1) return cat;
  if (depth === 2) return cat.parentId ? getCategoryById(cat.parentId) : undefined;
  return undefined;
}
