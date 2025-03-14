"use client"
import React from "react"
import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => null,
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const root = window.document.documentElement

    // Remove the old theme class
    root.classList.remove("light", "dark")

    // Add the new theme class
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

