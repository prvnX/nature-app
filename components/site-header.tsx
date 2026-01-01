import Link from "next/link"
import { Trees, Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Trees className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold text-foreground">Avidimu Lanka</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/#discover"
                        className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                        Discover
                    </Link>
                    <Link
                        href="/feed"
                        className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                        Feed
                    </Link>
                    <Link
                        href="/nearby"
                        className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                        Nearby
                    </Link>
                    <Link
                        href="/add-place"
                        className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                        Add Place
                    </Link>
                    <Link
                        href="/login"
                        className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                        Sign In
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <Link href="/add-place" className="hidden sm:block">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Place
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="flex flex-col gap-4 mt-6">
                                <Link href="/" className="text-lg font-medium">
                                    Home
                                </Link>
                                <Link href="/feed" className="text-lg font-medium">
                                    Social Feed
                                </Link>
                                <Link href="/nearby" className="text-lg font-medium">
                                    Nearby
                                </Link>
                                <Link href="/add-place" className="text-lg font-medium">
                                    Add Place
                                </Link>
                                <Link href="/login" className="text-lg font-medium">
                                    Sign In
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
