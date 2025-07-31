export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="w-full px-5 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js, Tailwind CSS, and shadcn/ui - Ryan Arbai
        </p>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} WeatherDashDemo</p>
      </div>
    </footer>
  );
}
