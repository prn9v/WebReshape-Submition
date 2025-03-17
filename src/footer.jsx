import { Github, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Calendar, ArrowRight } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import React from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative mt-20 border-t transition-colors duration-300"
      style={{
        borderColor: "var(--card-border)",
        background: "var(--footer-bg, var(--card-bg))",
      }}
    >
      <div className="mx-auto container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              TECH FEST 2025
            </h3>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              The most innovative tech event of the year, bringing together industry leaders, innovators, and tech
              enthusiasts.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <ArrowRight size={14} className="text-cyan-400" />
                  About the Event
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <ArrowRight size={14} className="text-cyan-400" />
                  Schedule
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <ArrowRight size={14} className="text-cyan-400" />
                  Speakers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <ArrowRight size={14} className="text-cyan-400" />
                  Sponsors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <ArrowRight size={14} className="text-cyan-400" />
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                    RCOEM Nagpur,MH
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-purple-400 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                  +91 1234567890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-purple-400 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                  info@techfest2025.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar size={18} className="text-purple-400 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                  March 15-17, 2025
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Stay Updated</h4>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              Subscribe to our newsletter for the latest updates and announcements.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-opacity-50 border-opacity-50"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "var(--card-border)",
                }}
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t" style={{ borderColor: "var(--card-border)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {currentYear} Tech Fest. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500"></div>
    </footer>
  )
}

