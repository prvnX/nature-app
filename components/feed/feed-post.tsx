import { MapPin, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { LikeButton } from "./like-button"
import { CommentSection } from "./comment-section"
import type { Post } from "@/lib/dummy-data"

interface FeedPostProps {
    post: Post
}

export function FeedPost({ post }: FeedPostProps) {
    return (
        <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 p-4">
                <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="font-semibold text-sm">{post.user.name}</div>
                    {post.location && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                            {post.location}
                        </div>
                    )}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>

            <div className="relative aspect-[4/3] w-full bg-muted">
                <img
                    src={post.image}
                    alt={post.caption}
                    className="object-cover w-full h-full"
                />
            </div>

            <CardContent className="p-4 pb-2">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <LikeButton initialLikes={post.likes} initialHasLiked={post.hasLiked} />
                        <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto hover:bg-transparent">
                            <MessageCircle className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto hover:bg-transparent">
                            <Share2 className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="text-sm">
                        <span className="font-semibold mr-2">{post.user.name}</span>
                        {post.caption}
                    </div>

                    <div className="text-xs text-muted-foreground pt-1">
                        {post.createdAt}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 block">
                <CommentSection comments={post.comments} />
            </CardFooter>
        </Card>
    )
}
