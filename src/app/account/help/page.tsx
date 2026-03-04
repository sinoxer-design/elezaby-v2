"use client";

import Link from"next/link";
import { ChevronLeft, Phone, Mail, MessageCircle } from"lucide-react";
import { Button } from"@/components/ui/button";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from"@/components/ui/accordion";

const faqs = [
 {
 id:"faq-1",
 question:"How do I track my order?",
 answer:
"You can track your order from the My Orders section in your account. Once your order is shipped, you will receive a tracking number via SMS and email.",
 },
 {
 id:"faq-2",
 question:"What is your return policy?",
 answer:
"We accept returns within 14 days of delivery for non-pharmaceutical items in their original packaging. Prescription medications cannot be returned for safety reasons.",
 },
 {
 id:"faq-3",
 question:"How do I upload a prescription?",
 answer:
"When adding a prescription-required product to your cart, you will be prompted to upload a photo of your prescription. You can also upload prescriptions from the cart page before checkout.",
 },
 {
 id:"faq-4",
 question:"What payment methods do you accept?",
 answer:
"We accept Visa, Mastercard, cash on delivery (COD), and various digital wallets including Vodafone Cash, Orange Money, and Fawry.",
 },
];

export default function HelpPage() {
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
 Help &amp; Support
 </h1>
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

 {/* Contact Section */}
 <div className="rounded-xl bg-white p-4 shadow-card">
 <h2 className="text-sm font-semibold text-sand-800">Contact Us</h2>
 <div className="mt-3 flex flex-col gap-3">
 {/* Phone */}
 <a
 href="tel:+2019999"
 className="flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-sand-50"
 >
 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
 <Phone className="h-4 w-4 text-brand-500" />
 </div>
 <div>
 <span className="text-sm font-medium text-sand-700">
 Call Us
 </span>
 <p className="text-xs text-sand-400">19999</p>
 </div>
 </a>

 {/* Email */}
 <a
 href="mailto:support@elezaby.com"
 className="flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-sand-50"
 >
 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
 <Mail className="h-4 w-4 text-brand-500" />
 </div>
 <div>
 <span className="text-sm font-medium text-sand-700">
 Email
 </span>
 <p className="text-xs text-sand-400">support@elezaby.com</p>
 </div>
 </a>

 {/* WhatsApp */}
 <a
 href="https://wa.me/2019999"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-sand-50"
 >
 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
 <MessageCircle className="h-4 w-4 text-brand-500" />
 </div>
 <div>
 <span className="text-sm font-medium text-sand-700">
 WhatsApp
 </span>
 <p className="text-xs text-sand-400">Chat with us</p>
 </div>
 </a>
 </div>
 </div>

 {/* Live Chat Button */}
 <Button variant="default" className="w-full">
 <MessageCircle className="h-4 w-4" />
 Live Chat
 </Button>
 </div>
 );
}
