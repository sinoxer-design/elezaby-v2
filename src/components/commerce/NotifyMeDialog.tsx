"use client";

import * as React from"react";
import { Bell, CheckCircle2 } from"lucide-react";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
} from"@/components/ui/dialog";

interface NotifyMeDialogProps {
 open: boolean;
 onOpenChange: (open: boolean) => void;
 productName: string;
 onSubmit: (email: string) => void;
}

export function NotifyMeDialog({
 open,
 onOpenChange,
 productName,
 onSubmit,
}: NotifyMeDialogProps) {
 const [email, setEmail] = React.useState("");
 const [isSubmitting, setIsSubmitting] = React.useState(false);
 const [isSuccess, setIsSuccess] = React.useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email) return;
 setIsSubmitting(true);
 // Simulate API call
 await new Promise((resolve) => setTimeout(resolve, 600));
 setIsSubmitting(false);
 setIsSuccess(true);
 onSubmit(email);
 };

 const handleOpenChange = (nextOpen: boolean) => {
 onOpenChange(nextOpen);
 if (!nextOpen) {
 // Reset state after close animation
 setTimeout(() => {
 setEmail("");
 setIsSubmitting(false);
 setIsSuccess(false);
 }, 300);
 }
 };

 return (
 <Dialog open={open} onOpenChange={handleOpenChange}>
 <DialogContent className="rounded-xl sm:max-w-md">
 {isSuccess ? (
 /* Success State */
 <div className="flex flex-col items-center gap-3 py-4">
 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
 <CheckCircle2 className="h-7 w-7 text-brand-500" />
 </div>
 <h3 className="text-lg font-semibold text-sand-800">
 You'll be notified!
 </h3>
 <p className="text-center text-sm text-sand-500">
 We'll send a notification to{""}
 <span className="font-medium text-sand-700">{email}</span> when{""}
 <span className="font-medium text-sand-700">{productName}</span>{""}
 is back in stock.
 </p>
 <Button
 variant="outline"
 size="default"
 onClick={() => handleOpenChange(false)}
 className="mt-2 rounded-xl"
 >
 Close
 </Button>
 </div>
 ) : (
 /* Form State */
 <>
 <DialogHeader className="items-center text-center">
 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-100">
 <Bell className="h-6 w-6 text-sand-600" />
 </div>
 <DialogTitle className="text-lg font-semibold text-sand-800">
 Get Notified
 </DialogTitle>
 <DialogDescription className="text-sm text-sand-500">
 We'll notify you when{""}
 <span className="font-medium text-sand-700">
 {productName}
 </span>{""}
 is back in stock
 </DialogDescription>
 </DialogHeader>

 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 <div>
 <label
 htmlFor="notify-email"
 className="mb-1.5 block text-sm font-medium text-sand-600"
 >
 Email address
 </label>
 <Input
 id="notify-email"
 type="email"
 placeholder="your@email.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="rounded-xl border-sand-200 bg-sand-50 focus-visible:border-brand-500 focus-visible:ring-brand-500/20"
 />
 </div>

 <Button
 type="submit"
 variant="add-to-cart"
 size="pdp-cta"
 disabled={!email || isSubmitting}
 className="rounded-xl"
 >
 {isSubmitting ?"Submitting..." :"Notify Me"}
 </Button>
 </form>
 </>
 )}
 </DialogContent>
 </Dialog>
 );
}
