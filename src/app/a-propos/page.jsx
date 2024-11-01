import Layout from '@/components/Layout'
import { load, getDocuments } from 'outstatic/server'
import ContentGrid from '@/components/ContentGrid'
import markdownToHtml from '@/lib/markdownToHtml'
import Header from '@/components/Header'
import { DateTime } from 'luxon'

export default async function Index() {
  const content = await getData()
  console.log(content)

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5">
        <Header /> 

        <section className="mt-8 lg:mt-16 mb-4 lg:pt-6 pb-6 lg:pb-24">
          <div class="flex">
            <div className="flex flex-col gap-8">
              <div
                className="prose lg:prose-xl"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

async function getData() {
  const db = await load()

  const page = await db
    .find({ collection: 'pages', slug: 'a-propos' }, ['content'])
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

  return content
}