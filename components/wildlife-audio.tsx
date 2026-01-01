"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WildlifeAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/wildlife-ambiance.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Check if user has previously muted
    const isMuted = localStorage.getItem("wildlife-audio-muted") === "true"
    if (!isMuted) {
      audioRef.current.play().catch(() => {
        // Auto-play failed, user needs to interact first
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      localStorage.setItem("wildlife-audio-muted", "true")
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        console.log("[v0] Audio play failed")
      })
      localStorage.setItem("wildlife-audio-muted", "false")
      setIsPlaying(true)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-background/95 backdrop-blur"
      aria-label={isPlaying ? "Mute wildlife sounds" : "Play wildlife sounds"}
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  )
}
