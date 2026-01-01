import Link from "next/link"
import { notFound } from "next/navigation"
import { Trees, MapPin, Star, Calendar, Info, ArrowLeft, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ReviewForm } from "@/components/review-form"
import { ReviewList } from "@/components/review-list"

// Mock data - in real app, this would come from database
const places = [
  {
    id: 1,
    name: "Ella Rock",
    type: "camp-site",
    location: "Ella, Uva Province",
    image: "/ella-rock-sri-lanka-mountains.jpg",
    rating: 4.8,
    reviews: 127,
    description:
      "Ella Rock is one of the most popular hiking destinations in Sri Lanka, offering breathtaking panoramic views of the surrounding valleys, tea plantations, and the iconic Ella Gap. The hike takes approximately 2-3 hours and is moderate in difficulty, making it suitable for most fitness levels.",
    latitude: 6.871,
    longitude: 81.0567,
    features: ["Parking available", "Local guides", "Tea plantation views", "Photo opportunities"],
    bestTime: "November to April (Dry season)",
    addedBy: "Traveler123",
    addedDate: "2025-12-15",
  },
  {
    id: 2,
    name: "Diyaluma Falls",
    type: "waterfall",
    location: "Koslanda, Badulla District",
    image: "/diyaluma-waterfall-sri-lanka.jpg",
    rating: 4.9,
    reviews: 94,
    description:
      "Diyaluma Falls is the second highest waterfall in Sri Lanka at 220 meters. The upper pool offers a natural infinity pool experience with stunning views. The journey to the top requires a moderate hike but rewards visitors with spectacular scenery and refreshing natural pools.",
    latitude: 6.7833,
    longitude: 81.0333,
    features: ["Natural pools", "Swimming allowed", "Scenic hiking trail", "Waterfall photography"],
    bestTime: "December to March",
    addedBy: "NatureLover",
    addedDate: "2025-11-20",
  },
  {
    id: 3,
    name: "Kelani River",
    type: "river",
    location: "Kitulgala, Sabaragamuwa",
    image: "/kelani-river-rafting-sri-lanka.jpg",
    rating: 4.6,
    reviews: 156,
    description:
      "The Kelani River at Kitulgala is famous for white water rafting and was the filming location for the movie 'The Bridge on the River Kwai'. The river offers exciting rapids suitable for both beginners and experienced rafters, surrounded by lush rainforest.",
    latitude: 6.9897,
    longitude: 80.4177,
    features: ["White water rafting", "Kayaking", "Bird watching", "Rainforest trekking"],
    bestTime: "May to December (Monsoon season for best rapids)",
    addedBy: "AdventureSeeker",
    addedDate: "2025-10-05",
  },
  {
    id: 4,
    name: "Jetwing Vil Uyana",
    type: "hotel",
    location: "Sigiriya, Central Province",
    image: "/luxury-eco-resort-sri-lanka-sigiriya.jpg",
    rating: 4.9,
    reviews: 203,
    description:
      "Jetwing Vil Uyana is a luxury eco-resort nestled in the cultural heartland of Sri Lanka, near the ancient rock fortress of Sigiriya. The resort features unique dwellings built on marshland, paddy fields, and forest, offering an immersive nature experience with world-class comfort.",
    latitude: 7.9403,
    longitude: 80.7514,
    features: ["Luxury eco-resort", "Nature trails", "Bird sanctuary", "Spa services", "Fine dining"],
    bestTime: "Year-round",
    addedBy: "LuxuryTravel",
    addedDate: "2025-09-12",
  },
  {
    id: 5,
    name: "Ravana Falls",
    type: "waterfall",
    location: "Ella, Uva Province",
    image: "/ravana-falls-sri-lanka.jpg",
    rating: 4.5,
    reviews: 89,
    description:
      "Ravana Falls is a popular waterfall located along the main road between Ella and Wellawaya. Named after the legendary King Ravana from the Ramayana epic, this 25-meter waterfall is easily accessible and offers a refreshing stop during your journey through the hill country.",
    latitude: 6.8428,
    longitude: 81.0544,
    features: ["Easy access", "Swimming area", "Roadside attraction", "Food stalls nearby"],
    bestTime: "October to March",
    addedBy: "RoadTripper",
    addedDate: "2025-08-30",
  },
  {
    id: 6,
    name: "Knuckles Mountain Range",
    type: "camp-site",
    location: "Matale & Kandy Districts",
    image: "/knuckles-mountain-range-camping-sri-lanka.jpg",
    rating: 4.7,
    reviews: 112,
    description:
      "The Knuckles Mountain Range is a UNESCO World Heritage Site known for its biodiversity and stunning landscapes. Popular for multi-day camping and trekking, the area features cloud forests, grasslands, and numerous peaks offering incredible views. Perfect for experienced hikers seeking adventure.",
    latitude: 7.45,
    longitude: 80.7833,
    features: ["Camping sites", "Multiple trekking routes", "Endemic species", "Village homestays"],
    bestTime: "January to March",
    addedBy: "MountainExplorer",
    addedDate: "2025-07-18",
  },
]

