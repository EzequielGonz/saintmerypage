"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileMenu } from "@/components/mobile-menu"

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#productos", label: "Productos" },
  { href: "#nuestros-productos", label: "Nuestros Productos" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
  { href: "/shop", label: "Shop" },
]

export function Navbar() {
  const [currentSection, setCurrentSection] = useState("")
  const [scrolled, setScrolled] = useState(false)

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
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200",
        scrolled ? "shadow-md" : "",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="https://i.ibb.co/jvz0rVS0/hojitaverde.png"
              alt="Saintmery Logo"
              width={400}
              height={300}
              className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                currentSection === item.href.replace("#", "") ? "text-green-600" : "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Shop Button (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/shop">
            <Button className="bg-green-600 hover:bg-green-700">Tienda Online</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu items={navItems} currentSection={currentSection} />
      </div>
    </header>
  )
}
