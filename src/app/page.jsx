import Layout from '../components/Layout'
import { load } from 'outstatic/server'
import ContentGrid from '../components/ContentGrid'
import markdownToHtml from '../lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'

export default async function Index() {
  const { content, allPosts, allProjects } = await getData()
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
  const day_to_number = {
    'lundi': 1,
    'mardi': 2,
    'mercredi' : 3,
    'jeudi' : 4,
    'vendredi' : 5,
    'samedi' : 6,
    'dimanche' : 7
  }

  const seances_hebdomadaires = [
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

  function nextSeances() {
    const dates = []
    for(const seance of seances_hebdomadaires) {
      const today = DateTime.now().weekday
      const jour = seance.jour
      const days_until = (day_to_number[jour] - today + 7) % 7;
      for(let i = 0; i < 4; i++) {
        const date = DateTime.now().plus({days: days_until + 7*i})
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5">
        <Header /> 

        <section className="mt-16 mb-4 pt-24">
          <div class="flex">
            <div className="w-7/12 flex flex-col gap-8">
              <h1 className="text-8xl font-black">Les Fous des Tours</h1>
              <p>{DateTime.fromObject({day: 22, hour: 12 }, { zone: 'Europe/Paris'})}</p>
              <p>{nextSeances().map(x => x.jour).join(' ')}</p>
              <p>Les Fous Des Tours est l'assocation universitaire d'échecs et de jeux de plateaux de Sorbonne Université. Nous avons pour but de promouvoir et de faire découvrir le jeu d'échecs et d'autres  jeux comme le Go, Shogi,... sur les différents campus de SU.
  De ce fait, nos séances sont ouvertes aux joueurs de tous les niveaux, des maitres aux grands débutants (les membres de l'association se chargeant souvent d'initier les nouveaux arrivants aux échecs, GO,..) De plus l'accès à nos séances est gratuit et ouvert à tous les étudiants et au personnel de SU.</p>
              <button className="w-fit px-8 py-3 bg-black text-white rounded-lg">Nous rejoindre</button>
            </div>
            <div className="flex-grow"></div>
            <div className="">
              <img src="/images/lfdt.png"/>
            </div>
          </div>
          <div className="mt-24 flex"> 
            <p className=" text-5xl font-semibold">Nos prochaines séances & événements</p>
            <div className="grow"></div>
            <p className="mt-4">Voir tous nos événements</p>
          </div>
        </section>
      </div>

      <section className="px-5">
        <div className="flex gap-4 [&>*:nth-child(n+7)]:hidden">
        {events.map(event => (
          <div className=" flex flex-col bg-[#E9D056] flex-grow w-fit p-4 rounded-lg">
            <p className="font-bold">{event.title}</p>
            <p>{event.place}</p>
            <p>{event.date}</p>
          </div>
        ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-24 flex flex-col gap-24">
        <div className="flex odd:flex-row-reverse">
          <div className="w-1/2 flex flex-col gap-4">
            <p className="text-4xl font-semibold">Tournoi Inter-universitaire</p>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="flex-grow"></div>
          <div className="w-5/12">
            <img src="/images/tournoi.png"/>
          </div>
        </div>
        <div className="flex odd:flex-row-reverse">
          <div className="w-1/2 flex flex-col gap-4">
            <p className="text-4xl font-semibold">Séances hebdomadaires</p>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="flex-grow"></div>
          <div className="w-5/12">
            <img src="/images/tournoi.png"/>
          </div>
        </div>
        <div className="flex odd:flex-row-reverse">
          <div className="w-1/2 flex flex-col gap-4">
            <p className="text-4xl font-semibold">Bar échecs</p>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="flex-grow"></div>
          <div className="w-5/12">
            <img src="/images/tournoi.png"/>
          </div>
        </div>
        <div className="flex odd:flex-row-reverse">
          <div className="w-1/2 flex flex-col gap-4">
            <p className="text-4xl font-semibold">Tournois internes</p>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="flex-grow"></div>
          <div className="w-5/12">
            <img src="/images/tournoi.png"/>
          </div>
        </div>
      </div>


{/*        <section className="mt-16 mb-16 md:mb-12">
          <div
            className="prose lg:prose-2xl home-intro"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
        {allPosts.length > 0 && (
          <ContentGrid
            title="Posts"
            items={allPosts}
            collection="posts"
            priority
          />
        )}
        {allProjects.length > 0 && (
          <ContentGrid
            title="Projects"
            items={allProjects}
            collection="projects"
          />
        )}*/}
    </Layout>
  )
}

async function getData() {
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
