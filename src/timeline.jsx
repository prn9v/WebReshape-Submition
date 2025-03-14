"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
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

  return (
    <section id="timeline" className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          Event Timeline
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explore our action-packed schedule of keynotes, workshops, and networking events
        </p>
      </div>
      
      <div className="w-full max-w-3xl mx-auto">
        <Stepper activeStep={activeStep} alternativeLabel sx={{color: "white"}}>
          {timelineEvents.map((day, index) => (
            <Step className=" text-white" key={day.day} onClick={() => setActiveStep(index)}>
              <StepLabel className="cursor-pointer text-2xl text-white">{day.day}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      
      <div className="mt-12">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Calendar className="h-5 w-5 text-cyan-400" />
          <span className="text-xl text-gray-200">{timelineEvents[activeStep].date}</span>
        </div>
        <div className="space-y-6">
          {timelineEvents[activeStep].events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="backdrop-blur-sm hover:bg-opacity-80 transition-all"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                  color: "var(--text-primary)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-cyan-400">{event.title}</span>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock className="h-4 w-4 mr-1 text-cyan-400" />
                      {event.time}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-purple-400" />
                    {event.location}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
