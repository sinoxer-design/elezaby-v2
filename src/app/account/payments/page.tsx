"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface PaymentMethod {
  id: string;
  type: string;
  lastFour: string;
  expires: string;
  cardholderName: string;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "Visa",
    lastFour: "4242",
    expires: "12/27",
    cardholderName: "Ahmed Mohamed",
  },
];

export default function PaymentsPage() {
  const [methods, setMethods] =
    React.useState<PaymentMethod[]>(initialPaymentMethods);

  // Add / Edit dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardholderName, setCardholderName] = React.useState("");

  // Remove confirmation dialog
  const [removeId, setRemoveId] = React.useState<string | null>(null);

  const openAddDialog = () => {
    setEditingId(null);
    setCardNumber("");
    setCardExpiry("");
    setCardholderName("");
    setDialogOpen(true);
  };

  const openEditDialog = (method: PaymentMethod) => {
    setEditingId(method.id);
    setCardNumber(`**** **** **** ${method.lastFour}`);
    setCardExpiry(method.expires);
    setCardholderName(method.cardholderName);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing
      setMethods((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? {
                ...m,
                lastFour: cardNumber.replace(/[\s*]/g, "").slice(-4) || m.lastFour,
                expires: cardExpiry || m.expires,
                cardholderName: cardholderName || m.cardholderName,
              }
            : m
        )
      );
    } else {
      // Add new
      const lastFour = cardNumber.replace(/\s/g, "").slice(-4) || "0000";
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: "Visa",
        lastFour,
        expires: cardExpiry,
        cardholderName,
      };
      setMethods((prev) => [...prev, newMethod]);
    }
    setDialogOpen(false);
  };

  const handleRemove = () => {
    if (removeId) {
      setMethods((prev) => prev.filter((m) => m.id !== removeId));
      setRemoveId(null);
    }
  };

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
        <h1 className="text-lg font-semibold text-sand-800">
          Payment Methods
        </h1>
      </div>

      {/* Payment Cards */}
      <div className="flex flex-col gap-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="rounded-xl bg-white p-4 shadow-card"
          >
            <div className="flex items-center gap-3">
              {/* Card Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                <CreditCard className="h-5 w-5 text-brand-500" />
              </div>

              {/* Card Info */}
              <div className="flex-1">
                <span className="text-sm font-semibold text-sand-800">
                  {method.type} ending in {method.lastFour}
                </span>
                <p className="text-xs text-sand-400">
                  Expires {method.expires}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2 border-t border-sand-100 pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-500"
                onClick={() => openEditDialog(method)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sand-400"
                onClick={() => setRemoveId(method.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Payment Method */}
      <Button
        variant="outline"
        className="border-brand-500 text-brand-500 hover:bg-brand-50"
        onClick={openAddDialog}
      >
        <Plus className="h-4 w-4" />
        Add Payment Method
      </Button>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Payment Method" : "Add Payment Method"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update your card details below."
                : "Enter your card details to add a new payment method."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="pm-card-number"
                className="text-sm font-medium text-sand-700"
              >
                Card Number
              </label>
              <Input
                id="pm-card-number"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="pm-expiry"
                className="text-sm font-medium text-sand-700"
              >
                Expiry Date
              </label>
              <Input
                id="pm-expiry"
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                maxLength={5}
                className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="pm-name"
                className="text-sm font-medium text-sand-700"
              >
                Cardholder Name
              </label>
              <Input
                id="pm-name"
                type="text"
                placeholder="Ahmed Mohamed"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!cardNumber || !cardExpiry || !cardholderName}
              className="bg-brand-500 text-white hover:bg-brand-600"
            >
              {editingId ? "Save Changes" : "Add Card"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <Dialog open={removeId !== null} onOpenChange={(open) => !open && setRemoveId(null)}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Remove this card?</DialogTitle>
            <DialogDescription>
              This payment method will be permanently removed from your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
