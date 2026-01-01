
export interface User {
    id: string
    name: string
    avatar: string
    location?: string
}

export interface Comment {
    id: string
    user: User
    content: string
    createdAt: string
}

export interface Post {
    id: string
    user: User
    image: string
    location: string
    caption: string
    likes: number
    hasLiked: boolean
    comments: Comment[]
    createdAt: string
}

export const DUMMY_POSTS: Post[] = [
    {
        id: "1",
        user: {
            id: "u1",
            name: "Sahan Perera",
            avatar: "/placeholder-user.jpg", // We'll need a placeholder or use initials
        },
        image: "/ella-rock-sri-lanka-mountains.jpg",
        location: "Ella, Sri Lanka",
        caption: "Morning hike to Ella Rock! The view is absolutely breathtaking. 🌄 #Ella #SriLanka #Hiking",
        likes: 124,
        hasLiked: false,
        comments: [
            {
                id: "c1",
                user: { id: "u2", name: "Malini De Silva", avatar: "" },
                content: "Wow, look at those clouds!",
                createdAt: "2h ago",
            },
            {
                id: "c2",
                user: { id: "u3", name: "Kasun Raj", avatar: "" },
                content: "Is it slippery today?",
                createdAt: "1h ago",
            },
        ],
        createdAt: "3 hours ago",
    },
    {
        id: "2",
        user: {
            id: "u4",
            name: "Nimali Fernando",
            avatar: "",
        },
        image: "/diyaluma-waterfall-sri-lanka.jpg",
        location: "Diyaluma Falls",
        caption: "Chasing waterfalls this weekend. Best place to cool off! 💦",
        likes: 89,
        hasLiked: true,
        comments: [],
        createdAt: "5 hours ago",
    },
    {
        id: "3",
        user: {
            id: "u5",
            name: "Travel with Aruna",
            avatar: "",
        },
        image: "/yala-national-park-camping-leopard.jpg",
        location: "Yala National Park",
        caption: "Spotted this majestic leopard during our safari today! 🐆",
        likes: 452,
        hasLiked: false,
        comments: [
            {
                id: "c3",
                user: { id: "u6", name: "Wildlife Lover", avatar: "" },
                content: "Incredible shot!",
                createdAt: "30m ago",
            },
        ],
        createdAt: "1 day ago",
    },
]
