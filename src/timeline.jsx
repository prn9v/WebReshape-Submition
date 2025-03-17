"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { Stepper, Step, StepLabel } from "@mui/material";

const timelineEvents = [
  {
    day: "Day 1",
    date: "March 15, 2025",
    events: [
      {
        time: "09:00 AM",
        title: "Opening Ceremony",
        location: "Main Stage",
        description: "Welcome address and introduction to Tech Fest 2025",
      },
      {
        time: "11:00 AM",
        title: "Future of AI Panel",
        location: "Innovation Hall",
        description: "Leading experts discuss the future of artificial intelligence",
      },
      {
        time: "02:00 PM",
        title: "VR/AR Workshop",
        location: "Tech Lab",
        description: "Hands-on workshop exploring virtual and augmented reality",
      },
      {
        time: "05:00 PM",
        title: "Networking Mixer",
        location: "Skyline Lounge",
        description: "Connect with industry professionals and fellow attendees",
      },
    ],
  },
  {
    day: "Day 2",
    date: "March 16, 2025",
    events: [
      {
        time: "10:00 AM",
        title: "Quantum Computing Keynote",
        location: "Main Stage",
        description: "Breakthrough developments in quantum computing",
      },
      {
        time: "12:30 PM",
        title: "Blockchain Revolution",
        location: "Innovation Hall",
        description: "How blockchain is transforming industries worldwide",
      },
      {
        time: "03:00 PM",
        title: "Robotics Demonstration",
        location: "Tech Lab",
        description: "Live demonstrations of cutting-edge robotics",
      },
      {
        time: "07:00 PM",
        title: "Tech Awards Ceremony",
        location: "Grand Ballroom",
        description: "Celebrating innovation and excellence in technology",
      },
    ],
  },
  {
    day: "Day 3",
    date: "March 17, 2025",
    events: [
      {
        time: "09:30 AM",
        title: "Future of Work Symposium",
        location: "Innovation Hall",
        description: "How technology is reshaping the workplace",
      },
      {
        time: "01:00 PM",
        title: "Startup Pitch Competition",
        location: "Venture Stage",
        description: "Emerging startups compete for investment opportunities",
      },
      {
        time: "04:00 PM",
        title: "Sustainable Tech Forum",
        location: "Green Zone",
        description: "Exploring technology solutions for environmental challenges",
      },
      {
        time: "08:00 PM",
        title: "Closing Party",
        location: "Skyline Lounge",
        description: "Celebrate the conclusion of Tech Fest 2025",
      },
    ],
  },
];

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Auto-rotate through days
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % timelineEvents.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [autoplayEnabled]);

  // Pause autoplay when user interacts with timeline
  const handleStepClick = (index) => {
    setActiveStep(index);
    setAutoplayEnabled(false);
    // Resume autoplay after 30 seconds of inactivity
    setTimeout(() => setAutoplayEnabled(true), 30000);
  };

  const goToPrevDay = () => {
    setActiveStep((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
    setAutoplayEnabled(false);
  };

  const goToNextDay = () => {
    setActiveStep((prev) => (prev + 1) % timelineEvents.length);
    setAutoplayEnabled(false);
  };

  // Floating particles background effect
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400 bg-opacity-30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              opacity: [Math.random() * 0.5, Math.random() * 0.3, Math.random() * 0.7],
            }}
            transition={{
              duration: Math.random() * 50 + 50,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              width: Math.random() * 12 + 6 + "px",
              height: Math.random() * 12 + 6 + "px",
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="timeline" className="py-16 relative min-h-screen">
      {/* Futuristic background elements */}
      <Particles />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.h2 
          className="text-4xl font-bold mb-4 bg-clip-text  text-[#efd67b]"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Event Timeline
        </motion.h2>
        <motion.p 
          className="text-white max-w-3xl mx-auto font-semibold text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore our action-packed schedule of keynotes, workshops, and networking events
        </motion.p>
      </motion.div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevDay}
            className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </motion.button>
          
          <Stepper activeStep={activeStep} alternativeLabel sx={{
            color: "white",
            '& .MuiStepLabel-label': {
              color: 'white',
              fontWeight: 'bold',
            },
            '& .MuiStepIcon-root': {
              color: '#22d3ee',
            },
            '& .MuiStepIcon-text': {
              fill: '#000',
            },
          }}>
            {timelineEvents.map((day, index) => (
              <Step key={day.day} onClick={() => handleStepClick(index)}>
                <StepLabel className="cursor-pointer text-white">{day.day}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNextDay}
            className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </motion.button>
        </div>
      </div>
      
      <motion.div 
        className="mt-12 relative z-10"
        key={activeStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Calendar className="h-5 w-5 text-cyan-400" />
          <span className="text-xl text-white">{timelineEvents[activeStep].date}</span>
        </motion.div>
        
        <div className="space-y-6 max-w-3xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {timelineEvents[activeStep].events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: hoveredCard === event.title ? 1.03 : 1
                }}
                exit={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                onMouseEnter={() => setHoveredCard(event.title)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                {/* Glowing effect when hovered */}
                {hoveredCard === event.title && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                <Card
                  className="backdrop-blur-md transition-all border-t border-cyan-500/30 border-b border-purple-500/30"
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    color: "white",
                    boxShadow: hoveredCard === event.title ? 
                      "0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(168, 85, 247, 0.2)" : 
                      "none"
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <motion.span 
                        className="text-cyan-400"
                        animate={{ 
                          textShadow: hoveredCard === event.title ? 
                            "0 0 8px rgba(34, 211, 238, 0.7)" : 
                            "none"
                        }}
                      >
                        {event.title}
                      </motion.span>
                      <div className="flex items-center text-white text-sm bg-cyan-500/20 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                        {event.time}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white mb-4">{event.description}</p>
                    <div className="flex items-center text-white text-sm bg-purple-500/20 px-3 py-1 rounded-full inline-flex">
                      <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                      {event.location}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Futuristic grid lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      {/* Radar scan effect */}
      <motion.div 
        className="absolute left-0 right-0 bottom-0 h-full pointer-events-none z-0"
        initial={{ opacity: 0.1 }}
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  );
}