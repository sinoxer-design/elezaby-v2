// ── RX Prescription Order Types & Mock Data ──────────────────────────

export type RxOrderStatus =
  | "pending_review"
  | "pharmacist_reviewing"
  | "items_identified"
  | "needs_action"
  | "ready"
  | "added_to_cart"
  | "completed";

export type RxOrderType = "rx_only" | "mixed";

export interface RxMessage {
  id: string;
  sender: "system" | "pharmacist" | "user";
  senderName?: string;
  text: string;
  timestamp: string;
}

export interface RxIdentifiedItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  qty: number;
  price: number;
  available: boolean;
  note?: string;
}

export interface RxPrescriptionOrder {
  id: string;
  status: RxOrderStatus;
  orderType: RxOrderType;
  fileNames: string[];
  note?: string;
  messages: RxMessage[];
  identifiedItems: RxIdentifiedItem[];
  createdAt: string;
  updatedAt: string;
}

// Pharmacist simulation messages (sent at each stage)
export const mockRxSimulationMessages: Record<string, RxMessage[]> = {
  pharmacist_reviewing: [
    {
      id: "sim-1",
      sender: "pharmacist",
      senderName: "Dr. Ahmed K.",
      text: "I've received your prescription and I'm reviewing it now. I'll update you shortly with the available items.",
      timestamp: new Date().toISOString(),
    },
  ],
  items_identified: [
    {
      id: "sim-2",
      sender: "pharmacist",
      senderName: "Dr. Ahmed K.",
      text: "I've identified all items from your prescription. Most are available in stock. Please review the list below and add them to your cart when ready.",
      timestamp: new Date().toISOString(),
    },
  ],
  needs_action: [
    {
      id: "sim-3",
      sender: "pharmacist",
      senderName: "Dr. Ahmed K.",
      text: "Some items from your prescription are currently out of stock. We're sourcing them from a partner pharmacy. I'll update you once they're available.",
      timestamp: new Date().toISOString(),
    },
  ],
};

export const mockRxIdentifiedItems: RxIdentifiedItem[] = [
  {
    id: "rx-item-1",
    name: "Amoxicillin 500mg Capsules - 20 Pack",
    brand: "Julphar",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    qty: 1,
    price: 85,
    available: true,
  },
  {
    id: "rx-item-2",
    name: "Omeprazole 20mg Capsules - 14 Pack",
    brand: "AstraZeneca",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    qty: 2,
    price: 120,
    available: true,
  },
  {
    id: "rx-item-3",
    name: "Metformin 850mg Tablets - 30 Pack",
    brand: "Merck",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
    qty: 1,
    price: 65,
    available: false,
    note: "Sourcing from partner pharmacy \u2014 expected in 1-2 days",
  },
];

// Pre-seeded RX order so the demo isn't empty
export const mockExistingRxOrders: RxPrescriptionOrder[] = [
  {
    id: "RX-2026-001",
    status: "completed",
    orderType: "rx_only",
    fileNames: ["prescription_feb.jpg"],
    note: "Monthly refill for blood pressure medication",
    messages: [
      {
        id: "msg-seed-1",
        sender: "system",
        text: "Prescription submitted for review.",
        timestamp: "2026-02-15T10:00:00Z",
      },
      {
        id: "msg-seed-2",
        sender: "pharmacist",
        senderName: "Dr. Ahmed K.",
        text: "Your prescription has been reviewed. All items are available.",
        timestamp: "2026-02-15T10:30:00Z",
      },
      {
        id: "msg-seed-3",
        sender: "user",
        text: "Thank you! Please proceed.",
        timestamp: "2026-02-15T11:00:00Z",
      },
      {
        id: "msg-seed-4",
        sender: "system",
        text: "Items added to cart and order completed.",
        timestamp: "2026-02-15T12:00:00Z",
      },
    ],
    identifiedItems: [
      {
        id: "rx-seed-1",
        name: "Amlodipine 5mg Tablets - 30 Pack",
        brand: "Pfizer",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
        qty: 1,
        price: 95,
        available: true,
      },
    ],
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-02-15T12:00:00Z",
  },
];
