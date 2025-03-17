"use client"
 import React, { Suspense, useState ,lazy  } from "react" 
 import Timeline from "../timeline" 
 import Speakers from "../speakers"
import ChatSupport from "../chat-support" 
import DynamicTheme from "../dynamic-theme"
import Footer from "../footer"
import HeroFallback from "../hero"
import Navbar from "../navbar"

const Hero = lazy(() => import("../hero"))

export default function HomePage() {
  const [heroError, setHeroError] = useState(false)

  // Check if WebGL is supported
  React.useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

      if (!gl) {
        console.warn("WebGL not supported, falling back to static content")
        setHeroError(true)
      }
    } catch (e) {
      console.error("Error checking WebGL support:", e)
      setHeroError(true)
    }
  }, [])

  return (
    <DynamicTheme>
      <main className="min-h-screen text-white overflow-hidden" style={{ background: "var(--page-background)" }}>
      <Navbar />
        {heroError ? (
          <HeroFallback />
        ) : (
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-cyan-400">Loading 3D Experience...</p>
                </div>
              </div>
            }
          >
            <ErrorBoundary fallback={<HeroFallback />} onError={() => setHeroError(true)}>
              <Hero />
            </ErrorBoundary>
          </Suspense>
        )}

        <div className="container mx-auto px-4 py-16 space-y-32">
          <Timeline />
          <Speakers />
        </div>

        <Footer />
        <ChatSupport />
      </main>
    </DynamicTheme>
  )
}

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in component:", error, errorInfo)
    if (this.props.onError) {
      this.props.onError(error)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

