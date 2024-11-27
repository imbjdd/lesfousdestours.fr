import Layout from '../components/Layout'
import { load, getDocuments } from 'outstatic/server'
import ContentGrid from '../components/ContentGrid'
import markdownToHtml from '../lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'
import Link from 'next/link'

export default async function Index() {
  const { content, allPosts, allProjects } = await getDataBis()
/*  const events = [{
    title: 'Séance hebdomadaire',
    place: 'Clignancourt',
    date: '17h00 à 19h00'
  }, {
    title: 'Séance hebdomadaire',
    place: 'Clignancourt',
    date: '17h00 à 19h00'
  }, {
    title: 'Séance hebdomadaire',
    place: 'Clignancourt',
    date: '17h00 à 19h00'
  }, {
    title: 'Séance hebdomadaire',
    place: 'Clignancourt',
    date: '17h00 à 19h00'
  }, {
    title: 'Séance hebdomadaire',
    place: 'Clignancourt',
    date: '17h00 à 19h00'
  }, {
    title: 'Séance hebdomadaire',
    place: 'Jussieu',
    date: '17h00 à 19h00'
  }]
*/
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

/*  const seances_hebdomadaires = [
    {
      jour: 'mardi',
      beginHour: '17h00',
      endHour: '19h00'
    },
    {
      jour: 'jeudi',
      beginHour: '18h00',
      endHour: '19h00'
    }
  ]
*/
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
          place: seance.place,
          lieu: seance.lieu,
          jour: seance.jour,
          date: '17h00 à 19h00',
          iso: date.toISO(),
          horaire: seance.horaire
        })
      }
    }
    for(const seance of bar_echecs) {
      console.log(seance)
      // pour savoir si on part de DateTime.now() ou bien plutôt de startDate, on part du maximum entre les deux
      let date_used;
      if(DateTime.now().toISO() > DateTime.fromFormat(seance.startDate, "dd/LL/yyyy").toISO()) {
        date_used = DateTime.now()
      }
      else {
        date_used = DateTime.fromFormat(seance.startDate, "dd/LL/yyyy")
      }

      if(DateTime.now().toISO() < DateTime.fromFormat(seance.startDate, "dd/LL/yyyy").toISO()) {
        const today = date_used.weekday
        const jour = seance.jour
        const days_until = (day_to_number[jour] - today + 7) % 7;


        const date = date_used.plus({days: days_until})
        dates.push({
          title: 'Bar échecs',
          place: seance.place,
          lieu: seance.lieu,
          jour: seance.jour,
          date: '17h00 à 19h00',
          iso: date.toISO(),
          horaire: seance.horaire
        })
      }
    }
    return dates.sort((a,b) => a.iso < b.iso ? -1 : 1)
  }

  const events = nextSeances()

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5">
        <Header /> 

        <section className="mt-8 lg:mt-16 mb-4 lg:pt-24">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
            <div className="lg:w-7/12 flex flex-col gap-8">
              <h1 className="text-4xl lg:text-8xl  font-super">Les Fous des Tours</h1>
              <div className="prose lg:prose-xl">
                <p>Les Fous des Tours est l’association d’échecs et de jeux de plateaux de Sorbonne Université. Nous invitons étudiants et personnels de tous niveaux à explorer le jeu d’échecs dans une ambiance conviviale et gratuite.</p>
              </div>
              <a href="#nous-rejoindre"><button className="w-full lg:w-fit px-8 py-3 bg-black text-white rounded-lg hover:bg-zinc-800">Nous rejoindre</button></a>
            </div>
            <div className="hidden lg:block flex-grow"></div>
            <div className="hidden lg:block">
              <img className="hover:scale-110 hover:rotate-12 transition ease-in-out" src="/images/lfdt.png"/>
            </div>
          </div>
          <div className="mt-8 lg:mt-24 flex flex-col lg:flex-row"> 
            <div className="prose lg:prose-xl">
              <h2 id="nous-rejoindre">Nos prochaines séances & événements</h2>
            </div>
            <div className="hidden lg:block grow"></div>
            <p className="mt-4 hover:underline"><Link href="/evenements">Voir tous nos événements</Link></p>
          </div>
        </section>
      </div>

      <section className="px-5">
        <div className="flex flex-col lg:flex-row gap-4 [&>*:nth-child(n+5)]:hidden">
        {events.map(event => (
          <div className={"flex w-full border-black border-2 text-xl flex-col flex-grow lg:w-fit p-4 rounded-lg " + (event.title === 'Bar échecs' ? 'bg-blue-400 hover:bg-blue-400/90':'bg-[#E9D056] hover:bg-[#ebd567]')}>
            <p className="font-bold">{event.title}</p>
            <p>{event.place}, {event.lieu}</p>
            <p>{event.jour} {DateTime.fromISO(event.iso).setLocale('fr').toLocaleString({month: 'long', day: 'numeric'})}</p>
            <p>{event.horaire}</p>
          </div>
        ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-8 lg:py-24 flex flex-col gap-8 lg:gap-24">
        <div className="">
        {allPosts.length > 0 && (
          <ContentGrid
            title="Actualités"
            items={allPosts}
            collection="posts"
            priority
          />
        )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="prose lg:prose-xl">
            <h2 id="nous-rejoindre">Nos activités</h2>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col gap-8 lg:gap-24">
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
              <div className="lg:w-1/2 prose lg:prose-xl">
                <h3>Tournoi Inter-universitaire</h3>
                <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
              </div>
              <div className="hidden lg:block lg:flex-grow"></div>
              <div className="lg:w-5/12">
                <img className="hover:rotate-3 border-black border-2 transition ease-in-out duration-300 origin-bottom-left rounded-lg aspect-video w-full object-cover" src="/images/tournoi.png"/>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
              <div className="lg:w-1/2 prose lg:prose-xl">
                <h3>Séances hebdomadaires</h3>
                <p>Chaque semaine, nous organisons des séances sur les différents campus. Les séances sont libres. Aucune inscription n'est nécessaire et tout membre de Sorbonne Université peut y assister.</p>
              </div>
              <div className="hidden lg:block lg:flex-grow"></div>
              <div className="lg:w-5/12">
                <img className="hover:rotate-3 border-black border-2 transition ease-in-out duration-300 origin-bottom-left rounded-lg aspect-video w-full object-cover" src="/images/hebdo.jpg"/>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
              <div className="lg:w-1/2 prose lg:prose-xl">
                <h3>Bar échecs</h3>
                <p>Durant les vacances, nous organisons souvent des bar-échecs. Cela consiste à jouer aux échecs dans un bar. Le cadre y est plus convivial.</p>
              </div>
              <div className="hidden lg:block lg:flex-grow"></div>
              <div className="lg:w-5/12">
                <img className="hover:rotate-3 border-black border-2 transition ease-in-out duration-300 origin-bottom-left rounded-lg aspect-video w-full object-cover" src="/images/bar.jpg"/>
              </div>
            </div>
             <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
              <div className="lg:w-1/2 prose lg:prose-xl">
                <h3>Tournois internes</h3>
                <p>Les tournois internes sont réservés aux membres de Sorbonne Université et sont individuels et non-homologués. Nous en organisons deux chaque année.</p>
              </div>
              <div className="hidden lg:block lg:flex-grow"></div>
              <div className="lg:w-5/12">
                <img className="hover:rotate-3 border-black border-2 transition ease-in-out duration-300 origin-bottom-left rounded-lg aspect-video w-full object-cover" src="/images/tournoi_semestre.jpg"/>
              </div>
            </div>
          </div>
        </div>
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



async function getDataBis() {
  const db = await load()

  const page = await db
    .find({ collection: 'pages', slug: 'home' }, ['content'])
    .first()

  const content = await markdownToHtml(page.content)

  const allPosts = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  const allProjects = await db
    .find({ collection: 'projects' }, ['title', 'slug', 'coverImage'])
    .sort({ publishedAt: -1 })
    .toArray()

  return {
    content,
    allPosts,
    allProjects
  }
}

export const dynamic = "force-dynamic";