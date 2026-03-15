// ── Symptom Categories (Search by Symptom) ──────────────────────────

export interface SymptomCategory {
  id: string;
  name: string;
  nameAr: string;
  emoji: string;
  slug: string;
  color: string;
  relatedCategoryIds: string[];
}

export const mockSymptoms: SymptomCategory[] = [
  { id: "sym-headache", name: "Headache", nameAr: "\u0635\u062F\u0627\u0639", emoji: "\uD83E\uDD15", slug: "headache", color: "brand", relatedCategoryIds: ["med-pain-tab"] },
  { id: "sym-cold", name: "Cold & Flu", nameAr: "\u0628\u0631\u062F \u0648\u0625\u0646\u0641\u0644\u0648\u0646\u0632\u0627", emoji: "\uD83E\uDD27", slug: "cold-flu", color: "cyan", relatedCategoryIds: ["med-cold-dec", "med-cold-cgh"] },
  { id: "sym-stomach", name: "Stomach Ache", nameAr: "\u0623\u0644\u0645 \u0645\u0639\u062F\u0629", emoji: "\uD83E\uDD22", slug: "stomach-ache", color: "deal", relatedCategoryIds: ["med-dig-ant", "med-dig-lax"] },
  { id: "sym-allergy", name: "Allergies", nameAr: "\u062D\u0633\u0627\u0633\u064A\u0629", emoji: "\uD83C\uDF3F", slug: "allergies", color: "emerald", relatedCategoryIds: ["med-allergy"] },
  { id: "sym-fever", name: "Fever", nameAr: "\u062D\u0645\u0649", emoji: "\uD83C\uDF21\uFE0F", slug: "fever", color: "amber", relatedCategoryIds: ["med-pain-tab"] },
  { id: "sym-skin", name: "Skin Rash", nameAr: "\u0637\u0641\u062D \u062C\u0644\u062F\u064A", emoji: "\uD83E\uDE79", slug: "skin-rash", color: "purple", relatedCategoryIds: ["skin-treat-ser", "skin-treat-mask"] },
  { id: "sym-muscle", name: "Muscle Pain", nameAr: "\u0623\u0644\u0645 \u0639\u0636\u0644\u0627\u062A", emoji: "\uD83D\uDCAA", slug: "muscle-pain", color: "pink", relatedCategoryIds: ["med-pain-top"] },
  { id: "sym-fatigue", name: "Fatigue", nameAr: "\u0625\u0631\u0647\u0627\u0642", emoji: "\uD83D\uDE34", slug: "fatigue", color: "blue", relatedCategoryIds: ["vit-energy", "vit-multi-adult"] },
];
