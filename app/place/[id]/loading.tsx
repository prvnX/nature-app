export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 border-b border-border animate-pulse bg-muted/30" />
      <div className="h-[500px] animate-pulse bg-muted/30" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-12 animate-pulse bg-muted/30 rounded" />
            <div className="h-32 animate-pulse bg-muted/30 rounded" />
            <div className="h-48 animate-pulse bg-muted/30 rounded" />
          </div>
          <div className="lg:col-span-1">
            <div className="h-96 animate-pulse bg-muted/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
