import Link from "next/link"
import { MapPin, Waves, Trees, Hotel, Plus, Search, Star, Map } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlacesMap } from "@/components/places-map"

const places = [
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

const categories = [
  { id: "camp-site", name: "Camp Sites", icon: Trees, color: "bg-primary" },
  { id: "waterfall", name: "Waterfalls", icon: Waves, color: "bg-accent" },
  { id: "river", name: "Rivers", icon: Waves, color: "bg-chart-2" },
  { id: "hotel", name: "Hotels", icon: Hotel, color: "bg-secondary" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl mb-6">
              Discover Sri Lanka's Hidden Natural Wonders
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl mb-8">
              Explore and share the best camp sites, waterfalls, rivers, and nature hotels across the island
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search for places..." className="pl-10 h-12" />
              </div>
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/nearby">
                  <MapPin className="mr-2 h-4 w-4" />
                  Near Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className={`${category.color} p-3 rounded-full text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Explore on Map</h2>
              <p className="text-muted-foreground">Click any marker to view place details</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/nearby">
                <Map className="mr-2 h-4 w-4" />
                View Nearby
              </Link>
            </Button>
          </div>
          <PlacesMap places={places} />
        </div>
      </section>

      {/* Places Grid */}
      <section id="discover" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Popular Places</h2>
            <p className="text-muted-foreground">Discover the most loved destinations in Sri Lanka</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Link key={place.id} href={`/place/${place.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/90 text-foreground border-0">
                      {categories.find((c) => c.id === place.type)?.name}
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
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Trees className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Avidimu Lanka</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Your community-driven platform to discover and share the natural beauty of Sri Lanka
            </p>
            <div className="text-xs text-muted-foreground">© 2026 Avidimu Lanka. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
