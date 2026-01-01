"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import type { Comment } from "@/lib/dummy-data"

interface CommentSectionProps {
    comments: Comment[]
}

export function CommentSection({ comments: initialComments }: CommentSectionProps) {
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const comment: Comment = {
            id: Math.random().toString(),
            user: {
                id: "me",
                name: "Me",
                avatar: "",
            },
            content: newComment,
            createdAt: "Just now",
        }

        setComments([...comments, comment])
        setNewComment("")
    }

    if (comments.length === 0) {
        return (
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 h-8 text-sm"
                />
                {newComment.trim() && (
                    <Button type="submit" size="sm" variant="ghost" className="h-8 px-2 text-primary">
                        Post
                    </Button>
                )}
            </form>
        )
    }

    return (
        <div className="space-y-4 mt-4">
            <div className="space-y-3 pl-1">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 text-sm group">
                        <span className="font-semibold shrink-0">{comment.user.name}</span>
                        <div className="flex-1">
                            <span className="text-foreground/90">{comment.content}</span>
                        </div>
                        {/* <span className="text-xs text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {comment.createdAt}
            </span> */}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 items-center border-t border-border pt-4">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 border-none shadow-none focus-visible:ring-0 px-0 h-auto py-2"
                />
                <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="h-auto px-2 font-semibold text-primary disabled:opacity-50"
                    disabled={!newComment.trim()}
                >
                    Post
                </Button>
            </form>
        </div>
    )
}
