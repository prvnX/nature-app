"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Trees, MapPin, ArrowLeft, Navigation, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LeafletMap } from "@/components/leaflet-map"

// Mock data with locations
const allPlaces = [
  {
    id: 1,
    name: "Ella Rock",
    type: "camp-site",
    location: "Ella, Uva Province",
    image: "/ella-rock-sri-lanka-mountains.jpg",
    rating: 4.8,
    reviews: 127,
    description: "Stunning hiking trail with panoramic views",
    latitude: 6.871,
    longitude: 81.0567,
  },
  {
    id: 2,
    name: "Diyaluma Falls",
    type: "waterfall",
    location: "Koslanda, Badulla District",
    image: "/diyaluma-waterfall-sri-lanka.jpg",
    rating: 4.9,
    reviews: 94,
    description: "Second highest waterfall in Sri Lanka",
    latitude: 6.7833,
    longitude: 81.0333,
  },
  {
    id: 3,
    name: "Kelani River",
    type: "river",
    location: "Kitulgala, Sabaragamuwa",
    image: "/kelani-river-rafting-sri-lanka.jpg",
    rating: 4.6,
    reviews: 156,
    description: "Perfect spot for white water rafting",
    latitude: 6.9897,
    longitude: 80.4177,
  },
  {
    id: 4,
    name: "Jetwing Vil Uyana",
    type: "hotel",
    location: "Sigiriya, Central Province",
    image: "/luxury-eco-resort-sri-lanka-sigiriya.jpg",
    rating: 4.9,
    reviews: 203,
    description: "Luxury eco resort near Sigiriya",
    latitude: 7.9403,
    longitude: 80.7514,
  },
  {
    id: 5,
    name: "Ravana Falls",
    type: "waterfall",
    location: "Ella, Uva Province",
    image: "/ravana-falls-sri-lanka.jpg",
    rating: 4.5,
    reviews: 89,
    description: "Popular waterfall with easy access",
    latitude: 6.8428,
    longitude: 81.0544,
  },
  {
    id: 6,
    name: "Knuckles Mountain Range",
    type: "camp-site",
    location: "Matale & Kandy Districts",
    image: "/knuckles-mountain-range-camping-sri-lanka.jpg",
    rating: 4.7,
    reviews: 112,
    description: "UNESCO World Heritage Site for camping",
    latitude: 7.45,
    longitude: 80.7833,
  },
  {
    id: 7,
    name: "Bambarakanda Falls",
    type: "waterfall",
    location: "Kalupahana, Badulla",
    image: "/tall-waterfall-sri-lanka-forest.jpg",
    rating: 4.7,
    reviews: 76,
    description: "Tallest waterfall in Sri Lanka at 263m",
    latitude: 6.8167,
    longitude: 80.9833,
  },
  {
    id: 8,
    name: "Horton Plains",
    type: "camp-site",
    location: "Nuwara Eliya District",
    image: "/horton-plains-world-end-sri-lanka.jpg",
    rating: 4.8,
    reviews: 198,
    description: "High-altitude plateau with World's End viewpoint",
    latitude: 6.8097,
    longitude: 80.8014,
  },
  {
    id: 9,
    name: "Mahaweli River",
    type: "river",
    location: "Multiple Districts",
    image: "/mahaweli-river-sri-lanka.jpg",
    rating: 4.4,
    reviews: 82,
    description: "Longest river in Sri Lanka, great for kayaking",
    latitude: 7.2906,
    longitude: 80.6337,
  },
  {
    id: 10,
    name: "Cinnamon Lodge Habarana",
    type: "hotel",
    location: "Habarana",
    image: "/luxury-nature-resort-sri-lanka-lake.jpg",
    rating: 4.6,
    reviews: 164,
    description: "Tranquil resort surrounded by nature",
    latitude: 8.0336,
    longitude: 80.7511,
  },
  {
    id: 11,
    name: "Yala National Park Camping",
    type: "camp-site",
    location: "Yala, Southern Province",
    image: "/yala-national-park-camping-leopard.jpg",
    rating: 4.9,
    reviews: 231,
    description: "Wildlife camping with leopard sightings",
    latitude: 6.3725,
    longitude: 81.5194,
  },
  {
    id: 12,
    name: "Dunhinda Falls",
    type: "waterfall",
    location: "Badulla",
    image: "/dunhinda-waterfall-mist-sri-lanka.jpg",
    rating: 4.6,
    reviews: 94,
    description: "Misty waterfall with jungle trek",
    latitude: 6.9667,
    longitude: 81.0667,
  },
]

