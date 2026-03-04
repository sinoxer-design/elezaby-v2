"use client";

import * as React from"react";
import Link from"next/link";
import { ChevronLeft } from"lucide-react";
import { cn } from"@/lib/utils";

export default function SettingsPage() {
 const [language, setLanguage] = React.useState<"en" |"ar">("en");
 const [pushNotifications, setPushNotifications] = React.useState(true);
 const [emailNotifications, setEmailNotifications] = React.useState(true);
 const [smsNotifications, setSmsNotifications] = React.useState(false);

 return (
 <div className="flex flex-col gap-4 px-[var(--page-padding-x)] py-4 max-w-lg mx-auto lg:max-w-2xl lg:px-0">
 {/* Header */}
 <div className="flex items-center gap-3">
 <Link
 href="/account"
 className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
 >
 <ChevronLeft className="h-5 w-5 text-sand-600" />
 </Link>
 <h1 className="text-lg font-semibold text-sand-800">Settings</h1>
 </div>

 {/* Language Section */}
 <div className="rounded-xl bg-white p-4 shadow-card">
 <h2 className="text-sm font-semibold text-sand-800">Language</h2>
 <div className="mt-3 flex gap-2">
 <button
 onClick={() => setLanguage("en")}
 className={cn(
"flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
 language ==="en"
 ?"bg-brand-500 text-white shadow-sm"
 :"bg-sand-100 text-sand-600 hover:bg-sand-200"
 )}
 >
 English
 </button>
 <button
 onClick={() => setLanguage("ar")}
 className={cn(
"flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
 language ==="ar"
 ?"bg-brand-500 text-white shadow-sm"
 :"bg-sand-100 text-sand-600 hover:bg-sand-200"
 )}
 >
 العربية
 </button>
 </div>
 </div>

 {/* Notifications Section */}
 <div className="rounded-xl bg-white p-4 shadow-card">
 <h2 className="text-sm font-semibold text-sand-800">Notifications</h2>
 <div className="mt-3 flex flex-col gap-1">
 <label className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-2.5 transition-colors hover:bg-sand-50">
 <span className="text-sm text-sand-600">Push notifications</span>
 <input
 type="checkbox"
 checked={pushNotifications}
 onChange={(e) => setPushNotifications(e.target.checked)}
 className="h-4 w-4 rounded border-sand-300 text-brand-500 accent-brand-500 focus:ring-brand-400"
 />
 </label>
 <label className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-2.5 transition-colors hover:bg-sand-50">
 <span className="text-sm text-sand-600">Email notifications</span>
 <input
 type="checkbox"
 checked={emailNotifications}
 onChange={(e) => setEmailNotifications(e.target.checked)}
 className="h-4 w-4 rounded border-sand-300 text-brand-500 accent-brand-500 focus:ring-brand-400"
 />
 </label>
 <label className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-2.5 transition-colors hover:bg-sand-50">
 <span className="text-sm text-sand-600">SMS notifications</span>
 <input
 type="checkbox"
 checked={smsNotifications}
 onChange={(e) => setSmsNotifications(e.target.checked)}
 className="h-4 w-4 rounded border-sand-300 text-brand-500 accent-brand-500 focus:ring-brand-400"
 />
 </label>
 </div>
 </div>

 {/* Delete Account */}
 <div className="pt-4">
 <button className="text-sm font-medium text-discount transition-colors hover:text-red-700">
 Delete Account
 </button>
 </div>
 </div>
 );
}
