"use client";

import * as React from"react";
import Link from"next/link";
import { useRouter } from"next/navigation";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from"lucide-react";

export default function SignInPage() {
 const router = useRouter();
 const [email, setEmail] = React.useState("");
 const [password, setPassword] = React.useState("");
 const [showPassword, setShowPassword] = React.useState(false);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 // TODO: integrate with auth backend
 router.push("/account");
 };

 return (
 <div className="flex flex-col gap-6 px-[var(--page-padding-x)] py-4 max-w-lg mx-auto">
 {/* Back Button */}
 <button
 onClick={() => router.push("/account")}
 className="flex items-center gap-1.5 text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
 >
 <ArrowLeft className="h-4 w-4" />
 Back
 </button>

 {/* Header */}
 <div>
 <h1 className="text-2xl font-bold text-sand-800">Welcome Back</h1>
 <p className="mt-1 text-sm text-sand-500">
 Sign in to your El Ezaby account
 </p>
 </div>

 {/* Form */}
 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
 placeholder="Enter your password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
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

 {/* Forgot Password */}
 <div className="flex justify-end">
 <Link
 href="#"
 className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
 >
 Forgot password?
 </Link>
 </div>

 {/* Sign In Button */}
 <Button
 type="submit"
 variant="default"
 size="pdp-cta"
 className="mt-2"
 >
 Sign In
 </Button>
 </form>

 {/* Register Link */}
 <p className="text-center text-sm text-sand-500">
 Don&apos;t have an account?{""}
 <Link
 href="/auth/register"
 className="font-semibold text-brand-500 transition-colors hover:text-brand-600"
 >
 Register
 </Link>
 </p>
 </div>
 );
}
