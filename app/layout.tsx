import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Saintmery - Dietética Natural",
  description: "Tu dietética de confianza. Productos naturales y saludables con entrega a domicilio en Mar del Plata y Balcarce.",
  keywords: "dietética, productos naturales, frutos secos, granola, semillas, saludable, Mar del Plata, Balcarce",
  authors: [{ name: "Saintmery" }],
  creator: "Saintmery",
  publisher: "Saintmery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://saintmerypage.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Saintmery - Dietética Natural",
    description: "Tu dietética de confianza. Productos naturales y saludables con entrega a domicilio en Mar del Plata y Balcarce.",
    url: "https://saintmerypage.vercel.app",
    siteName: "Saintmery",
    images: [
      {
        url: "https://saintmerypage.vercel.app/images/saintmery-logo.png",
        width: 1200,
        height: 630,
        alt: "Saintmery - Dietética Natural",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saintmery - Dietética Natural",
    description: "Tu dietética de confianza. Productos naturales y saludables con entrega a domicilio en Mar del Plata y Balcarce.",
    images: ["https://saintmerypage.vercel.app/images/saintmery-logo.png"],
  },
  icons: {
    icon: [
      {
        url: "/images/saintmery-logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/saintmery-logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/saintmery-logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/images/saintmery-logo.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
