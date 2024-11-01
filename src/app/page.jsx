import Layout from '../components/Layout'
import { load, getDocuments } from 'outstatic/server'
import ContentGrid from '../components/ContentGrid'
import markdownToHtml from '../lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'
import Link from 'next/link'

export default async function Index() {
//  const { content, allPosts, allProjects } = await getData()
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

        <section className="mt-8 lg:mt-16 mb-4 lg:pt-24">
          <div class="flex flex-col lg:flex-row gap-4 lg:gap-0">
            <div className="lg:w-7/12 flex flex-col gap-8">
              <h1 className="text-4xl lg:text-8xl font-black">Les Fous des Tours</h1>
              <div className="prose lg:prose-xl">
                <p>Les Fous Des Tours est l'assocation universitaire d'échecs et de jeux de plateaux de Sorbonne Université. Nous avons pour but de promouvoir et de faire découvrir le jeu d'échecs sur les différents campus de SU.
    De ce fait, nos séances sont ouvertes aux joueurs de tous les niveaux. De plus l'accès à nos séances est gratuit et ouvert à tous les étudiants et au personnel de SU.</p>
              </div>
              <a href="#nous-rejoindre"><button className="w-full lg:w-fit px-8 py-3 bg-black text-white rounded-lg hover:bg-zinc-800">Nous rejoindre</button></a>
            </div>
            <div className="flex-grow"></div>
            <div className="hidden lg:block">
              <img src="/images/lfdt.png"/>
            </div>
          </div>
          <div className="mt-8 lg:mt-24 flex flex-col lg:flex-row"> 
            <div className="prose lg:prose-xl">
              <h2 id="nous-rejoindre">Nos prochaines séances & événements</h2>
            </div>
            <div className="grow"></div>
            <p className="mt-4 hover:underline"><Link href="/evenements">Voir tous nos événements</Link></p>
          </div>
        </section>
      </div>

      <section className="px-5">
        <div className="flex flex-col lg:flex-row gap-4 [&>*:nth-child(n+5)]:hidden">
        {events.map(event => (
          <div className=" flex w-full text-xl flex-col bg-[#E9D056] hover:bg-[#ebd567] flex-grow lg:w-fit p-4 rounded-lg">
            <p className="font-bold">{event.title}</p>
            <p>{event.place}</p>
            <p>{event.jour} {DateTime.fromISO(event.iso).setLocale('fr').toLocaleString({month: 'long', day: 'numeric'})}</p>
            <p>{event.date}</p>
          </div>
        ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-24 flex flex-col gap-8 lg:gap-24">
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
          <div className="lg:w-1/2 prose lg:prose-xl">
            <h3>Tournoi Inter-universitaire</h3>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="hidden lg:block lg:flex-grow"></div>
          <div className="lg:w-5/12">
            <img className="hover:rotate-3 transition ease-in-out duration-300" src="/images/tournoi.png"/>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
          <div className="lg:w-1/2 prose lg:prose-xl">
            <h3>Séances hebdomadaires</h3>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="hidden lg:block lg:flex-grow"></div>
          <div className="lg:w-5/12">
            <img className="hover:rotate-3 transition ease-in-out duration-300" src="/images/tournoi.png"/>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
          <div className="lg:w-1/2 prose lg:prose-xl">
            <h3>Bar-échecs</h3>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="hidden lg:block lg:flex-grow"></div>
          <div className="lg:w-5/12">
            <img className="hover:rotate-3 transition ease-in-out duration-300" src="/images/tournoi.png"/>
          </div>
        </div>
         <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:odd:flex-row-reverse">
          <div className="lg:w-1/2 prose lg:prose-xl">
            <h3>Tournois internes</h3>
            <p>Chaque année nous organisons un tournoi inter-universitaire qui réunit une petite dizaine d’écoles et universités. Chaque école participante ramène une équipe composé de 4 joueurs.</p>
          </div>
          <div className="hidden lg:block lg:flex-grow"></div>
          <div className="lg:w-5/12">
            <img className="hover:rotate-3 transition ease-in-out duration-300" src="/images/tournoi.png"/>
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


/*
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
}*/

