export default function App() {
  return (
    <div className="relative isolate px-6 pt-8 lg:px-8">
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Welcome To License Status Dashboard
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            This is a dashboard to check the status of your licenses.
            You can check the status of your licenses by clicking the button below.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white
                shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="https://github.com/MarcoLin01/license-status-dashboard" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
