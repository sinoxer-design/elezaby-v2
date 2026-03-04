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
  { id: "med",   name: "Medicines",              slug: "medicines",     parentId: null, imageUrl: "/images/categories/medicines.svg", emoji: "💊", productCount: 2450, order: 1 },
  { id: "skin",  name: "Skincare",               slug: "skincare",      parentId: null, imageUrl: "/images/categories/skincare.svg", emoji: "✨", productCount: 890,  order: 2 },
  { id: "vit",   name: "Vitamins & Supplements", slug: "vitamins",      parentId: null, imageUrl: "/images/categories/vitamins.svg", emoji: "🧬", productCount: 560,  order: 3 },
  { id: "baby",  name: "Baby Care",              slug: "baby-care",     parentId: null, imageUrl: "/images/categories/baby-care.svg", emoji: "👶", productCount: 340,  order: 4 },
  { id: "hair",  name: "Hair Care",              slug: "hair-care",     parentId: null, imageUrl: "/images/categories/hair-care.svg", emoji: "💇", productCount: 420,  order: 5 },
  { id: "pc",    name: "Personal Care",          slug: "personal-care", parentId: null, imageUrl: "/images/categories/personal-care.svg", emoji: "🧴", productCount: 780,  order: 6 },
  { id: "fa",    name: "First Aid",              slug: "first-aid",     parentId: null, imageUrl: "/images/categories/first-aid.svg", emoji: "🩹", productCount: 150,  order: 7 },
  { id: "dent",  name: "Dental Care",            slug: "dental-care",   parentId: null, imageUrl: "/images/categories/dental-care.svg", emoji: "🦷", productCount: 230,  order: 8 },

  // ─── Medicines → Sub-Categories ───
  { id: "med-pain",    name: "Pain Relief",     slug: "pain-relief",      parentId: "med", imageUrl: "/images/categories/placeholder.svg", emoji: "🤕", productCount: 320, order: 1 },
  { id: "med-cold",    name: "Cold & Flu",      slug: "cold-flu",         parentId: "med", imageUrl: "/images/categories/placeholder.svg", emoji: "🤧", productCount: 210, order: 2 },
  { id: "med-anti",    name: "Antibiotics",     slug: "antibiotics",      parentId: "med", imageUrl: "/images/categories/placeholder.svg", emoji: "🦠", productCount: 180, order: 3 },
  { id: "med-digest",  name: "Digestive Health",slug: "digestive-health", parentId: "med", imageUrl: "/images/categories/placeholder.svg", emoji: "🫄", productCount: 150, order: 4 },
  { id: "med-allergy", name: "Allergy Relief",  slug: "allergy-relief",   parentId: "med", imageUrl: "/images/categories/placeholder.svg", emoji: "🌿", productCount: 90,  order: 5 },

  // ─── Medicines → Deep Categories ───
  { id: "med-pain-tab",  name: "Tablets",      slug: "pain-tablets",           parentId: "med-pain",   imageUrl: "/images/categories/placeholder.svg", emoji: "💊", productCount: 180, order: 1 },
  { id: "med-pain-syr",  name: "Syrups",       slug: "pain-syrups",            parentId: "med-pain",   imageUrl: "/images/categories/placeholder.svg", emoji: "🧪", productCount: 45,  order: 2 },
  { id: "med-pain-top",  name: "Topical",      slug: "pain-topical",           parentId: "med-pain",   imageUrl: "/images/categories/placeholder.svg", emoji: "🧴", productCount: 95,  order: 3 },
  { id: "med-cold-dec",  name: "Decongestants",slug: "decongestants",          parentId: "med-cold",   imageUrl: "/images/categories/placeholder.svg", emoji: "👃", productCount: 110, order: 1 },
  { id: "med-cold-cgh",  name: "Cough Syrups", slug: "cough-syrups",           parentId: "med-cold",   imageUrl: "/images/categories/placeholder.svg", emoji: "🫗", productCount: 100, order: 2 },
  { id: "med-anti-cap",  name: "Capsules",     slug: "antibiotic-capsules",    parentId: "med-anti",   imageUrl: "/images/categories/placeholder.svg", emoji: "💊", productCount: 95,  order: 1 },
  { id: "med-anti-sus",  name: "Suspensions",  slug: "antibiotic-suspensions", parentId: "med-anti",   imageUrl: "/images/categories/placeholder.svg", emoji: "🧪", productCount: 85,  order: 2 },
  { id: "med-dig-ant",   name: "Antacids",     slug: "antacids",               parentId: "med-digest", imageUrl: "/images/categories/placeholder.svg", emoji: "🫧", productCount: 80,  order: 1 },
  { id: "med-dig-lax",   name: "Laxatives",    slug: "laxatives",              parentId: "med-digest", imageUrl: "/images/categories/placeholder.svg", emoji: "💧", productCount: 70,  order: 2 },

  // ─── Skincare → Sub-Categories ───
  { id: "skin-moist", name: "Moisturizers",   slug: "moisturizers",   parentId: "skin", imageUrl: "/images/categories/placeholder.svg", emoji: "💦", productCount: 280, order: 1 },
  { id: "skin-clean", name: "Cleansers",      slug: "cleansers",      parentId: "skin", imageUrl: "/images/categories/placeholder.svg", emoji: "🫧", productCount: 190, order: 2 },
  { id: "skin-sun",   name: "Sun Protection", slug: "sun-protection", parentId: "skin", imageUrl: "/images/categories/placeholder.svg", emoji: "☀️", productCount: 120, order: 3 },
  { id: "skin-treat", name: "Treatments",     slug: "treatments",     parentId: "skin", imageUrl: "/images/categories/placeholder.svg", emoji: "🔬", productCount: 300, order: 4 },

  // ─── Skincare → Deep Categories ───
  { id: "skin-moist-face", name: "Face Creams",   slug: "face-creams",   parentId: "skin-moist", imageUrl: "/images/categories/placeholder.svg", emoji: "🧴", productCount: 150, order: 1 },
  { id: "skin-moist-body", name: "Body Lotions",  slug: "body-lotions",  parentId: "skin-moist", imageUrl: "/images/categories/placeholder.svg", emoji: "🤲", productCount: 90,  order: 2 },
  { id: "skin-moist-lip",  name: "Lip Care",      slug: "lip-care",      parentId: "skin-moist", imageUrl: "/images/categories/placeholder.svg", emoji: "👄", productCount: 40,  order: 3 },
  { id: "skin-clean-fw",   name: "Face Wash",     slug: "face-wash",     parentId: "skin-clean", imageUrl: "/images/categories/placeholder.svg", emoji: "🧼", productCount: 110, order: 1 },
  { id: "skin-clean-mic",  name: "Micellar Water",slug: "micellar-water",parentId: "skin-clean", imageUrl: "/images/categories/placeholder.svg", emoji: "💧", productCount: 80,  order: 2 },
  { id: "skin-sun-sc",     name: "Sunscreen",     slug: "sunscreen",     parentId: "skin-sun",   imageUrl: "/images/categories/placeholder.svg", emoji: "🧴", productCount: 85,  order: 1 },
  { id: "skin-sun-as",     name: "After Sun",     slug: "after-sun",     parentId: "skin-sun",   imageUrl: "/images/categories/placeholder.svg", emoji: "🌅", productCount: 35,  order: 2 },
  { id: "skin-treat-ser",  name: "Serums",        slug: "serums",        parentId: "skin-treat", imageUrl: "/images/categories/placeholder.svg", emoji: "💎", productCount: 160, order: 1 },
  { id: "skin-treat-mask", name: "Masks",         slug: "masks",         parentId: "skin-treat", imageUrl: "/images/categories/placeholder.svg", emoji: "🎭", productCount: 140, order: 2 },

  // ─── Vitamins → Sub-Categories ───
  { id: "vit-multi",  name: "Multivitamins", slug: "multivitamins", parentId: "vit", imageUrl: "/images/categories/placeholder.svg", emoji: "💊", productCount: 180, order: 1 },
  { id: "vit-immune", name: "Immunity",      slug: "immunity",      parentId: "vit", imageUrl: "/images/categories/placeholder.svg", emoji: "🛡️", productCount: 120, order: 2 },
  { id: "vit-bone",   name: "Bone & Joint",  slug: "bone-joint",    parentId: "vit", imageUrl: "/images/categories/placeholder.svg", emoji: "🦴", productCount: 90,  order: 3 },
  { id: "vit-energy", name: "Energy & Focus",slug: "energy-focus",  parentId: "vit", imageUrl: "/images/categories/placeholder.svg", emoji: "⚡", productCount: 170, order: 4 },

  // ─── Vitamins → Deep Categories ───
  { id: "vit-multi-adult", name: "Adults",    slug: "adult-multivitamins", parentId: "vit-multi",  imageUrl: "/images/categories/placeholder.svg", emoji: "🧑", productCount: 100, order: 1 },
  { id: "vit-multi-kids",  name: "Kids",      slug: "kids-multivitamins",  parentId: "vit-multi",  imageUrl: "/images/categories/placeholder.svg", emoji: "👧", productCount: 80,  order: 2 },
  { id: "vit-immune-vc",   name: "Vitamin C", slug: "vitamin-c",           parentId: "vit-immune", imageUrl: "/images/categories/placeholder.svg", emoji: "🍊", productCount: 60,  order: 1 },
  { id: "vit-immune-zinc", name: "Zinc",      slug: "zinc",                parentId: "vit-immune", imageUrl: "/images/categories/placeholder.svg", emoji: "⚙️", productCount: 60,  order: 2 },
  { id: "vit-bone-d",      name: "Vitamin D", slug: "vitamin-d",           parentId: "vit-bone",   imageUrl: "/images/categories/placeholder.svg", emoji: "☀️", productCount: 50,  order: 1 },
  { id: "vit-bone-calc",   name: "Calcium",   slug: "calcium",             parentId: "vit-bone",   imageUrl: "/images/categories/placeholder.svg", emoji: "🥛", productCount: 40,  order: 2 },

  // ─── Baby Care → Sub-Categories ───
  { id: "baby-diaper", name: "Diapers & Wipes", slug: "diapers-wipes", parentId: "baby", imageUrl: "/images/categories/placeholder.svg", emoji: "🧷", productCount: 120, order: 1 },
  { id: "baby-skin",   name: "Baby Skincare",   slug: "baby-skincare", parentId: "baby", imageUrl: "/images/categories/placeholder.svg", emoji: "🧴", productCount: 80,  order: 2 },
  { id: "baby-feed",   name: "Feeding",         slug: "feeding",       parentId: "baby", imageUrl: "/images/categories/placeholder.svg", emoji: "🍼", productCount: 90,  order: 3 },
  { id: "baby-health", name: "Baby Health",     slug: "baby-health",   parentId: "baby", imageUrl: "/images/categories/placeholder.svg", emoji: "🌡️", productCount: 50,  order: 4 },

  // ─── Hair Care → Sub-Categories ───
  { id: "hair-shamp", name: "Shampoo",         slug: "shampoo",         parentId: "hair", imageUrl: "/images/categories/placeholder.svg", emoji: "🧴", productCount: 150, order: 1 },
  { id: "hair-cond",  name: "Conditioner",     slug: "conditioner",     parentId: "hair", imageUrl: "/images/categories/placeholder.svg", emoji: "💆", productCount: 100, order: 2 },
  { id: "hair-treat", name: "Hair Treatments", slug: "hair-treatments", parentId: "hair", imageUrl: "/images/categories/placeholder.svg", emoji: "🧪", productCount: 110, order: 3 },
  { id: "hair-style", name: "Styling",         slug: "styling",         parentId: "hair", imageUrl: "/images/categories/placeholder.svg", emoji: "💁", productCount: 60,  order: 4 },

  // ─── Personal Care → Sub-Categories ───
  { id: "pc-deo",   name: "Deodorants",    slug: "deodorants",    parentId: "pc", imageUrl: "/images/categories/placeholder.svg", emoji: "🌸", productCount: 200, order: 1 },
  { id: "pc-bath",  name: "Bath & Shower", slug: "bath-shower",   parentId: "pc", imageUrl: "/images/categories/placeholder.svg", emoji: "🚿", productCount: 180, order: 2 },
  { id: "pc-shave", name: "Shaving",       slug: "shaving",       parentId: "pc", imageUrl: "/images/categories/placeholder.svg", emoji: "🪒", productCount: 120, order: 3 },
  { id: "pc-fem",   name: "Feminine Care", slug: "feminine-care", parentId: "pc", imageUrl: "/images/categories/placeholder.svg", emoji: "🌷", productCount: 90,  order: 4 },

  // ─── First Aid → Sub-Categories ───
  { id: "fa-band",  name: "Bandages",     slug: "bandages",     parentId: "fa", imageUrl: "/images/categories/placeholder.svg", emoji: "🩹", productCount: 50, order: 1 },
  { id: "fa-anti",  name: "Antiseptics",  slug: "antiseptics",  parentId: "fa", imageUrl: "/images/categories/placeholder.svg", emoji: "🧴", productCount: 40, order: 2 },
  { id: "fa-therm", name: "Thermometers", slug: "thermometers", parentId: "fa", imageUrl: "/images/categories/placeholder.svg", emoji: "🌡️", productCount: 30, order: 3 },

  // ─── Dental Care → Sub-Categories ───
  { id: "dent-paste", name: "Toothpaste",    slug: "toothpaste",  parentId: "dent", imageUrl: "/images/categories/placeholder.svg", emoji: "🪥", productCount: 90, order: 1 },
  { id: "dent-brush", name: "Toothbrushes",  slug: "toothbrushes",parentId: "dent", imageUrl: "/images/categories/placeholder.svg", emoji: "🪥", productCount: 60, order: 2 },
  { id: "dent-wash",  name: "Mouthwash",     slug: "mouthwash",   parentId: "dent", imageUrl: "/images/categories/placeholder.svg", emoji: "💧", productCount: 50, order: 3 },
  { id: "dent-floss", name: "Floss & Picks", slug: "floss-picks", parentId: "dent", imageUrl: "/images/categories/placeholder.svg", emoji: "🧵", productCount: 30, order: 4 },
];

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
