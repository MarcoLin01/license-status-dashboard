import { useThemeMode } from 'flowbite-react'
import { ReactComponent as Sun } from './icon/Sun.svg'
import { ReactComponent as Moon } from './icon/Moon.svg'

export default function Header() {
  const { mode, setMode } = useThemeMode()

  function toggleTheme() {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center justify-between pb-4 dark:text-white">
      <div className="text-2xl font-bold">License Status Dashboard</div>
      <button
        onClick={toggleTheme}
        id="theme-toggle"
        type="button"
        className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none
          focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700
          dark:focus:ring-gray-700"
      >
        {mode === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}
