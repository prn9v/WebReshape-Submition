"use client"
import React from "react";
import { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"

const TimeOfDay = {
  MORNING: "morning",
  AFTERNOON: "afternoon",
  EVENING: "evening",
  NIGHT: "night",
}

export default function DynamicTheme({ children }) {
  const { setTheme } = useTheme()
  const [timeOfDay, setTimeOfDay] = useState(TimeOfDay.MORNING)
  const [mounted, setMounted] = useState(false)

  const cycleThroughTimes = () => {
    const times = [
      { name: TimeOfDay.MORNING, hour: 9 },
      { name: TimeOfDay.AFTERNOON, hour: 14 },
      { name: TimeOfDay.EVENING, hour: 19 },
      { name: TimeOfDay.NIGHT, hour: 23 },
    ]

    const currentIndex = times.findIndex((t) => t.name === timeOfDay)
    const nextIndex = (currentIndex + 1) % times.length

    // Mock the current hour
    const mockDate = new Date()
    mockDate.setHours(times[nextIndex].hour)

    // Update based on the mocked time
    const hour = mockDate.getHours()

    if (hour >= 5 && hour < 12) {
      setTimeOfDay(TimeOfDay.MORNING)
      document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #48cae4, #023e8a)")
      document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #e0f2fe, #bae6fd)")
      document.documentElement.style.setProperty("--text-primary", "#0c4a6e")
      document.documentElement.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.7)")
      document.documentElement.style.setProperty("--card-border", "rgba(186, 230, 253, 0.5)")
      document.documentElement.style.setProperty("--footer-bg", "rgba(255, 255, 255, 0.85)")
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay(TimeOfDay.AFTERNOON)
      document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #00b4d8, #0077b6)")
      document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #93c5fd, #3b82f6)")
      document.documentElement.style.setProperty("--text-primary", "#ffffff")
      document.documentElement.style.setProperty("--card-bg", "rgba(30, 58, 138, 0.4)")
      document.documentElement.style.setProperty("--card-border", "rgba(59, 130, 246, 0.5)")
      document.documentElement.style.setProperty("--footer-bg", "rgba(30, 58, 138, 0.7)")
    } else if (hour >= 17 && hour < 21) {
      setTimeOfDay(TimeOfDay.EVENING)
      document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #7209b7, #3a0ca3)")
      document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #4c1d95, #1e1b4b)")
      document.documentElement.style.setProperty("--text-primary", "#ffffff")
      document.documentElement.style.setProperty("--card-bg", "rgba(67, 56, 202, 0.3)")
      document.documentElement.style.setProperty("--card-border", "rgba(139, 92, 246, 0.5)")
      document.documentElement.style.setProperty("--footer-bg", "rgba(67, 56, 202, 0.6)")
    } else {
      setTimeOfDay(TimeOfDay.NIGHT)
      document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #10002b, #240046)")
      document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #000000, #0f172a)")
      document.documentElement.style.setProperty("--text-primary", "#ffffff")
      document.documentElement.style.setProperty("--card-bg", "rgba(15, 23, 42, 0.5)")
      document.documentElement.style.setProperty("--card-border", "rgba(51, 65, 85, 0.5)")
      document.documentElement.style.setProperty("--footer-bg", "rgba(15, 23, 42, 0.8)")
    }
  }

  useEffect(() => {
    setMounted(true)

    const updateTimeOfDay = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 12) {
        // Morning - bright background
        setTimeOfDay(TimeOfDay.MORNING)
        document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #48cae4, #023e8a)")
        document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #e0f2fe, #bae6fd)")
        document.documentElement.style.setProperty("--text-primary", "#0c4a6e") // Darker text for readability
        document.documentElement.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.7)")
        document.documentElement.style.setProperty("--card-border", "rgba(186, 230, 253, 0.5)")
        document.documentElement.style.setProperty("--footer-bg", "rgba(255, 255, 255, 0.85)")
      } else if (hour >= 12 && hour < 17) {
        // Afternoon - somewhat darker
        setTimeOfDay(TimeOfDay.AFTERNOON)
        document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #00b4d8, #0077b6)")
        document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #93c5fd, #3b82f6)")
        document.documentElement.style.setProperty("--text-primary", "#ffffff")
        document.documentElement.style.setProperty("--card-bg", "rgba(30, 58, 138, 0.4)")
        document.documentElement.style.setProperty("--card-border", "rgba(59, 130, 246, 0.5)")
        document.documentElement.style.setProperty("--footer-bg", "rgba(30, 58, 138, 0.7)")
      } else if (hour >= 17 && hour < 21) {
        // Evening - darker
        setTimeOfDay(TimeOfDay.EVENING)
        document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #7209b7, #3a0ca3)")
        document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #4c1d95, #1e1b4b)")
        document.documentElement.style.setProperty("--text-primary", "#ffffff")
        document.documentElement.style.setProperty("--card-bg", "rgba(67, 56, 202, 0.3)")
        document.documentElement.style.setProperty("--card-border", "rgba(139, 92, 246, 0.5)")
        document.documentElement.style.setProperty("--footer-bg", "rgba(67, 56, 202, 0.6)")
      } else {
        // Night - dark
        setTimeOfDay(TimeOfDay.NIGHT)
        document.documentElement.style.setProperty("--theme-gradient", "linear-gradient(to right, #10002b, #240046)")
        document.documentElement.style.setProperty("--page-background", "linear-gradient(to bottom, #000000, #0f172a)")
        document.documentElement.style.setProperty("--text-primary", "#ffffff")
        document.documentElement.style.setProperty("--card-bg", "rgba(15, 23, 42, 0.5)")
        document.documentElement.style.setProperty("--card-border", "rgba(51, 65, 85, 0.5)")
        document.documentElement.style.setProperty("--footer-bg", "rgba(15, 23, 42, 0.8)")
      }
    }

    updateTimeOfDay()
    const interval = setInterval(updateTimeOfDay, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [setTheme])

  if (!mounted) {
    return null
  }

  return (
    <div className={`theme-${timeOfDay}`}>
      <div className="fixed top-4 right-4 z-50 bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white flex items-center gap-2">
        <span className="font-medium">Current time:</span>
        <span className="text-cyan-400">{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</span>
        {/* <button
          onClick={cycleThroughTimes}
          className="ml-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
          title="Cycle through times of day"
        >
          ↻
        </button> */}
      </div>
      {children}
    </div>
  )
}

