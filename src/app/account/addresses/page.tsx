"use client";

import Link from"next/link";
import { ChevronLeft, MapPin, Plus } from"lucide-react";
import { Button } from"@/components/ui/button";
import { cn } from"@/lib/utils";

const addresses = [
 {
 id:"1",
 label:"Home",
 isDefault: true,
 address:"123 Tahrir Street, Apt 4B, Dokki, Giza",
 },
 {
 id:"2",
 label:"Work",
 isDefault: false,
 address:"45 Corniche El Nil, Garden City, Cairo",
 },
];

export default function AddressesPage() {
 return (
 <div className="flex flex-col gap-4 px-[var(--page-padding-x)] py-4">
 {/* Header */}
 <div className="flex items-center gap-3">
 <Link
 href="/account"
 className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
 >
 <ChevronLeft className="h-5 w-5 text-sand-600" />
 </Link>
 <h1 className="text-lg font-semibold text-sand-800">My Addresses</h1>
 </div>

 {/* Address Cards */}
 <div className="flex flex-col gap-3">
 {addresses.map((addr) => (
 <div
 key={addr.id}
 className={cn(
"rounded-xl bg-white p-4 shadow-card",
 addr.isDefault &&"ring-1 ring-brand-500"
 )}
 >
 {/* Label Row */}
 <div className="flex items-center gap-2">
 <MapPin className="h-4 w-4 text-brand-500" />
 <span className="text-sm font-semibold text-sand-800">
 {addr.label}
 </span>
 {addr.isDefault && (
 <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
 Default
 </span>
 )}
 </div>

 {/* Address */}
 <p className="mt-2 text-sm leading-relaxed text-sand-500">
 {addr.address}
 </p>

 {/* Actions */}
 <div className="mt-3 flex items-center gap-2 border-t border-sand-100 pt-3">
 <Button variant="ghost" size="sm" className="text-brand-500">
 Edit
 </Button>
 <Button variant="ghost" size="sm" className="text-sand-400">
 Delete
 </Button>
 </div>
 </div>
 ))}
 </div>

 {/* Add New Address */}
 <Button
 variant="outline"
 className="border-brand-500 text-brand-500 hover:bg-brand-50"
 >
 <Plus className="h-4 w-4" />
 Add New Address
 </Button>
 </div>
 );
}
