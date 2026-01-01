"use client"

import { useEffect, useRef, useState } from "react"
import type L from "leaflet"

interface MapLocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void
  initialPosition?: [number, number]
}

export function MapLocationPicker({ onLocationSelect, initialPosition = [7.8731, 80.7718] }: MapLocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return

      const map = L.map(mapRef.current).setView(initialPosition, 8)
      mapInstanceRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Custom icon
      const customIcon = L.divIcon({
        className: "custom-marker-picker",
        html: `<div style="
          background-color: #059669;
          width: 36px;
          height: 36px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 22px;
            text-align: center;
            line-height: 28px;
          ">📍</div>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      })

      // Click handler to place marker
      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng])
        } else {
          markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(map)
        }

        setSelectedCoords([lat, lng])
        onLocationSelect(lat, lng)
      })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [initialPosition, onLocationSelect])

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div ref={mapRef} style={{ height: "400px", width: "100%", borderRadius: "8px", overflow: "hidden" }} />
      {selectedCoords && (
        <p className="text-sm text-muted-foreground mt-2">
          Selected: {selectedCoords[0].toFixed(4)}, {selectedCoords[1].toFixed(4)}
        </p>
      )}
    </div>
  )
}
