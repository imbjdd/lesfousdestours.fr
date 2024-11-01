import Layout from '@/components/Layout'
import { load, getDocuments } from 'outstatic/server'
import ContentGrid from '@/components/ContentGrid'
import markdownToHtml from '@/lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'

export default async function Index() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5">
        <Header /> 

        <section className="mt-8 lg:mt-16 mb-4 lg:pt-6 pb-6 lg:pb-24">
          <div class="flex">
            <div className="flex flex-col gap-8">
              <div className="prose lg:prose-xl">
                <h1>Mentions Légales</h1>

                <h2>Éditeur du site</h2>
                <p>
                    Nom de l'association : Les Fous des Tours <br/>
                    Numéro d'enregistrement : W751223553
                </p>

                <h2>Hébergeur</h2>
                <p>
                    Nom de l'hébergeur : Vercel <br/>
                    Adresse de l'hébergeur : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis <br/>
                    Site web de l'hébergeur : <a href="https://vercel.com" target="_blank">vercel.com</a>
                </p>

                <h2>Propriété intellectuelle</h2>
                <p>
                    Tous les contenus présents sur ce site (textes, images, graphismes, logos, etc.) sont la propriété de Les Fous des Tours. Toute reproduction, même partielle, est interdite sans autorisation préalable.
                </p>

                <h2>Données personnelles</h2>
                <p>
                    Ce site ne collecte aucune donnée personnelle. Aucun cookie n'est utilisé.
                </p>

                <h2>Responsabilité</h2>
                <p>
                    L'éditeur s'efforce de fournir des informations fiables et à jour sur le site, mais ne peut garantir l'exhaustivité ou l'exactitude des informations. L'éditeur ne saurait être tenu responsable des erreurs ou omissions dans les contenus du site.
                </p>

                <h2>Liens externes</h2>
                <p>
                    Le site peut contenir des liens vers d'autres sites. L'éditeur n'est pas responsable du contenu de ces sites et ne peut être tenu responsable des dommages résultant de leur utilisation.
                </p>
            </div>
          </div>
        </div>
        </section>
      </div>
    </Layout>
  )
}