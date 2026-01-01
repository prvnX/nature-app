import { Star, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Review {
  id: number
  rating: number
  reviewerName: string
  reviewText: string
  date: string
  helpful: number
}

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={review.id}>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-foreground mb-1">{review.reviewerName}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed">{review.reviewText}</p>

                {/* Helpful Button */}
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {index < reviews.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
