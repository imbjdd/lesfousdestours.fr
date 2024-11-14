import Image from "next/image";
import WhatsApp from "@/../public/images/WhatsApp.svg";
import Discord from "@/../public/images/Discord.svg";
import Instagram from "@/../public/images/Instagram.svg";
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black relative text-white h-80 overflow-hidden border-t border-neutral-200">
      <div className="z-10 relative max-w-6xl mx-auto px-5 p-10 flex flex-col gap-2">
        <h3 className="opacity-90 font-semibold text-2xl mb-10 lg:mb-0 lg:pr-4">
          Les Fous des Tours
        </h3>
        <p className="opacity-90">Association loi 1901</p>
        <div className="flex pt-2 gap-2">
          <a href="https://chat.whatsapp.com/Jvv7BGlBlKjHbz6LM5x2ZA" target="_blank">
            <div className="p-3 bg-zinc-900 rounded-full border border-zinc-800 hover:border-zinc-600 hover:rotate-180 transition ease-in-out duration-300">
              <Image className="opacity-90" width={24} src={WhatsApp} alt="WhatsApp logo" />
            </div>
          </a>
          <a href="https://discord.gg/3HyjfNY2Bw" target="_blank">
            <div className="p-3 bg-zinc-900 rounded-full border border-zinc-800 hover:border-zinc-600 hover:rotate-180 transition ease-in-out duration-300">
              <Image className="opacity-90" width={24} src={Discord} alt="Discord logo" />
            </div>
          </a>
          <a href="https://www.instagram.com/lesfousdestours/" target="_blank">
            <div className="p-3 bg-zinc-900 rounded-full border border-zinc-800 hover:border-zinc-600 hover:rotate-180 transition ease-in-out duration-300">
              <Image className="opacity-90" width={24} src={Instagram} alt="Instagram logo" />
            </div>
          </a>
        </div>
        <Link className="hover:underline" href="/mentions-legales">Mentions légales</Link>
      </div>
      <img className="absolute z-0 bottom-0 opacity-10 left-1/2 -translate-x-1/2" src="/images/footer.png" />

    </footer>
  )
}

export default Footer
