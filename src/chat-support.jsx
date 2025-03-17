"use client"
import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Avatar } from "./components/ui/avatar"
import { MessageSquare, Send, X, Minimize, Maximize } from "lucide-react"

// Mock AI response function since we can't use the AI SDK directly in the browser
const mockGenerateResponse = async (input) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const responses = {
    hello: "Hello! Welcome to Tech Fest 2025. How can I assist you today?",
    schedule:
      "Tech Fest 2025 runs from March 15-17. We have keynotes, workshops, and networking events each day. Check out the timeline section for details!",
    speakers:
      "We have amazing speakers including Samiksha Gaiki,Pranav Deshmukh and Jyotiraditya Tripathi They'll be discussing AI, quantum computing, robotics.",
    location: "Tech Fest 2025 will be held at the Main Auditorium, Ramdeobaba Univerity (RBU), Nagpur, MH.",
    tickets:
      "Early bird tickets are available now! Regular admission is 299rs, VIP passes are 499rs, and student tickets are 99rs.",
    default:
      "Thank you for your interest in Tech Fest 2025! Our team is working on providing more information about this topic. In the meantime, feel free to ask about our schedule, speakers, location, or tickets.",
  }

  // Simple keyword matching
  for (const [keyword, response] of Object.entries(responses)) {
    if (input.toLowerCase().includes(keyword)) {
      return response
    }
  }

  return responses.default
}

const Message = ({ message }) => (
  <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[80%] rounded-lg p-3 ${
        message.role === "user" ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : "bg-slate-800 text-gray-200"
      }`}
    >
      <p className="text-sm">{message.content}</p>
      <p className="text-xs opacity-70 mt-1">
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
)

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI assistant for Tech Fest 2025. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Use the mock function instead of the AI SDK
      const responseText = await mockGenerateResponse(input)

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/20 z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card
          className={`fixed bottom-6 right-6 w-80 md:w-96 bg-slate-900 border-slate-700 shadow-xl shadow-cyan-500/10 z-50 transition-all duration-300 ${
            isMinimized ? "h-16" : "h-[500px]"
          }`}
        >
          <CardHeader className="p-4 border-b border-slate-700 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <div className="relative">
                <Avatar className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-500">
                  <MessageSquare className="h-4 w-4 text-white" />
                </Avatar>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <span>AI Support</span>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-800"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-800"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-4 overflow-y-auto h-[calc(600px-260px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Message key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-slate-800 text-gray-200">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"></div>
                          <div
                            className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className=" border-t border-slate-700 pt-2">
                <form onSubmit={handleSendMessage} className="flex w-full  gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-slate-800 border-slate-700 focus-visible:ring-cyan-500"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}

