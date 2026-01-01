"use client"

import { LeafletMap } from "./leaflet-map"

interface Place {
  id: number
  name: string
  type: string
  latitude: number
  longitude: number
  rating: number
}

interface PlacesMapProps {
  places: Place[]
  center?: [number, number]
}

export function PlacesMap({ places, center }: PlacesMapProps) {
  return <LeafletMap places={places} center={center} height="500px" zoom={8} />
}
