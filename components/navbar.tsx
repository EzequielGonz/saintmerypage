"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileMenu } from "@/components/mobile-menu"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#productos", label: "Productos" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/#contacto", label: "Contacto" },
  { href: "/shop", label: "Tienda" },
]

export function Navbar() {
  const [currentSection, setCurrentSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems } = useCart()

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      const href = target?.getAttribute("href")

      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          })

          // Update URL without page reload
          window.history.pushState({}, "", href)
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      const sections = navItems
        .map((item) => item.href)
        .filter((href) => href.startsWith("#"))
        .map((href) => href.substring(1))

      const currentPosition = window.scrollY + 100 // Add offset

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-shadow duration-200",
        scrolled ? "shadow-md" : "",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://i.ibb.co/jvz0rVS0/hojitaverde.png"
              alt="Saintmery Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-green-600">
              Inicio
            </Link>
            <Link href="/#nosotros" className="text-sm font-medium transition-colors hover:text-green-600">
              Nosotros
            </Link>
            <Link href="/#productos" className="text-sm font-medium transition-colors hover:text-green-600">
              Productos
            </Link>
            <Link href="/#testimonios" className="text-sm font-medium transition-colors hover:text-green-600">
              Testimonios
            </Link>
            <Link href="/#contacto" className="text-sm font-medium transition-colors hover:text-green-600">
              Contacto
            </Link>
            <Link href="/shop" className="text-sm font-medium transition-colors hover:text-green-600">
              Tienda
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => document.querySelector('.cart-sidebar')?.classList.toggle('translate-x-full')}
            >
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </Button>
            <MobileMenu items={navItems} currentSection={currentSection} />
          </div>
        </div>
      </div>
    </header>
  )
}
