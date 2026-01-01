export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {/* Animated wildlife silhouettes */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 animate-pulse">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary" fill="currentColor">
              {/* Elephant silhouette */}
              <path d="M50 20 C30 20 20 30 20 50 L20 70 L25 70 L25 60 C25 55 30 50 35 50 L35 70 L40 70 L40 50 C40 50 45 45 50 45 C55 45 60 50 60 50 L60 70 L65 70 L65 50 C70 50 75 55 75 60 L75 70 L80 70 L80 50 C80 30 70 20 50 20 Z M40 30 C40 27 42 25 45 25 C48 25 50 27 50 30 C50 33 48 35 45 35 C42 35 40 33 40 30 Z" />
            </svg>
          </div>
          <div className="absolute inset-0 animate-ping opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary" fill="currentColor">
              <circle cx="50" cy="50" r="30" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading wildlife wonders...</p>
        </div>
      </div>
    </div>
  )
}
