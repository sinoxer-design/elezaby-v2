"use client";

import Link from"next/link";
import { ChevronLeft, Truck, FileCheck, Tag, Bell, Sparkles } from"lucide-react";
import { cn } from"@/lib/utils";

type NotificationType ="order" |"prescription" |"promo" |"restock" |"system";

interface Notification {
 id: string;
 title: string;
 time: string;
 type: NotificationType;
 unread: boolean;
}

const notifications: Notification[] = [
 {
 id:"1",
 title:"Order #ELZ-2024-002 is out for delivery",
 time:"2 hours ago",
 type:"order",
 unread: true,
 },
 {
 id:"2",
 title:"Your prescription has been verified",
 time:"5 hours ago",
 type:"prescription",
 unread: true,
 },
 {
 id:"3",
 title:"Flash Sale: 30% off vitamins!",
 time:"1 day ago",
 type:"promo",
 unread: false,
 },
 {
 id:"4",
 title:"CeraVe Moisturizing Cream is back in stock",
 time:"2 days ago",
 type:"restock",
 unread: false,
 },
 {
 id:"5",
 title:"Welcome to Elezaby! Start shopping",
 time:"3 days ago",
 type:"system",
 unread: false,
 },
];

const typeConfig: Record<
 NotificationType,
 { icon: typeof Truck; bgColor: string; iconColor: string }
> = {
 order: { icon: Truck, bgColor:"bg-blue-50", iconColor:"text-blue-500" },
 prescription: {
 icon: FileCheck,
 bgColor:"bg-green-50",
 iconColor:"text-green-600",
 },
 promo: { icon: Tag, bgColor:"bg-amber-50", iconColor:"text-amber-500" },
 restock: { icon: Bell, bgColor:"bg-purple-50", iconColor:"text-purple-500" },
 system: {
 icon: Sparkles,
 bgColor:"bg-brand-50",
 iconColor:"text-brand-500",
 },
};

export default function NotificationsPage() {
 return (
 <div className="flex flex-col gap-4 px-[var(--page-padding-x)] py-4">
 {/* Header */}
 <div className="flex items-center gap-3">
 <Link
 href="/"
 className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
 >
 <ChevronLeft className="h-5 w-5 text-sand-600" />
 </Link>
 <h1 className="text-lg font-semibold text-sand-800">Notifications</h1>
 </div>

 {/* Notifications List */}
 <div className="flex flex-col gap-2">
 {notifications.map((notification) => {
 const config = typeConfig[notification.type];
 const Icon = config.icon;

 return (
 <div
 key={notification.id}
 className={cn(
"flex items-start gap-3 rounded-xl p-4 shadow-card transition-colors",
 notification.unread ?"bg-brand-50" :"bg-white"
 )}
 >
 {/* Icon */}
 <div
 className={cn(
"flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
 config.bgColor
 )}
 >
 <Icon className={cn("h-5 w-5", config.iconColor)} />
 </div>

 {/* Content */}
 <div className="flex-1">
 <p
 className={cn(
"text-sm text-sand-800",
 notification.unread ?"font-semibold" :"font-medium"
 )}
 >
 {notification.title}
 </p>
 <p className="mt-0.5 text-xs text-sand-400">
 {notification.time}
 </p>
 </div>

 {/* Unread Indicator */}
 {notification.unread && (
 <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500" />
 )}
 </div>
 );
 })}
 </div>
 </div>
 );
}
