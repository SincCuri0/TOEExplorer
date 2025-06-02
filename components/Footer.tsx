import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 via-accent/50 to-primary/70"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">TOE Explorer</h3>
          <p className="text-sm text-muted-foreground">
            An interactive platform for exploring and comparing Theories of Everything and metaphysical frameworks.
          </p>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} TOE Explorer. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="h-1 w-1 rounded-full bg-primary/70"></div>
            <p className="text-sm text-muted-foreground">
              Designed for knowledge, built for discovery
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}