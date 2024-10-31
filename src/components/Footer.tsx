const Footer = () => {
  return (
    <footer className="bg-black relative text-white h-80 overflow-hidden border-t border-neutral-200">
      <img className="absolute bottom-0 opacity-10 left-1/2 -translate-x-1/2" src="/images/footer.png" />
      <div className="max-w-6xl mx-auto opacity-90 px-5 p-10">
        <h3 className="font-semibold text-2xl mb-10 lg:mb-0 lg:pr-4">
          Les Fous des Tours
        </h3>
        <p>Association loi 1901</p>
      </div>
    </footer>
  )
}

export default Footer
