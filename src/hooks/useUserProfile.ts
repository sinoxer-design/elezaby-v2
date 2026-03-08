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

export interface UserProfile {
  // Demographics
  age?: number;
  gender?: "male" | "female" | "other";
  healthConditions?: string[];
  profileDismissedAt?: string; // ISO date — re-show alert after 24h

  // Insurance
  insurance?: InsuranceData;
}

export interface UserProfileContextValue {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  uploadInsurance: (data: InsuranceData) => void;
  removeInsurance: () => void;
  isProfileComplete: boolean;
  completionPercentage: number;
  isInsuranceCovered: (categoryId?: string) => boolean;
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
  const coveredCategorySet = useMemo(() => {
    if (!profile.insurance?.coveredCategories) return new Set<string>();
    const allIds = new Set<string>();
    for (const catId of profile.insurance.coveredCategories) {
      for (const id of getCategoryAndDescendantIds(catId)) {
        allIds.add(id);
      }
    }
    return allIds;
  }, [profile.insurance?.coveredCategories]);

  const isInsuranceCovered = useCallback(
    (categoryId?: string) => {
      if (!categoryId || !profile.insurance) return false;
      return coveredCategorySet.has(categoryId);
    },
    [coveredCategorySet, profile.insurance]
  );

  return {
    profile,
    updateProfile,
    uploadInsurance,
    removeInsurance,
    isProfileComplete,
    completionPercentage,
    isInsuranceCovered,
  };
}
