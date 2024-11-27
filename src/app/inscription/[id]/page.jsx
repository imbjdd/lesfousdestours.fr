'use client'

import ContentGrid from '@/components/ContentGrid'
import markdownToHtml from '@/lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'


export default function Index({params}) {
  const [data, setData] = useState({status:false})
  const getRegistration = async () => {
    const response = await fetch('/api/get-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: params.id
      }),
    })

    console.log(response)

    const result = await response.json();
    console.log(result);

    setData({
      status: result[0].name != undefined,
      data: result[0]
    })
  }
  
  useEffect(() => {
    getRegistration()
  }, [])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-5">
        <Header /> 

        <section className="mt-8 lg:mt-16 mb-4 lg:pt-6 pb-6 lg:pb-24">
          <div className="flex">
            <div className="prose lg:prose-xl">
              <h1>Inscription</h1>
              {data.status && (
                <div>
                  <p>Salut {data.data.name}, tu es bien inscrit. :)</p>
                </div>
              )}
              {!data.status && (
                <div>
                  <p>Salut, tu n'as pas l'air d'être inscrit dans la base de donneés (ou bien il y a un bug, ce qui est assez probable). Je t'invite à envoyer un petit message à un admin sur le groupe WhatsApp !</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}