'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import UserBadge from '@/app/components/UserBadge'

export function Header() {
  return (
    <header className="fixed w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold gradient-text">
          TOE Explorer
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/explorer" className="text-muted-foreground hover:text-foreground transition-colors">
            Explorer
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/contribute" className="text-muted-foreground hover:text-foreground transition-colors">
            Contribute
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <UserBadge />
          <Button variant="outline" size="sm">Login</Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}
