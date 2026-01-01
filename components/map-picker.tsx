"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MapPickerProps {
  latitude?: number
  longitude?: number
  onLocationSelect: (lat: number, lng: number) => void
}

export function MapPicker({ latitude = 7.8731, longitude = 80.7718, onLocationSelect }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedLocation, setSelectedLocation] = useState({ lat: latitude, lng: longitude })
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapReady(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return

    const rect = mapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Simulate coordinate conversion (in real app, use actual map library)
    const lat = 7.8731 + (y / rect.height - 0.5) * 5
    const lng = 80.7718 + (x / rect.width - 0.5) * 5

    setSelectedLocation({ lat, lng })
    onLocationSelect(lat, lng)
  }

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setSelectedLocation({ lat, lng })
        onLocationSelect(lat, lng)
      },
      (error) => {
        console.log("[v0] Geolocation error:", error)
      },
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div
          ref={mapRef}
          onClick={handleMapClick}
          className="w-full h-[400px] bg-gradient-to-br from-chart-2/20 to-primary/20 cursor-crosshair relative overflow-hidden"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0zm0 9.071l7.071 7.07-1.414 1.415L32 11.9l-5.657 5.657-1.414-1.414L32 9.07z' fill='%23059669' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
          }}
        >
          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}

          {/* Map marker */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300"
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            <MapPin className="h-10 w-10 text-destructive fill-destructive/20 drop-shadow-lg animate-bounce" />
          </div>

          {/* Coordinate overlay */}
          <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur px-3 py-2 rounded-lg shadow-lg">
            <p className="text-xs font-mono text-muted-foreground">
              {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
            </p>
          </div>
        </div>

        <div className="p-4 bg-muted/30 border-t">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Click on the map to select location</p>
            <Button variant="outline" size="sm" onClick={useCurrentLocation} className="gap-2 bg-transparent">
              <MapPin className="h-4 w-4" />
              Use My Location
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
