"use client"

import type React from "react"
import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewFormProps {
  placeId: number
  onReviewSubmitted?: () => void
}

export function ReviewForm({ placeId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Review submitted for place:", placeId)
    setIsSubmitting(false)
    setRating(0)
    ;(e.target as HTMLFormElement).reset()

    if (onReviewSubmitted) {
      onReviewSubmitted()
    }

    alert("Review submitted successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating) ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && <p className="text-sm text-muted-foreground">You rated this {rating} out of 5 stars</p>}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="reviewerName">Your Name *</Label>
            <Input id="reviewerName" name="reviewerName" placeholder="Enter your name" required />
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="reviewText">Your Review *</Label>
            <Textarea
              id="reviewText"
              name="reviewText"
              placeholder="Share your experience at this place..."
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting || rating === 0} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
