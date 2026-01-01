import { SiteHeader } from "@/components/site-header"
import { FeedPost } from "@/components/feed/feed-post"
import { DUMMY_POSTS } from "@/lib/dummy-data"

export default function FeedPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            <SiteHeader />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="space-y-2 text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Social Feed</h1>
                        <p className="text-muted-foreground">See what's happening around you</p>
                    </div>

                    <div className="space-y-6">
                        {DUMMY_POSTS.map((post) => (
                            <FeedPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
