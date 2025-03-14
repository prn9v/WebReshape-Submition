import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./theme-provider"
import HomePage from "./pages/HomePage"
import React from "react"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

