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
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Index() {
  const ref = useRef(null);
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = React.useState(null);

  const onCaptchaChange = (token) => setCaptchaToken(token);
  const onCaptchaExpire = () => setCaptchaToken(null);

  const [tournament, setTournament] = React.useState([]);
  const nameRef = useRef();
  const mailRef = useRef();
  const phoneRef = useRef();
  const [inscriptionEtat, setInscriptionEtat] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [idUnique, setIdUnique] = React.useState('')

  const sendEmail = async (name, email, phone_number) => {
    const response = await fetch('/api/send-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        tournament_id: tournament.id,
        phone_number: phone_number,
        token: captchaToken
      }),
    })

    const result = await response.json();
    console.log(result);

    // s'il y a une erreur
    if(!result.message) {
      setInscriptionEtat(true)
      setIdUnique(result[0].id)
    }
    else {
      setMessage(result.message)
    }
  };

  async function handleClick() {
    sendEmail(nameRef.current.value, mailRef.current.value, phoneRef.current.value)
  }

  React.useEffect(() => {
    async function fetchTournaments() {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
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
          <div className="flex flex-col">
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
                {message && (
                  <p className="text-red-500">{message}</p>
                )}
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
                <HCaptcha
                  sitekey="3a3890fa-6b84-4860-af56-d6a49a64ff96"
                  onVerify={onCaptchaChange}
                  ref={captchaRef}
                  onExpire={onCaptchaExpire}
                />
                <button onClick={handleClick} className="w-fit px-4 py-4 bg-[#E9D056] rounded-lg font-bold hover:bg-[#ebd567] text-black">Envoyer</button>
              </div>
            )}
            {inscriptionEtat && (
              <div className="flex flex-col gap-4">
                <p>N'oubliez pas de venir, et de nous contacter si vous ne pouvez pas venir. :)</p>
                <p>Voilà votre id unique : <span className="font-bold">{idUnique}</span>. Il vous est également envoyé par mail.</p>
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