const mockReviews = [
  {
    id: 1,
    placeId: 1,
    rating: 5,
    reviewerName: "Sarah Johnson",
    reviewText:
      "Absolutely stunning hike! The views from Ella Rock are breathtaking. Started early morning and caught the sunrise - highly recommend. The trail is well-marked and locals are very helpful with directions.",
    date: "2026-01-15",
    helpful: 24,
  },
  {
    id: 2,
    placeId: 1,
    rating: 4,
    reviewerName: "Michael Chen",
    reviewText:
      "Great hiking experience. The trail can be a bit muddy after rain, so wear good shoes. Took us about 2.5 hours at a leisurely pace. The tea plantations along the way are beautiful!",
    date: "2026-01-10",
    helpful: 18,
  },
  {
    id: 3,
    placeId: 1,
    rating: 5,
    reviewerName: "Priya Patel",
    reviewText:
      "One of the best hikes in Sri Lanka! We hired a local guide who showed us shortcuts and shared interesting stories about the area. Worth every step!",
    date: "2025-12-28",
    helpful: 31,
  },
  {
    id: 4,
    placeId: 2,
    rating: 5,
    reviewerName: "David Williams",
    reviewText:
      "Diyaluma Falls exceeded all expectations! The upper pools are amazing for swimming. The hike to the top is challenging but totally worth it. Go early to avoid crowds.",
    date: "2026-01-12",
    helpful: 27,
  },
  {
    id: 5,
    placeId: 2,
    rating: 4,
    reviewerName: "Emma Brown",
    reviewText:
      "Beautiful waterfall with natural infinity pools at the top. The water was refreshing and the views incredible. Be careful on the rocks as they can be slippery!",
    date: "2026-01-05",
    helpful: 19,
  },
]

const categories: Record<string, { name: string; color: string }> = {
  "camp-site": { name: "Camp Site", color: "bg-primary" },
  waterfall: { name: "Waterfall", color: "bg-accent" },
  river: { name: "River", color: "bg-chart-2" },
  hotel: { name: "Hotel", color: "bg-secondary" },
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const place = places.find((p) => p.id === Number.parseInt(id))

  if (!place) {
    notFound()
  }

  const placeReviews = mockReviews.filter((review) => review.placeId === place.id)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Trees className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">WildSriLanka</span>
          </Link>

          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img src={place.image || "/placeholder.svg"} alt={place.name} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge className={`${categories[place.type].color} text-white border-0 mb-4`}>
              {categories[place.type].name}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-balance">{place.name}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{place.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Rating Section */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 fill-primary text-primary" />
                <span className="text-3xl font-bold text-foreground">{place.rating}</span>
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium">{place.reviews}</span> reviews
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Place</h2>
              <p className="text-muted-foreground leading-relaxed">{place.description}</p>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {place.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Best Time to Visit */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Best Time to Visit
              </h2>
              <p className="text-muted-foreground">{place.bestTime}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Reviews ({placeReviews.length})</h2>
              <div className="space-y-8">
                {/* Review List */}
                <ReviewList reviews={placeReviews} />

                {/* Review Form */}
                <ReviewForm placeId={place.id} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Location Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <div className="mb-2">
                      <strong className="text-foreground">Coordinates:</strong>
                    </div>
                    <div>Lat: {place.latitude}</div>
                    <div>Long: {place.longitude}</div>
                  </div>

                  <Button className="w-full gap-2">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </Button>

                  {/* Map Placeholder */}
                  <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground text-sm">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p>Map will display here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Added by</div>
                    <div className="font-medium text-foreground">{place.addedBy}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-muted-foreground mb-1">Date added</div>
                    <div className="font-medium text-foreground">{place.addedDate}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button variant="outline" className="w-full bg-transparent">
                Report an Issue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
