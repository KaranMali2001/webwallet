/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/57tVXrCwFPw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Syne } from 'next/font/google'
import { Rethink_Sans } from 'next/font/google'

syne({
  subsets: ['latin'],
  display: 'swap',
})

rethink_sans({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link";

export function Web3LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800  ">
      <header className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-6">
        <Link href="#" prefetch={false}>
          <MountainIcon className="h-6 w-6 dark:text-primary-foreground" />
          <span className="sr-only">Crypto Wallet</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl dark:text-primary-foreground">
              Secure Your Crypto with Ease
            </h1>
            <p className="mt-4 text-muted-foreground dark:text-muted-foreground-dark sm:text-xl">
              Manage your digital assets with our intuitive and secure crypto
              wallet.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="text-2xl inline-flex h-10 items-center justify-center rounded-md bg-primary px-6  font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Login with Mnemonic
              </Link>
              <Link
                href="/secret-phrase"
                className="text-2xl inline-flex h-10 items-center justify-center rounded-md border border-input bg-background dark:bg-background-dark px-6  font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Create New Mnemonic
              </Link>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl dark:text-primary-foreground">
                  Secure Your Crypto
                </h2>
                <p className="text-muted-foreground dark:text-muted-foreground-dark sm:text-xl">
                  Our crypto wallet uses industry-leading security measures to
                  protect your digital assets.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary dark:text-primary-foreground hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Learn More
                  <ArrowRightIcon className="h-4 w-4 dark:text-primary-foreground" />
                </Link>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl dark:text-primary-foreground">
                  Manage Your Portfolio
                </h2>
                <p className="text-muted-foreground dark:text-muted-foreground-dark sm:text-xl">
                  Track your crypto investments and monitor your portfolio
                  performance.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary dark:text-primary-foreground hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Learn More
                  <ArrowRightIcon className="h-4 w-4 dark:text-primary-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted dark:bg-muted-dark p-6 sm:p-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
            &copy; 2024 Crypto Wallet. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground dark:text-muted-foreground-dark hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground dark:text-muted-foreground-dark hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
