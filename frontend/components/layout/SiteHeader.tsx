import Link from 'next/link';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">WeatherDashDemo</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
