"use client";

import * as React from"react";
import Link from"next/link";
import {
 ArrowLeft,
 Upload,
 ShieldCheck,
 FileText,
 ImageIcon,
 Trash2,
 Check,
} from"lucide-react";
import { Button } from"@/components/ui/button";
import { useUserProfile, type InsuranceData } from"@/hooks/useUserProfile";
import { insuranceCoveredCategoryIds } from"@/lib/mock-data";
import { cn } from"@/lib/utils";

const insuranceProviders = [
"MetLife",
"AXA Egypt",
"Allianz",
"Bupa",
"MedGulf",
"GlobeMed",
];

const coveredCategoryLabels: Record<string, string> = {
"med-pain":"Pain Relief",
"med-anti":"Antibiotics",
"vit-multi":"Multivitamins",
};

export default function InsurancePage() {
 const { profile, uploadInsurance, removeInsurance } = useUserProfile();

 const [provider, setProvider] = React.useState(
 profile.insurance?.provider ||""
 );
 const [policyNumber, setPolicyNumber] = React.useState(
 profile.insurance?.policyNumber ||""
 );
 const [documentUrl, setDocumentUrl] = React.useState(
 profile.insurance?.documentUrl ||""
 );
 const [documentType, setDocumentType] = React.useState<"pdf" |"image">(
 profile.insurance?.documentType ||"image"
 );
 const [saved, setSaved] = React.useState(false);

 const hasInsurance = !!profile.insurance;

 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;
 // Mock: Create a fake URL for demo
 const url = URL.createObjectURL(file);
 setDocumentUrl(url);
 setDocumentType(file.type.includes("pdf") ?"pdf" :"image");
 };

 const handleSave = () => {
 if (!provider || !policyNumber) return;
 const data: InsuranceData = {
 provider,
 policyNumber,
 documentUrl: documentUrl || undefined,
 documentType: documentUrl ? documentType : undefined,
 coveredCategories: insuranceCoveredCategoryIds,
 uploadedAt: new Date().toISOString(),
 };
 uploadInsurance(data);
 setSaved(true);
 setTimeout(() => setSaved(false), 2000);
 };

 const handleRemove = () => {
 removeInsurance();
 setProvider("");
 setPolicyNumber("");
 setDocumentUrl("");
 };

 return (
 <div className="px-[var(--page-padding-x)] py-4 lg:py-8">
 <div className="mx-auto max-w-lg">
 {/* Back Button */}
 <Link
 href="/account"
 className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sand-500 hover:text-sand-700 transition-colors"
 >
 <ArrowLeft className="h-4 w-4" />
 Back to Account
 </Link>

 {/* Header */}
 <div className="mb-6">
 <div className="flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
 <ShieldCheck className="h-5 w-5 text-emerald-600" />
 </div>
 <div>
 <h1 className="font-display text-xl font-bold text-sand-800">
 Health Insurance
 </h1>
 <p className="text-sm text-sand-500">
 {hasInsurance
 ?"Your insurance is active"
 :"Upload your insurance for coverage"}
 </p>
 </div>
 </div>
 </div>

 {/* Status Banner */}
 {hasInsurance && (
 <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4">
 <ShieldCheck className="h-5 w-5 text-emerald-600" />
 <div>
 <p className="text-sm font-semibold text-emerald-800">
 Insurance Active — {profile.insurance?.provider}
 </p>
 <p className="text-xs text-emerald-600">
 Policy #{profile.insurance?.policyNumber}
 </p>
 </div>
 </div>
 )}

 {/* Provider */}
 <div className="mb-5">
 <label className="mb-2 block text-sm font-semibold text-sand-700">
 Insurance Provider
 </label>
 <select
 value={provider}
 onChange={(e) => setProvider(e.target.value)}
 className="h-11 w-full rounded-lg border border-sand-200 bg-white px-4 text-sm text-sand-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors"
 >
 <option value="">Select provider...</option>
 {insuranceProviders.map((p) => (
 <option key={p} value={p}>
 {p}
 </option>
 ))}
 </select>
 </div>

 {/* Policy Number */}
 <div className="mb-5">
 <label className="mb-2 block text-sm font-semibold text-sand-700">
 Policy Number
 </label>
 <input
 type="text"
 value={policyNumber}
 onChange={(e) => setPolicyNumber(e.target.value)}
 placeholder="e.g. POL-2024-XXXXX"
 className="h-11 w-full rounded-lg border border-sand-200 bg-white px-4 text-sm text-sand-800 placeholder:text-sand-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors"
 />
 </div>

 {/* File Upload */}
 <div className="mb-6">
 <label className="mb-2 block text-sm font-semibold text-sand-700">
 Insurance Document
 </label>
 {documentUrl ? (
 <div className="flex items-center gap-3 rounded-xl border border-sand-200 bg-white p-4">
 {documentType ==="pdf" ? (
 <FileText className="h-8 w-8 text-deal" />
 ) : (
 <ImageIcon className="h-8 w-8 text-brand-500" />
 )}
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-sand-700 truncate">
 Insurance Document
 </p>
 <p className="text-xs text-sand-400">
 {documentType ==="pdf" ?"PDF Document" :"Image File"}
 </p>
 </div>
 <button
 onClick={() => setDocumentUrl("")}
 className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sand-100 text-sand-400 transition-colors"
 >
 <Trash2 className="h-4 w-4" />
 </button>
 </div>
 ) : (
 <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-sand-300 p-8 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/50">
 <Upload className="h-8 w-8 text-sand-400" />
 <div>
 <p className="text-sm font-medium text-sand-600">
 Upload insurance document
 </p>
 <p className="mt-0.5 text-xs text-sand-400">
 PDF or Image (max 10MB)
 </p>
 </div>
 <input
 type="file"
 accept="image/*,.pdf"
 onChange={handleFileUpload}
 className="hidden"
 />
 </label>
 )}
 </div>

 {/* What's Covered */}
 <div className="mb-8">
 <h3 className="mb-3 text-sm font-semibold text-sand-700">
 What&apos;s Covered
 </h3>
 <div className="flex flex-wrap gap-2">
 {insuranceCoveredCategoryIds.map((catId) => (
 <span
 key={catId}
 className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-700"
 >
 <ShieldCheck className="h-3 w-3" />
 {coveredCategoryLabels[catId] || catId}
 </span>
 ))}
 </div>
 <p className="mt-2 text-xs text-sand-400">
 Products in covered categories will show an &quot;Insured&quot; badge
 </p>
 </div>

 {/* Save Button */}
 <Button
 onClick={handleSave}
 disabled={!provider || !policyNumber}
 className="w-full h-12 text-sm font-semibold"
 >
 {saved ? (
 <span className="flex items-center gap-2">
 <Check className="h-4 w-4" />
 Saved!
 </span>
 ) : hasInsurance ? (
"Update Insurance"
 ) : (
"Save Insurance"
 )}
 </Button>

 {/* Remove Insurance */}
 {hasInsurance && (
 <button
 onClick={handleRemove}
 className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-sand-200 px-4 py-3 text-sm font-medium text-deal transition-colors hover:bg-red-50"
 >
 <Trash2 className="h-4 w-4" />
 Remove Insurance
 </button>
 )}
 </div>
 </div>
 );
}
