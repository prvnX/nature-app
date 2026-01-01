"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import type L from "leaflet"

interface Place {
  id: number
  name: string
  type: string
  latitude: number
  longitude: number
  rating: number
}

interface LeafletMapProps {
  places: Place[]
  center?: [number, number]
  zoom?: number
  height?: string
}

export function LeafletMap({ places, center = [7.8731, 80.7718], zoom = 8, height = "500px" }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return

      // Initialize map
      const map = L.map(mapRef.current).setView(center, zoom)
      mapInstanceRef.current = map

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Custom icon for markers
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          background-color: #ef4444;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 18px;
            text-align: center;
            line-height: 24px;
          ">📍</div>
        </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      })

      // Add markers for each place
      places.forEach((place) => {
        const marker = L.marker([place.latitude, place.longitude], { icon: customIcon }).addTo(map)

        const popupContent = `
          <div style="min-width: 200px; cursor: pointer;" class="leaflet-popup-content-wrapper">
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${place.name}</h3>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
                  ⭐ ${place.rating}
                </span>
              </div>
              <button 
                onclick="window.location.href='/place/${place.id}'"
                style="
                  background: #059669;
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  width: 100%;
                  font-weight: 500;
                "
              >
                View Details
              </button>
            </div>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 250,
          className: "custom-popup",
        })

        marker.on("click", () => {
          marker.openPopup()
        })
      })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [places, center, zoom, router])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div ref={mapRef} style={{ height, width: "100%", borderRadius: "8px", overflow: "hidden" }} />
    </>
  )
}
