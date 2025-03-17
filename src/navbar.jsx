"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80 // Account for navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 backdrop-blur-md" : "py-4"
      }`}
      style={{
        backgroundColor: isScrolled ? "var(--navbar-bg, var(--card-bg))" : "transparent",
        borderBottom: isScrolled ? "1px solid var(--card-border)" : "none",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">TF</span>
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              TECH FEST 2025
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("timeline")}
              className="text-sm font-medium hover:text-cyan-400 transition-colors cursor-pointer"
              style={{ color: "var(--text-primary)" }}
            >
              Timeline
            </button>
            <button
              onClick={() => scrollToSection("speakers")}
              className="text-sm font-medium hover:text-cyan-400 transition-colors cursor-pointer"
              style={{ color: "var(--text-primary)" }}
            >
              Speakers
            </button>
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4 px-4 shadow-lg"
          style={{
            backgroundColor: "var(--navbar-bg, var(--card-bg))",
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("timeline")}
              className="text-sm font-medium py-2 hover:text-cyan-400 transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              Timeline
            </button>
            <button
              onClick={() => scrollToSection("speakers")}
              className="text-sm font-medium py-2 hover:text-cyan-400 transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              Speakers
            </button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white w-full">
              Register Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

