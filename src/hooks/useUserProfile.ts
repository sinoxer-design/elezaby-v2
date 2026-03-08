"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { getCategoryAndDescendantIds } from "@/lib/categories";

// ── Types ──────────────────────────────────────────────────────────

export interface InsuranceData {
  provider: string;
  policyNumber: string;
  documentUrl?: string;
  documentType?: "pdf" | "image";
  coveredCategories: string[]; // category IDs covered by this plan
  uploadedAt: string;
}

export interface FamilyInsuranceProfile {
  id: string;
  label: string; // e.g. "Mother", "Daughter", "Son"
  memberName: string; // e.g. "Fatma Mohamed"
  insurance: InsuranceData;
}

export interface UserProfile {
  // Demographics
  age?: number;
  gender?: "male" | "female" | "other";
  healthConditions?: string[];
  profileDismissedAt?: string; // ISO date — re-show alert after 24h

  // Insurance — primary (self)
  insurance?: InsuranceData;

  // Family insurance profiles
  familyInsurance?: FamilyInsuranceProfile[];
}

export interface UserProfileContextValue {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  uploadInsurance: (data: InsuranceData) => void;
  removeInsurance: () => void;
  isProfileComplete: boolean;
  completionPercentage: number;
  isInsuranceCovered: (categoryId?: string) => boolean;

  // Family insurance
  addFamilyInsurance: (member: FamilyInsuranceProfile) => void;
  updateFamilyInsurance: (id: string, updates: Partial<FamilyInsuranceProfile>) => void;
  removeFamilyInsurance: (id: string) => void;
}

// ── Default values ─────────────────────────────────────────────────

const STORAGE_KEY = "elezaby-user-profile";

const DEFAULT_PROFILE: UserProfile = {};

const DEFAULT_CONTEXT: UserProfileContextValue = {
  profile: DEFAULT_PROFILE,
  updateProfile: () => {},
  uploadInsurance: () => {},
  removeInsurance: () => {},
  isProfileComplete: false,
  completionPercentage: 0,
  isInsuranceCovered: () => false,
  addFamilyInsurance: () => {},
  updateFamilyInsurance: () => {},
  removeFamilyInsurance: () => {},
};

// ── Context ────────────────────────────────────────────────────────

export const UserProfileContext =
  createContext<UserProfileContextValue>(DEFAULT_CONTEXT);

export function useUserProfile() {
  return useContext(UserProfileContext);
}

// ── State hook (wired into AppShell) ───────────────────────────────

function loadProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UserProfile;
  } catch {
    // ignore parse errors
  }
  return DEFAULT_PROFILE;
}

function persistProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore storage errors
  }
}

export function useUserProfileState(): UserProfileContextValue {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      persistProfile(next);
      return next;
    });
  }, []);

  const uploadInsurance = useCallback((data: InsuranceData) => {
    setProfile((prev) => {
      const next = { ...prev, insurance: data };
      persistProfile(next);
      return next;
    });
  }, []);

  const removeInsurance = useCallback(() => {
    setProfile((prev) => {
      const { insurance: _, ...rest } = prev;
      const next = rest;
      persistProfile(next);
      return next;
    });
  }, []);

  // ── Family insurance operations ─────────────────────────────────

  const addFamilyInsurance = useCallback((member: FamilyInsuranceProfile) => {
    setProfile((prev) => {
      const existing = prev.familyInsurance ?? [];
      const next = { ...prev, familyInsurance: [...existing, member] };
      persistProfile(next);
      return next;
    });
  }, []);

  const updateFamilyInsurance = useCallback(
    (id: string, updates: Partial<FamilyInsuranceProfile>) => {
      setProfile((prev) => {
        const existing = prev.familyInsurance ?? [];
        const next = {
          ...prev,
          familyInsurance: existing.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        };
        persistProfile(next);
        return next;
      });
    },
    []
  );

  const removeFamilyInsurance = useCallback((id: string) => {
    setProfile((prev) => {
      const existing = prev.familyInsurance ?? [];
      const next = {
        ...prev,
        familyInsurance: existing.filter((m) => m.id !== id),
      };
      persistProfile(next);
      return next;
    });
  }, []);

  // Completion: 4 sections × 25% each (age, gender, conditions, insurance)
  const completionPercentage = useMemo(() => {
    let pct = 0;
    if (profile.age) pct += 25;
    if (profile.gender) pct += 25;
    if (profile.healthConditions && profile.healthConditions.length > 0) pct += 25;
    if (profile.insurance) pct += 25;
    return pct;
  }, [profile]);

  const isProfileComplete = completionPercentage === 100;

  // Build a set of all covered category IDs (including descendants) for fast lookup
  // Combines self insurance + all family member insurance
  const coveredCategorySet = useMemo(() => {
    const allIds = new Set<string>();
    const allInsurance = [
      profile.insurance,
      ...(profile.familyInsurance?.map((m) => m.insurance) ?? []),
    ].filter(Boolean) as InsuranceData[];

    for (const ins of allInsurance) {
      for (const catId of ins.coveredCategories) {
        for (const id of getCategoryAndDescendantIds(catId)) {
          allIds.add(id);
        }
      }
    }
    return allIds;
  }, [profile.insurance, profile.familyInsurance]);

  const isInsuranceCovered = useCallback(
    (categoryId?: string) => {
      if (!categoryId) return false;
      if (!profile.insurance && (!profile.familyInsurance || profile.familyInsurance.length === 0)) return false;
      return coveredCategorySet.has(categoryId);
    },
    [coveredCategorySet, profile.insurance, profile.familyInsurance]
  );

  return {
    profile,
    updateProfile,
    uploadInsurance,
    removeInsurance,
    isProfileComplete,
    completionPercentage,
    isInsuranceCovered,
    addFamilyInsurance,
    updateFamilyInsurance,
    removeFamilyInsurance,
  };
}
