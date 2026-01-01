"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Trees, MapPin, Upload, ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapLocationPicker } from "@/components/map-location-picker"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AddPlacePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [showMap, setShowMap] = useState(false)

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat.toFixed(6))
    setLongitude(lng.toFixed(6))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Form submitted")
    setIsSubmitting(false)

    alert("Place submitted successfully! It will be reviewed by our team.")
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

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Add a New Place</h1>
            <p className="text-muted-foreground">
              Share a hidden gem with the Avidimu Lanka community. Your contribution helps fellow travelers discover
              amazing places.
            </p>
          </div>

          <Alert className="mb-6 border-primary/50 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              <strong className="font-semibold text-foreground">Tip:</strong> Use the interactive map below to easily
              select the exact location by clicking on the map.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Place Details</CardTitle>
              <CardDescription>Fill in the information about the place you want to share</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4 pb-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Place Name *</Label>
                    <Input id="name" name="name" placeholder="e.g., Ella Rock" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Category *</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="camp-site">Camp Site</SelectItem>
                        <SelectItem value="waterfall">Waterfall</SelectItem>
                        <SelectItem value="river">River</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe what makes this place special..."
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4 pb-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Location</h3>

                  <div className="space-y-2">
                    <Label htmlFor="location">Address/Area *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., Ella, Uva Province"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Coordinates *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMap(!showMap)}
                        className="gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        {showMap ? "Hide Map" : "Pick on Map"}
                      </Button>
                    </div>

                    {showMap && (
                      <div className="rounded-lg border border-border overflow-hidden">
                        <MapLocationPicker onLocationSelect={handleLocationSelect} />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          name="latitude"
                          type="number"
                          step="any"
                          placeholder="6.8710"
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          name="longitude"
                          type="number"
                          step="any"
                          placeholder="81.0567"
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photos */}
                <div className="space-y-4 pb-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Photos</h3>

                  <div className="space-y-2">
                    <Label htmlFor="image">Upload Images (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
                        </div>
                        <input id="image" name="image" type="file" className="hidden" accept="image/*" multiple />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Additional Details (Optional)</h3>

                  <div className="space-y-2">
                    <Label htmlFor="features">Features & Amenities</Label>
                    <Textarea
                      id="features"
                      name="features"
                      placeholder="e.g., Parking available, Guides available, Food stalls nearby"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bestTime">Best Time to Visit</Label>
                    <Input id="bestTime" name="bestTime" placeholder="e.g., November to April" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Submitting..." : "Submit Place"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
