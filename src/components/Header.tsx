import Link from 'next/link'

const Header = () => {
  return (
    <nav className="layout flex items-center justify-between pt-8 w-full">
      <Link href="/" className="hover:underline">Les Fous des Tours</Link>
      <div className="flex justify-between space-x-4">
        <Link href="/#posts" className="hover:underline">
          A propos
        </Link>
        <Link href="/#projects" className="hover:underline">
          Evenements
        </Link>
        <Link href="/#projects" className="hover:underline">
          Tournoi inter-universitaire
        </Link>
      </div>
    </nav>
  )
}

export default Header
