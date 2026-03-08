"use client";

import * as React from"react";
import Link from"next/link";
import { useRouter } from"next/navigation";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from"lucide-react";

export default function RegisterPage() {
 const router = useRouter();
 const [firstName, setFirstName] = React.useState("");
 const [lastName, setLastName] = React.useState("");
 const [email, setEmail] = React.useState("");
 const [phone, setPhone] = React.useState("");
 const [password, setPassword] = React.useState("");
 const [confirmPassword, setConfirmPassword] = React.useState("");
 const [showPassword, setShowPassword] = React.useState(false);
 const [showConfirm, setShowConfirm] = React.useState(false);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (password !== confirmPassword) {
 // TODO: show validation error
 return;
 }
 // TODO: integrate with auth backend
 router.push("/account");
 };

 return (
 <div className="flex flex-col gap-6 px-[var(--page-padding-x)] py-4 max-w-lg mx-auto">
 {/* Back Button */}
 <button
 onClick={() => router.back()}
 className="flex items-center gap-1.5 text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
 >
 <ArrowLeft className="h-4 w-4" />
 Back
 </button>

 {/* Header */}
 <div>
 <h1 className="text-2xl font-bold text-sand-800">Create Account</h1>
 <p className="mt-1 text-sm text-sand-500">
 Join Elezaby for a personalized pharmacy experience
 </p>
 </div>

 {/* Form */}
 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 {/* Name Row */}
 <div className="grid grid-cols-2 gap-3">
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="firstName"
 className="text-sm font-medium text-sand-700"
 >
 First Name
 </label>
 <Input
 id="firstName"
 type="text"
 placeholder="Ahmed"
 value={firstName}
 onChange={(e) => setFirstName(e.target.value)}
 required
 className="h-11 rounded-xl bg-white px-4 text-sm"
 />
 </div>
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="lastName"
 className="text-sm font-medium text-sand-700"
 >
 Last Name
 </label>
 <Input
 id="lastName"
 type="text"
 placeholder="Mohamed"
 value={lastName}
 onChange={(e) => setLastName(e.target.value)}
 required
 className="h-11 rounded-xl bg-white px-4 text-sm"
 />
 </div>
 </div>

 {/* Email */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="email"
 className="text-sm font-medium text-sand-700"
 >
 Email Address
 </label>
 <Input
 id="email"
 type="email"
 placeholder="you@example.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="h-11 rounded-xl bg-white px-4 text-sm"
 />
 </div>

 {/* Phone */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="phone"
 className="text-sm font-medium text-sand-700"
 >
 Phone Number
 </label>
 <Input
 id="phone"
 type="tel"
 placeholder="+20 1XX XXX XXXX"
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 required
 className="h-11 rounded-xl bg-white px-4 text-sm"
 />
 </div>

 {/* Password */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="password"
 className="text-sm font-medium text-sand-700"
 >
 Password
 </label>
 <div className="relative">
 <Input
 id="password"
 type={showPassword ?"text" :"password"}
 placeholder="Create a password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 minLength={8}
 className="h-11 rounded-xl bg-white pr-11 px-4 text-sm"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 transition-colors hover:text-sand-600"
 >
 {showPassword ? (
 <EyeOff className="h-4.5 w-4.5" />
 ) : (
 <Eye className="h-4.5 w-4.5" />
 )}
 </button>
 </div>
 </div>

 {/* Confirm Password */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="confirmPassword"
 className="text-sm font-medium text-sand-700"
 >
 Confirm Password
 </label>
 <div className="relative">
 <Input
 id="confirmPassword"
 type={showConfirm ?"text" :"password"}
 placeholder="Confirm your password"
 value={confirmPassword}
 onChange={(e) => setConfirmPassword(e.target.value)}
 required
 minLength={8}
 className="h-11 rounded-xl bg-white pr-11 px-4 text-sm"
 />
 <button
 type="button"
 onClick={() => setShowConfirm(!showConfirm)}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 transition-colors hover:text-sand-600"
 >
 {showConfirm ? (
 <EyeOff className="h-4.5 w-4.5" />
 ) : (
 <Eye className="h-4.5 w-4.5" />
 )}
 </button>
 </div>
 {password && confirmPassword && password !== confirmPassword && (
 <p className="text-xs font-medium text-discount">
 Passwords do not match
 </p>
 )}
 </div>

 {/* Create Account Button */}
 <Button
 type="submit"
 variant="default"
 size="pdp-cta"
 className="mt-2"
 >
 Create Account
 </Button>
 </form>

 {/* Sign In Link */}
 <p className="text-center text-sm text-sand-500">
 Already have an account?{""}
 <Link
 href="/auth/signin"
 className="font-semibold text-brand-500 transition-colors hover:text-brand-600"
 >
 Sign In
 </Link>
 </p>
 </div>
 );
}
