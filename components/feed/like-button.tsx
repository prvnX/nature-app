"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface LikeButtonProps {
    initialLikes: number
    initialHasLiked: boolean
}

export function LikeButton({ initialLikes, initialHasLiked }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes)
    const [hasLiked, setHasLiked] = useState(initialHasLiked)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleLike = () => {
        if (hasLiked) {
            setLikes(prev => prev - 1)
            setHasLiked(false)
        } else {
            setLikes(prev => prev + 1)
            setHasLiked(true)
            setIsAnimating(true)
            setTimeout(() => setIsAnimating(false), 300)
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="gap-2 group hover:bg-transparent p-0 h-auto"
            onClick={handleLike}
        >
            <div className={cn(
                "transition-transform duration-300",
                isAnimating ? "scale-125" : "scale-100"
            )}>
                <Heart
                    className={cn(
                        "h-6 w-6 transition-all duration-300",
                        hasLiked
                            ? "fill-green-600 text-green-600 drop-shadow-sm"
                            : "text-muted-foreground group-hover:text-green-600"
                    )}
                />
            </div>
            <span className={cn(
                "font-medium",
                hasLiked ? "text-foreground" : "text-muted-foreground"
            )}>
                {likes} likes
            </span>
        </Button>
    )
}
