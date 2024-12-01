import Link from 'next/link'

const Banner = () => {
  return (
    <div className="w-full bg-black text-white p-2 font-bold text-sm text-center">
      <p>Nous organisons notre premier tournoi interne ce samedi 07/12. Rejoignez-nous et inscrivez-vous sur cette <Link className="text-[#E9D056]" href="/tournoi">page</Link>.</p>
    </div>
  )
}

export default Banner
