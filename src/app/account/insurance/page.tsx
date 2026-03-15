"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  ShieldCheck,
  FileText,
  ImageIcon,
  Trash2,
  Check,
  Plus,
  Users,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useUserProfile,
  type InsuranceData,
  type FamilyInsuranceProfile,
} from "@/hooks/useUserProfile";
import { insuranceCoveredCategoryIds } from "@/lib/data/insurance";
import { cn } from "@/lib/utils";

const insuranceProviders = [
  "MetLife",
  "AXA Egypt",
  "Allianz",
  "Bupa",
  "MedGulf",
  "GlobeMed",
];

const coveredCategoryLabels: Record<string, string> = {
  "med-pain": "Pain Relief",
  "med-anti": "Antibiotics",
  "vit-multi": "Multivitamins",
};

const familyRelations = [
  "Spouse",
  "Mother",
  "Father",
  "Daughter",
  "Son",
  "Sister",
  "Brother",
  "Other",
];

// ── Reusable Insurance Form ──────────────────────────────────────

function InsuranceForm({
  provider,
  setProvider,
  policyNumber,
  setPolicyNumber,
  documentUrl,
  setDocumentUrl,
  documentType,
  setDocumentType,
  onSave,
  onRemove,
  saveLabel,
  saved,
  hasExisting,
}: {
  provider: string;
  setProvider: (v: string) => void;
  policyNumber: string;
  setPolicyNumber: (v: string) => void;
  documentUrl: string;
  setDocumentUrl: (v: string) => void;
  documentType: "pdf" | "image";
  setDocumentType: (v: "pdf" | "image") => void;
  onSave: () => void;
  onRemove?: () => void;
  saveLabel: string;
  saved: boolean;
  hasExisting: boolean;
}) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDocumentUrl(url);
    setDocumentType(file.type.includes("pdf") ? "pdf" : "image");
  };

  return (
    <div className="space-y-4">
      {/* Provider */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-sand-700">
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
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-sand-700">
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
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-sand-700">
          Insurance Document
        </label>
        {documentUrl ? (
          <div className="flex items-center gap-3 rounded-xl border border-sand-200 bg-white p-3">
            {documentType === "pdf" ? (
              <FileText className="h-7 w-7 text-deal" />
            ) : (
              <ImageIcon className="h-7 w-7 text-brand-500" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sand-700 truncate">
                Insurance Document
              </p>
              <p className="text-xs text-sand-400">
                {documentType === "pdf" ? "PDF Document" : "Image File"}
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
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-sand-300 p-4 transition-colors hover:border-brand-400 hover:bg-brand-50/50">
            <Upload className="h-5 w-5 text-sand-400" />
            <div>
              <p className="text-sm font-medium text-sand-600">
                Upload insurance document
              </p>
              <p className="text-xs text-sand-400">PDF or Image (max 10MB)</p>
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

      {/* Save / Remove */}
      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          onClick={onSave}
          disabled={!provider || !policyNumber}
          className="flex-1 h-11 text-sm font-semibold"
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Saved!
            </span>
          ) : (
            saveLabel
          )}
        </Button>
        {hasExisting && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-sand-200 text-deal transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────

export default function InsurancePage() {
  const {
    profile,
    uploadInsurance,
    removeInsurance,
    addFamilyInsurance,
    updateFamilyInsurance,
    removeFamilyInsurance,
  } = useUserProfile();

  // ── Self insurance state ──
  const [provider, setProvider] = React.useState(
    profile.insurance?.provider || ""
  );
  const [policyNumber, setPolicyNumber] = React.useState(
    profile.insurance?.policyNumber || ""
  );
  const [documentUrl, setDocumentUrl] = React.useState(
    profile.insurance?.documentUrl || ""
  );
  const [documentType, setDocumentType] = React.useState<"pdf" | "image">(
    profile.insurance?.documentType || "image"
  );
  const [saved, setSaved] = React.useState(false);

  // ── Add family member form state ──
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newRelation, setNewRelation] = React.useState("");
  const [newMemberName, setNewMemberName] = React.useState("");
  const [newProvider, setNewProvider] = React.useState("");
  const [newPolicyNumber, setNewPolicyNumber] = React.useState("");
  const [newDocumentUrl, setNewDocumentUrl] = React.useState("");
  const [newDocumentType, setNewDocumentType] = React.useState<"pdf" | "image">("image");
  const [newSaved, setNewSaved] = React.useState(false);

  // ── Expanded family cards ──
  const [expandedFamily, setExpandedFamily] = React.useState<string | null>(null);

  const hasInsurance = !!profile.insurance;
  const familyMembers = profile.familyInsurance ?? [];

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

  const handleAddFamilyMember = () => {
    if (!newRelation || !newMemberName || !newProvider || !newPolicyNumber)
      return;

    const member: FamilyInsuranceProfile = {
      id: `fam-${Date.now()}`,
      label: newRelation,
      memberName: newMemberName,
      insurance: {
        provider: newProvider,
        policyNumber: newPolicyNumber,
        documentUrl: newDocumentUrl || undefined,
        documentType: newDocumentUrl ? newDocumentType : undefined,
        coveredCategories: insuranceCoveredCategoryIds,
        uploadedAt: new Date().toISOString(),
      },
    };

    addFamilyInsurance(member);
    setNewSaved(true);
    setTimeout(() => {
      setNewSaved(false);
      setShowAddForm(false);
      setNewRelation("");
      setNewMemberName("");
      setNewProvider("");
      setNewPolicyNumber("");
      setNewDocumentUrl("");
    }, 1200);
  };

  const handleRemoveFamilyMember = (id: string) => {
    removeFamilyInsurance(id);
    if (expandedFamily === id) setExpandedFamily(null);
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
                Manage insurance for yourself and family members
              </p>
            </div>
          </div>
        </div>

        {/* ═══════ MY INSURANCE (Self) ═══════ */}
        <section className="mb-6 rounded-xl border border-sand-200 bg-white overflow-hidden">
          <div className="flex items-center gap-3 border-b border-sand-100 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50">
              <User className="h-4 w-4 text-brand-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-sand-800">My Insurance</h2>
              {hasInsurance && (
                <p className="text-xs text-emerald-600">
                  {profile.insurance?.provider} — #{profile.insurance?.policyNumber}
                </p>
              )}
            </div>
            {hasInsurance && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.625rem] font-semibold text-emerald-700">
                <ShieldCheck className="h-3 w-3" />
                Active
              </span>
            )}
          </div>

          <div className="p-4">
            <InsuranceForm
              provider={provider}
              setProvider={setProvider}
              policyNumber={policyNumber}
              setPolicyNumber={setPolicyNumber}
              documentUrl={documentUrl}
              setDocumentUrl={setDocumentUrl}
              documentType={documentType}
              setDocumentType={setDocumentType}
              onSave={handleSave}
              onRemove={handleRemove}
              saveLabel={hasInsurance ? "Update Insurance" : "Save Insurance"}
              saved={saved}
              hasExisting={hasInsurance}
            />
          </div>
        </section>

        {/* ═══════ FAMILY MEMBERS ═══════ */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4.5 w-4.5 text-brand-600" />
            <h2 className="text-base font-bold text-sand-800">
              Family Members
            </h2>
            <span className="ml-auto text-xs text-sand-400">
              {familyMembers.length} {familyMembers.length === 1 ? "member" : "members"}
            </span>
          </div>

          {/* Existing family member cards */}
          <div className="space-y-3">
            {familyMembers.map((member) => {
              const isExpanded = expandedFamily === member.id;
              return (
                <div
                  key={member.id}
                  className="rounded-xl border border-sand-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedFamily(isExpanded ? null : member.id)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-sand-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50">
                      <User className="h-4 w-4 text-cyan-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-sand-800">
                        {member.memberName}
                      </p>
                      <p className="text-xs text-sand-400">
                        {member.label} — {member.insurance.provider}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.625rem] font-semibold text-emerald-700">
                      <ShieldCheck className="h-3 w-3" />
                      Active
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-sand-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-sand-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="border-t border-sand-100 px-4 py-3 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-sand-400">Provider</p>
                          <p className="font-medium text-sand-700">
                            {member.insurance.provider}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-sand-400">Policy #</p>
                          <p className="font-medium text-sand-700">
                            {member.insurance.policyNumber}
                          </p>
                        </div>
                      </div>

                      {/* Covered categories */}
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-sand-500">
                          Covered Categories
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {member.insurance.coveredCategories.map((catId) => (
                            <span
                              key={catId}
                              className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.625rem] font-medium text-emerald-700"
                            >
                              <ShieldCheck className="h-2.5 w-2.5" />
                              {coveredCategoryLabels[catId] || catId}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveFamilyMember(member.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-sand-200 px-3 py-2 text-xs font-medium text-deal transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove Member
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Family Member */}
          {!showAddForm ? (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand-300 bg-sand-50/50 px-4 py-3.5 text-sm font-semibold text-brand-600 transition-colors hover:border-brand-400 hover:bg-brand-50/50"
            >
              <Plus className="h-4 w-4" />
              Add Family Member
            </button>
          ) : (
            <div className="mt-3 rounded-xl border border-brand-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-sand-800">
                  New Family Member
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewRelation("");
                    setNewMemberName("");
                    setNewProvider("");
                    setNewPolicyNumber("");
                    setNewDocumentUrl("");
                  }}
                  className="text-xs font-medium text-sand-400 hover:text-sand-600"
                >
                  Cancel
                </button>
              </div>

              {/* Relation */}
              <div className="mb-3">
                <label className="mb-1.5 block text-sm font-semibold text-sand-700">
                  Relationship
                </label>
                <select
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="h-11 w-full rounded-lg border border-sand-200 bg-white px-4 text-sm text-sand-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors"
                >
                  <option value="">Select relationship...</option>
                  {familyRelations.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Member Name */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold text-sand-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Fatma Mohamed"
                  className="h-11 w-full rounded-lg border border-sand-200 bg-white px-4 text-sm text-sand-800 placeholder:text-sand-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors"
                />
              </div>

              <InsuranceForm
                provider={newProvider}
                setProvider={setNewProvider}
                policyNumber={newPolicyNumber}
                setPolicyNumber={setNewPolicyNumber}
                documentUrl={newDocumentUrl}
                setDocumentUrl={setNewDocumentUrl}
                documentType={newDocumentType}
                setDocumentType={setNewDocumentType}
                onSave={handleAddFamilyMember}
                saveLabel="Add Member"
                saved={newSaved}
                hasExisting={false}
              />
            </div>
          )}
        </section>

        {/* What's Covered */}
        <section className="rounded-xl border border-sand-200 bg-white p-4">
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
        </section>
      </div>
    </div>
  );
}
