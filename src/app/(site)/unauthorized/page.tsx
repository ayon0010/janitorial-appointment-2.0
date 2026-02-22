import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">
          Access denied
        </h1>
        <p className="text-SlateBlue dark:text-darktext mb-6">
          You need admin rights to view this page.
        </p>
        <Link
          href="/"
          className="btn inline-flex items-center gap-2"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
