import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { Toaster } from '@/components/ui/sonner' // Using shadcn/ui sonner toast
import { TooltipProvider } from '@/components/ui/tooltip'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={300}>
        <div className="flex flex-col">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>

          <SiteHeader />

          <main className="flex-1">
            <div className="w-full py-8">
              {children}
            </div>
          </main>

          <SiteFooter />

          <Toaster position="top-center" richColors />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}