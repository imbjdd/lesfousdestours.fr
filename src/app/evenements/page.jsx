import Layout from '@/components/Layout'
import { load, getDocuments } from 'outstatic/server'
import ContentGrid from '@/components/ContentGrid'
import markdownToHtml from '@/lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'

export default async function Index() {
  const seances_data = await getData()
  const bar_echecs = await getData2()

  const day_to_number = {
    'lundi': 1,
    'mardi': 2,
    'mercredi' : 3,
    'jeudi' : 4,
    'vendredi' : 5,
    'samedi' : 6,
    'dimanche' : 7
  }

  function nextSeances() {
    const dates = []
    for(const seance of seances_data) {
      // pour savoir si on part de DateTime.now() ou bien plutôt de startDate, on part du maximum entre les deux
      let date_used;
      if(DateTime.now().toISO() > DateTime.fromFormat(seance.startDate, "dd/LL/yyyy").toISO()) {
        date_used = DateTime.now()
      }
      else {
        date_used = DateTime.fromFormat(seance.startDate, "dd/LL/yyyy")
      }

      const today = date_used.weekday
      const jour = seance.jour
      const days_until = (day_to_number[jour] - today + 7) % 7;


      for(let i = 0; i < 8; i++) {
        const date = date_used.plus({days: days_until + 7*i})
        dates.push({
          title: 'Séance hebdomadaire',
          place: 'Jussieu',
          jour: seance.jour,
          date: '17h00 à 19h00',
          iso: date.toISO()
        })
      }
    }
    return dates.sort((a,b) => a.iso < b.iso ? -1 : 1)
  }

  const events = nextSeances()

  const evenements = bar_echecs

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5">
        <Header /> 

        <section className="mt-8 lg:mt-16 mb-4 lg:pt-6 pb-6 lg:pb-24">
          <div class="flex">
            <div className="prose lg:prose-xl">
              <h1>Horaires</h1>
              <p>Nous avons des séances régulières sur les différents campus durant l'année universitaire (pas de séance durant les vacances !). Durant les vacances, il est possible que nous organisons des bar-échecs, ils figureront dans événements. De plus tout au long de l'année nous organisons des tournois.</p>
            </div>
          </div>
          <div className="mt-12">
            <div className="prose lg:prose-xl">
              <h2>Nos séances hebdomadaires</h2>
            </div>
            <div className="flex flex-col pt-2 gap-4"> 
            {seances_data.map(seance => (
              <div className="text-xl p-4 bg-[#E9D056] rounded-lg border-black border-2 w-fit hover:bg-[#EBD567]">
                <p className="text-xl font-bold">{seance.place}</p>
                <p>Le <span className="font-bold">{seance.jour}</span> de <span className="font-bold">{seance.horaire}</span></p>
                <p>Lieu : <span className="font-bold">{seance.lieu}</span></p>
              </div>
            ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2"> 
            <div className="prose lg:prose-xl">
              <h2>Nos prochains événements</h2>
            </div>
            {evenements.length === 0 && (
              <div className="prose lg:prose-xl">
                <p>Pas d'événement prévu pour le moment. Revenez plus tard, ça ne devrait pas tarder. :(</p>
              </div>
            )}
          </div>
            <div className="flex flex-col pt-2 gap-4"> 
            {evenements.map(seance => (
              <div className="text-xl p-4 rounded-lg border-black border-2 w-fit bg-blue-400 hover:bg-blue-400/90">
                <p className="text-xl font-bold">{seance.place}</p>
                <p>Le <span className="font-bold">{seance.jour}</span> de <span className="font-bold">{seance.horaire}</span></p>
                <p>Lieu : <span className="font-bold">{seance.lieu}</span></p>
              </div>
            ))}
            </div>
        </section>
      </div>
    </Layout>
  )
}

async function getData() {
  const db = await load()

  const posts = getDocuments('seances-hebdomadaires', ['title', 'content', 'lieu', 'startDate', 'endDate', 'horaire'])
  console.log('#'.repeat(400))
  console.log(posts)
  const processing = posts.map(x => {
    x.jour = x.title.split(' ')[0].toLowerCase()
    x.place = x.title.split(' ').slice(1).join(' ')
    return x
  })
  console.log(processing)
  return processing
}

async function getData2() {
  const db = await load()

  const posts = getDocuments('bar-echecs', ['title', 'content', 'lieu', 'startDate', 'endDate', 'horaire'])
  console.log('ouais')
  console.log('-'.repeat(400))
  console.log(posts)
  const processing = posts.map(x => {
    x.jour = x.title.split(' ')[0].toLowerCase()
    x.place = x.title.split(' ').slice(1).join(' ')
    return x
  })
  console.log(processing)
  return processing
}