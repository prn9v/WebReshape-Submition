"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Linkedin, Twitter, Globe } from "lucide-react";

const speakers = [
  {
    id: 1,
    name: "Samiksha Gaiki",
    role: "AI Enginner",
    company: "Google",
    bio: "Samiksha Gaiki leads groundbreaking research in artificial intelligence and machine learning, with a focus on neural networks and deep learning applications. Her work has been published in top journals and she has received numerous awards for her contributions to the field.",
    image: "samiksha2.jpg",
    socials: {
      twitter: "https://www.linkedin.com/in/samiksha-gaiki-6460462aa/",
      linkedin: "https://www.linkedin.com/in/samiksha-gaiki-6460462aa/",
      website: "https://www.linkedin.com/in/samiksha-gaiki-6460462aa/",
    },
    topic: "The Next Frontier in AI: Cognitive Computing",
  },
  {
    id: 2,
    name: "Pranav Deshmukh",
    role: "Director",
    company: "Netflix",
    bio: "Pranav Deshmukh is a pioneer in quantum computing technology, leading the development of next-generation quantum processors. With over 15 years of experience in the tech industry, he has helped shape the future of computing through his innovative approaches to quantum mechanics and information processing.",
    image: "Pranav.jpg",
    socials: {
      twitter: "www.linkedin.com/in/pranav-deshmukh-rcoem",
      linkedin: "www.linkedin.com/in/pranav-deshmukh-rcoem",
      website: "www.linkedin.com/in/pranav-deshmukh-rcoem",
    },
    topic: "Quantum Computing: Breaking Computational Barriers",
  },
  {
    id: 3,
    name: "Jyotiraditya Tripathi",
    role: "Web Developer",
    company: "Microsoft",
    bio: "Jyotiraditya Tripathi specializes in developing autonomous robotic systems for industrial and medical applications. Her work combines cutting-edge hardware design with sophisticated AI algorithms to create robots that can adapt to complex environments and perform precise tasks with minimal human intervention.",
    image: "jyoti.jpg",
    socials: {
      twitter:
        "https://www.linkedin.com/in/jyotiraditya-neeraj-tripathi-3830032a9/",
      linkedin:
        "https://www.linkedin.com/in/jyotiraditya-neeraj-tripathi-3830032a9/",
      website:
        "https://www.linkedin.com/in/jyotiraditya-neeraj-tripathi-3830032a9/",
    },
    topic: "The Future of Human-Robot Collaboration",
  },
];

export default function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  return (
    <section id="speakers" className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4  bg-clip-text bg-gradient-to-r text-[#efd67b]">
          Featured Speakers
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-semibold text-xl">
          Learn from the brightest minds and industry leaders in technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              marginBottom: "48px",
            }}
          >
            <Card
              className="backdrop-blur-sm overflow-hidden h-full flex flex-col hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
                color: "var(--text-primary)",
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  className="w-full aspect-square object-contain transition-transform hover:scale-120"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-white">{speaker.name}</h3>
                <p className="text-cyan-400">{speaker.role}</p>
                <p className="text-gray-400 text-sm">{speaker.company}</p>
              </CardHeader>
              <CardContent className="pb-4 flex-grow">
                <p className="text-gray-300 line-clamp-3">{speaker.bio}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <div className="flex space-x-2">
                  <a
                    href={speaker.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={speaker.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={speaker.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-700/50"
                      onClick={() => setSelectedSpeaker(speaker)}
                    >
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-cyan-400">
                        {speaker.name}
                      </DialogTitle>
                      <DialogDescription className="text-gray-300">
                        {speaker.role} at {speaker.company}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      <div className="md:col-span-1">
                        <img
                          src={speaker.image || "/placeholder.svg"}
                          alt={speaker.name}
                          className="w-full rounded-lg object-cover"
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                          <a
                            href={speaker.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                          <a
                            href={speaker.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a
                            href={speaker.socials.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400"
                          >
                            <Globe className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="text-lg font-semibold mb-2 text-purple-400">
                          Speaking on: {speaker.topic}
                        </h4>
                        <p className="text-gray-300 mb-4">{speaker.bio}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
