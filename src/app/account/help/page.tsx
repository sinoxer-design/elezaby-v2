"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Mail, Search, User, Truck, Gift, Sparkles, Ticket, ShieldCheck, HelpCircle, Package, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── Support categories (like the Nahdi reference) ── */
const SUPPORT_CATEGORIES = [
  { id: "account", label: "Account Management", description: "Help with your account, profile, or app settings", icon: User },
  { id: "delivery", label: "Delivery", description: "Delivery related queries", icon: Truck },
  { id: "orders", label: "Orders & Returns", description: "Order issues, cancellations, refunds", icon: Package },
  { id: "payments", label: "Payments", description: "Payment methods, billing, invoices", icon: CreditCard },
  { id: "vouchers", label: "Gift Vouchers", description: "Redeem or check voucher balance", icon: Gift },
  { id: "insurance", label: "Insurance & Rx", description: "Prescription and insurance queries", icon: ShieldCheck },
];

const faqs = [
  {
    id: "faq-1",
    question: "How do I track my order?",
    answer: "You can track your order from the My Orders section in your account. Once your order is shipped, you will receive a tracking number via SMS and email.",
  },
  {
    id: "faq-2",
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery for non-pharmaceutical items in their original packaging. Prescription medications cannot be returned for safety reasons.",
  },
  {
    id: "faq-3",
    question: "How do I upload a prescription?",
    answer: "When adding a prescription-required product to your cart, you will be prompted to upload a photo of your prescription. You can also upload prescriptions from the cart page before checkout.",
  },
  {
    id: "faq-4",
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, cash on delivery (COD), and various digital wallets including Vodafone Cash, Orange Money, and Fawry.",
  },
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = React.useState<"open" | "closed">("open");
  const [searchQuery, setSearchQuery] = React.useState("");

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
          How can we help you?
        </h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your query here"
          className="w-full rounded-xl border border-sand-200 bg-sand-50 py-2.5 pe-3 ps-9 text-sm placeholder:text-sand-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* Tickets tabs */}
      <div className="flex rounded-xl border border-sand-200 bg-white overflow-hidden">
        <button
          onClick={() => setActiveTab("open")}
          className={cn(
            "flex-1 py-2.5 text-sm font-semibold transition-colors",
            activeTab === "open" ? "bg-brand-50 text-brand-700" : "text-sand-500"
          )}
        >
          Open Tickets
        </button>
        <button
          onClick={() => setActiveTab("closed")}
          className={cn(
            "flex-1 py-2.5 text-sm font-semibold transition-colors",
            activeTab === "closed" ? "bg-brand-50 text-brand-700" : "text-sand-500"
          )}
        >
          Closed Tickets
        </button>
      </div>

      {/* Empty tickets state */}
      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-brand-100 py-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
          <Ticket className="h-5 w-5 text-brand-400" />
        </div>
        <p className="text-sm font-medium text-sand-600">
          No {activeTab === "open" ? "Open" : "Closed"} tickets found
        </p>
      </div>

      {/* Support categories grid */}
      <div>
        <h2 className="text-base font-bold text-sand-800">
          Need help? We&apos;ve got your back
        </h2>
        <p className="mt-0.5 text-xs text-sand-500">
          Perhaps you can find answers in our collections
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {SUPPORT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="flex flex-col items-start gap-2.5 rounded-xl border border-sand-200 bg-white p-3.5 text-start transition-colors hover:border-sand-300 hover:bg-sand-50 active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100">
                <cat.icon className="h-5 w-5 text-sand-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-sand-800">{cat.label}</p>
                <p className="mt-0.5 text-[0.65rem] leading-snug text-sand-500">{cat.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="text-sm font-semibold text-sand-800">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-2">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-sm text-sand-700 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-sand-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Contact — Email only */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="text-sm font-semibold text-sand-800">Contact Us</h2>
        <a
          href="mailto:support@elezaby.com"
          className="mt-3 flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-sand-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
            <Mail className="h-4 w-4 text-brand-500" />
          </div>
          <div>
            <span className="text-sm font-medium text-sand-700">Email</span>
            <p className="text-xs text-sand-400">support@elezaby.com</p>
          </div>
        </a>
      </div>
    </div>
  );
}
