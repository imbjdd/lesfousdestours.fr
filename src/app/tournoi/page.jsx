'use client'

import React from 'react';
import { useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout'
import ContentGrid from '@/components/ContentGrid'
import markdownToHtml from '@/lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'
import Image from 'next/image'
import profilePic from '@/../public/images/inscription.webp'

export default function Index() {
  const [tournament, setTournament] = React.useState([]);
  const nameRef = useRef();
  const mailRef = useRef();
  const phoneRef = useRef();
  const [inscriptionEtat, setInscriptionEtat] = React.useState(false)

  async function handleClick() {
    console.log('increment like count');
    console.log(nameRef.current.value)

    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          name: nameRef.current.value,
          email: mailRef.current.value,
          tournament_id: tournament.id,
          phone_number: phoneRef.current.value,
        },
      ]);

    if (error) {
      console.error('Error:', error);
      console.log(data)
    } else {
      console.log('Inscription réussie:', data);
      setInscriptionEtat(true)
    }
  }

  React.useEffect(() => {
    async function fetchTournaments() {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*');

        console.log(data)

      if (error) {
        console.error(error);
      } else {
        setTournament(data[0]);
      }
    }

    fetchTournaments();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5">
        <Header /> 

        <section className="mt-8 lg:mt-16 mb-4 lg:pt-6 pb-6 lg:pb-24">
          <div class="flex flex-col">
            <div className="prose lg:prose-xl">
              <h1>{tournament.name}</h1>
              <p>{tournament.description}</p>
              {!inscriptionEtat && (
                <h2>S'inscrire</h2>
              )}
              {inscriptionEtat && (
                <h2>Vous êtes inscrits</h2>
              )}
            </div>
            {!inscriptionEtat && (
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex text-zinc-400 flex-col relative border border-black bg-black rounded-lg">
                  <label className="px-4 text-sm py-2 absolute" for="cheese">Nom</label>
                  <input ref={nameRef} type="text" placeholder="Capablanca" id="name" className="z-20 pt-6 pb-2 text-white w-fit px-4 w-full bg-transparent rounded-lg border-none" name="name" required minlength="4" size="10" />
                </div>
                <div className="flex flex-col lg:flex-row w-full gap-2">
                  <div className="flex-1 flex text-zinc-400 flex-col relative border border-black bg-black rounded-lg">
                    <label className="px-4 text-sm py-2 absolute" for="cheese">E-mail</label>
                    <input ref={mailRef} type="text" placeholder="Capablanca" id="name" className="z-20 pt-6 pb-2 text-white w-fit px-4 w-full bg-transparent rounded-lg border-none" name="name" required minlength="4"  size="10" />
                  </div>
                  <div className="flex-1 flex text-zinc-400 flex-col relative border border-black bg-black rounded-lg">
                    <label className="px-4 text-sm py-2 absolute" for="cheese">Numéro de téléphone</label>
                    <input ref={phoneRef} type="text" placeholder="Capablanca" id="name" className="z-20 pt-6 pb-2 text-white w-fit px-4 w-full bg-transparent rounded-lg border-none" name="name" required minlength="4" size="10" />
                  </div>
                </div>
                <button onClick={handleClick} className="w-fit px-4 py-4 bg-[#E9D056] rounded-lg font-bold hover:bg-[#ebd567] text-black">Envoyer</button>
              </div>
            )}
            {inscriptionEtat && (
              <div className="flex flex-col gap-4">
                <p>N'oubliez pas de venir, et de nous contacter si vous ne pouvez pas venir. :)</p>
                <Image
                  src={profilePic}
                  className="rounded-lg border border-2 border-black"
                  alt="Gif rigolo qui te félicite quand tu t'inscris"/>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}