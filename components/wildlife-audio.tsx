"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WildlifeAudio() {
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/wildlife-ambiance.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Try to play immediately (state is already true)
    audioRef.current.play().catch(() => {
      // Auto-play failed, user needs to interact first
      setIsPlaying(false)
    })

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
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        console.log("Audio play failed")
      })
      setIsPlaying(true)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-110 border-2 border-emerald-400/20"
      aria-label={isPlaying ? "Mute wildlife sounds" : "Play wildlife sounds"}
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  )
}
