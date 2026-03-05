"use client";

import * as React from"react";
import Link from"next/link";
import { ArrowLeft, Shield, Check } from"lucide-react";
import { Button } from"@/components/ui/button";
import { useUserProfile } from"@/hooks/useUserProfile";
import { cn } from"@/lib/utils";

const healthConditionOptions = [
"Diabetes",
"Hypertension",
"Heart Disease",
"Pregnancy",
"Allergies",
"None",
];

export default function ProfilePage() {
 const { profile, updateProfile, completionPercentage, isProfileComplete } =
 useUserProfile();

 const [age, setAge] = React.useState<string>(
 profile.age ? String(profile.age) :""
 );
 const [gender, setGender] = React.useState<string>(profile.gender ||"");
 const [conditions, setConditions] = React.useState<string[]>(
 profile.healthConditions || []
 );
 const [saved, setSaved] = React.useState(false);

 const handleConditionToggle = (condition: string) => {
 setConditions((prev) => {
 if (condition ==="None") return ["None"];
 const without = prev.filter((c) => c !=="None");
 return without.includes(condition)
 ? without.filter((c) => c !== condition)
 : [...without, condition];
 });
 };

 const handleSave = () => {
 updateProfile({
 age: age ? parseInt(age, 10) : undefined,
 gender: gender as"male" |"female" |"other" | undefined,
 healthConditions: conditions.length > 0 ? conditions : undefined,
 });
 setSaved(true);
 setTimeout(() => setSaved(false), 2000);
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
 <h1 className="font-display text-xl font-bold text-sand-800">
 My Profile
 </h1>
 <p className="mt-1 text-sm text-sand-500">
 Help us personalize your experience
 </p>

 {/* Progress */}
 <div className="mt-4 flex items-center gap-3">
 <div className="flex-1 h-2 rounded-full bg-sand-100 overflow-hidden">
 <div
 className="h-full rounded-full bg-gradient-to-r from-brand-600 to-cyan-500 transition-all duration-500"
 style={{ width: `${completionPercentage}%` }}
 />
 </div>
 <span className="text-xs font-bold text-brand-600 tabular-nums">
 {completionPercentage}%
 </span>
 </div>
 </div>

 {/* Age */}
 <div className="mb-6">
 <label className="mb-2 block text-sm font-semibold text-sand-700">
 Age
 </label>
 <input
 type="number"
 value={age}
 onChange={(e) => setAge(e.target.value)}
 placeholder="Enter your age"
 min={1}
 max={120}
 className="h-11 w-full rounded-lg border border-sand-200 bg-white px-4 text-sm text-sand-800 placeholder:text-sand-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors"
 />
 </div>

 {/* Gender */}
 <div className="mb-6">
 <label className="mb-2 block text-sm font-semibold text-sand-700">
 Gender
 </label>
 <div className="flex gap-2">
 {(["male","female","other"] as const).map((g) => (
 <button
 key={g}
 onClick={() => setGender(g)}
 className={cn(
"flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium capitalize transition-all",
 gender === g
 ?"border-brand-400 bg-brand-50 text-brand-700"
 :"border-sand-200 bg-white text-sand-600 hover:border-sand-300"
 )}
 >
 {g}
 </button>
 ))}
 </div>
 </div>

 {/* Health Conditions */}
 <div className="mb-6">
 <label className="mb-2 block text-sm font-semibold text-sand-700">
 Health Conditions
 </label>
 <p className="mb-3 text-xs text-sand-400">
 Select any that apply for better product recommendations
 </p>
 <div className="flex flex-wrap gap-2">
 {healthConditionOptions.map((condition) => {
 const isSelected = conditions.includes(condition);
 return (
 <button
 key={condition}
 onClick={() => handleConditionToggle(condition)}
 className={cn(
"flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all",
 isSelected
 ?"border-brand-400 bg-brand-50 text-brand-700"
 :"border-sand-200 bg-white text-sand-600 hover:border-sand-300"
 )}
 >
 {isSelected && <Check className="h-3.5 w-3.5" />}
 {condition}
 </button>
 );
 })}
 </div>
 </div>

 {/* Insurance Link */}
 <div className="mb-8">
 <Link
 href="/account/insurance"
 className="flex items-center gap-3 rounded-xl border border-sand-200 bg-white p-4 transition-all hover:shadow-card"
 >
 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
 <Shield className="h-5 w-5 text-emerald-600" />
 </div>
 <div className="flex-1">
 <span className="text-sm font-semibold text-sand-800">
 Health Insurance
 </span>
 <p className="text-xs text-sand-400">
 {profile.insurance
 ? `${profile.insurance.provider} — Active`
 :"Upload your insurance for coverage"}
 </p>
 </div>
 </Link>
 </div>

 {/* Save Button */}
 <Button onClick={handleSave} className="w-full h-12 text-sm font-semibold">
 {saved ? (
 <span className="flex items-center gap-2">
 <Check className="h-4 w-4" />
 Saved!
 </span>
 ) : (
"Save Profile"
 )}
 </Button>

 {isProfileComplete && (
 <p className="mt-4 text-center text-xs font-medium text-emerald-600">
 ✓ Profile complete — you'll now get personalized recommendations!
 </p>
 )}
 </div>
 </div>
 );
}