const categories: Record<string, { name: string; color: string }> = {
  "camp-site": { name: "Camp Site", color: "bg-primary" },
  waterfall: { name: "Waterfall", color: "bg-accent" },
  river: { name: "River", color: "bg-chart-2" },
  hotel: { name: "Hotel", color: "bg-secondary" },
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function NearbyPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>({
    lat: 6.9271,
    lon: 79.8612,
  })
  const [radius, setRadius] = useState([25])
  const [isLoading, setIsLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [nearbyPlaces, setNearbyPlaces] = useState<Array<(typeof allPlaces)[0] & { distance: number }>>([])
  const [usingDefaultLocation, setUsingDefaultLocation] = useState(true)

  useEffect(() => {
    if (userLocation) {
      findNearbyPlaces(userLocation.lat, userLocation.lon, radius[0])
    }
  }, [])

  const getUserLocation = () => {
    setIsLoading(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        setUserLocation(location)
        setUsingDefaultLocation(false)
        setIsLoading(false)
        findNearbyPlaces(location.lat, location.lon, radius[0])
      },
      (error) => {
        console.log("[v0] Geolocation not available, using default location (Colombo)")
        setLocationError("Could not get your location. Showing places near Colombo, Sri Lanka.")
        setIsLoading(false)
        if (userLocation) {
          findNearbyPlaces(userLocation.lat, userLocation.lon, radius[0])
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  }

  const findNearbyPlaces = (lat: number, lon: number, maxDistance: number) => {
    const placesWithDistance = allPlaces
      .map((place) => ({
        ...place,
        distance: calculateDistance(lat, lon, place.latitude, place.longitude),
      }))
      .filter((place) => place.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)

    setNearbyPlaces(placesWithDistance)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Trees className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Avidimu Lanka</span>
          </Link>

          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nearby Places</h1>
          <p className="text-muted-foreground">Discover natural wonders near your current location</p>
        </div>

        {/* Location Controls */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  {usingDefaultLocation ? "Default Location (Colombo)" : "Your Location"}
                </h2>
                {userLocation && (
                  <p className="text-sm text-muted-foreground">
                    {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
                  </p>
                )}
              </div>
              <Button onClick={getUserLocation} disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4" />
                    {usingDefaultLocation ? "Use My Location" : "Update Location"}
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          {userLocation && (
            <CardContent>
              <div className="space-y-4">
                {usingDefaultLocation && (
                  <div className="bg-muted/50 border border-border rounded-lg p-3 mb-4">
                    <p className="text-sm text-muted-foreground">
                      Using Colombo as the default location. Click "Use My Location" to find places near you.
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Search Radius: {radius[0]} km</Label>
                  </div>
                  <Slider value={radius} onValueChange={setRadius} min={5} max={100} step={5} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 km</span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Error Message */}
        {locationError && (
          <Card className="mb-8 bg-muted/50">
            <CardContent className="py-6">
              <p className="text-muted-foreground text-center">{locationError}</p>
            </CardContent>
          </Card>
        )}

        {nearbyPlaces.length > 0 && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-foreground">Map View</h2>
                <p className="text-sm text-muted-foreground">Click markers to view details</p>
              </CardHeader>
              <CardContent>
                <LeafletMap
                  places={nearbyPlaces}
                  center={userLocation ? [userLocation.lat, userLocation.lon] : undefined}
                  zoom={9}
                  height="450px"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {!userLocation && !locationError && (
          <Card>
            <CardContent className="py-12 text-center">
              <Navigation className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Click "Use My Location" to find nearby places</p>
              <p className="text-sm text-muted-foreground">You'll need to allow location access in your browser</p>
            </CardContent>
          </Card>
        )}

        {userLocation && nearbyPlaces.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No places found within {radius[0]} km of your location.</p>
              <p className="text-sm text-muted-foreground mt-2">Try increasing the search radius.</p>
            </CardContent>
          </Card>
        )}

        {nearbyPlaces.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Found {nearbyPlaces.length} {nearbyPlaces.length === 1 ? "place" : "places"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPlaces.map((place) => (
                <Link key={place.id} href={`/place/${place.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-background/90 text-foreground border-0">
                        {categories[place.type].name}
                      </Badge>
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
                        {place.distance.toFixed(1)} km away
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <h3 className="text-xl font-semibold text-card-foreground mb-1">{place.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                        {place.location}
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground">{place.description}</p>
                    </CardContent>

                    <CardFooter className="flex items-center gap-4 pt-0">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-foreground">{place.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{place.reviews} reviews</span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
