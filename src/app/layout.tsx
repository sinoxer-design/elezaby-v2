import type { Metadata, Viewport } from"next";
import {
 DM_Serif_Display,
 Plus_Jakarta_Sans,
 JetBrains_Mono,
 IBM_Plex_Sans_Arabic,
 Noto_Naskh_Arabic,
} from"next/font/google";
import { AppShell } from"@/components/layout/AppShell";
import { ThemeProvider } from"@/components/providers/ThemeProvider";
import"./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
 variable:"--font-plus-jakarta",
 subsets: ["latin"],
 weight: ["400","500","600","700"],
 display:"swap",
});

const dmSerif = DM_Serif_Display({
 variable:"--font-dm-serif",
 subsets: ["latin"],
 weight: ["400"],
 display:"swap",
});

const jetbrainsMono = JetBrains_Mono({
 variable:"--font-jetbrains",
 subsets: ["latin"],
 weight: ["400","500"],
 display:"swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
 variable:"--font-ibm-arabic",
 subsets: ["arabic"],
 weight: ["400","500","600","700"],
 display:"swap",
});

const notoNaskh = Noto_Naskh_Arabic({
 variable:"--font-noto-naskh",
 subsets: ["arabic"],
 weight: ["400","700"],
 display:"swap",
});

export const metadata: Metadata = {
 title: {
 default:"Elezaby Pharmacy",
 template:"%s | Elezaby Pharmacy",
 },
 description:
"Your trusted pharmacy for medicines, health products, and personal care. Home delivery and store pickup available.",
};

export const viewport: Viewport = {
 width:"device-width",
 initialScale: 1,
 maximumScale: 1,
 viewportFit:"cover",
 themeColor:"#1a8a4a",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" dir="ltr">
 <body
 className={`${plusJakarta.variable} ${dmSerif.variable} ${jetbrainsMono.variable} ${ibmPlexArabic.variable} ${notoNaskh.variable} antialiased`}
 >
 <ThemeProvider>
 <AppShell>{children}</AppShell>
 </ThemeProvider>
 </body>
 </html>
 );
}
