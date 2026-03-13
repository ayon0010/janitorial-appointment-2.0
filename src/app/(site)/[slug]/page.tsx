import Blog from '@/components/SharedComponent/Blog'
import markdownToHtml from '@/utils/markdownToHtml'
import { format } from 'date-fns'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { SITE_NAME } from '@/data/seo-keywords'
import { buildCanonical, getArticleJsonLd, getBreadcrumbJsonLd } from '@/lib/seo'

type Props = {
    params: Promise<{ slug: string }>
}

function addHeadingIds(html: string): string {
  const usedIds = new Set<string>()

  const slugify = (text: string) => {
    // Approche proche de WordPress : texte → slug URL-safe
    const withoutTags = text.replace(/<[^>]+>/g, '')

    const base = withoutTags
      .normalize('NFD') // sépare les accents
      .replace(/[\u0300-\u036f]/g, '') // supprime les diacritiques
      .toLowerCase()
      .trim()
      .replace(/&[a-z0-9#]+;/gi, ' ') // entités HTML → espace
      .replace(/[^a-z0-9\s-]/g, '') // caractères non alphanumériques
      .replace(/\s+/g, '-') // espaces → tirets
      .replace(/-+/g, '-') // tirets multiples → un seul
      .replace(/^-|-$/g, '') // trim des tirets

    const fallback = 'section'
    const baseSlug = base || fallback

    let id = baseSlug
    let counter = 2
    while (usedIds.has(id)) {
      id = `${baseSlug}-${counter++}` // foo, foo-2, foo-3…
    }
    usedIds.add(id)
    return id
  }

  return html.replace(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      // Comme WordPress : si un id existe déjà (défini dans le CMS), on le respecte
      if (/\sid\s*=/.test(attrs)) return match
      const id = slugify(content)
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`
    },
  )
}

function sanitizeLinks(html: string): string {
  // 1) enlever target="_blank" / target='_blank' (et tout autre target)
  let result = html.replace(/\s+target=(["']).*?\1/gi, '')
  // 2) optionnel : nettoyer rel="noopener noreferrer" devenu inutile
  result = result.replace(/\s+rel=(["']).*?\1/gi, '')
  return result
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const dbPost = await prisma.blogPost.findUnique({ where: { slug } })

    if (dbPost?.title) {
        const canonical = buildCanonical(`/${slug}`)
        return {
            title: dbPost.title,
            description: dbPost.metaDescription ?? undefined,
            alternates: { canonical },
            openGraph: {
                title: dbPost.title,
                description: dbPost.metaDescription ?? undefined,
                type: 'article',
                url: canonical,
                siteName: SITE_NAME,
                ...(dbPost.featuredImage && { images: [dbPost.featuredImage] }),
            },
            twitter: {
                card: 'summary_large_image',
                title: dbPost.title,
                description: dbPost.metaDescription ?? undefined,
            },
            robots: { index: true, follow: true },
        }
    }
    return {
        title: 'Not Found',
        description: 'No blog article has been found',
        robots: { index: false, follow: false },
    }
}



export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({
        select: { slug: true },
    })
    return posts.map((post) => ({ slug: post.slug }))
}



export default async function Post({ params }: Props) {
    const { slug } = await params

    const dbPost = await prisma.blogPost.findUnique({ where: { slug } })
    if (!dbPost) notFound()

    const raw = dbPost.contentHtml ?? dbPost.content ?? ''
    const isHtml = raw.trim().startsWith('<')
    const html = isHtml ? raw : await markdownToHtml(raw)
    const htmlWithIds = addHeadingIds(html)
    const finalHtml = sanitizeLinks(htmlWithIds)

    const postUrl = buildCanonical(`/${slug}`)
    const articleJsonLd = getArticleJsonLd({
        title: dbPost.title,
        description: dbPost.metaDescription,
        image: dbPost.featuredImage,
        datePublished: dbPost.createdAt.toISOString(),
        dateModified: dbPost.updatedAt?.toISOString(),
        url: postUrl,
    })
    const breadcrumbJsonLd = getBreadcrumbJsonLd([
        { name: SITE_NAME, path: '' },
        { name: 'Blog', path: '/blog' },
        { name: dbPost.title, path: `/${slug}` },
    ])

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <section className='dark:bg-darkmode py-20'>
                <div className='container'>
                    <div className='grid md:grid-cols-12 grid-cols-1 items-center'>
                        <div className='col-span-8'>
                            <span className='text-base text-SlateBlue pr-7 border-r border-solid border-BorderLine dark:border-dark_border w-fit dark:text-white/50'>
                                {format(dbPost.createdAt, 'dd MMM yyyy')}
                            </span>
                            <h2 className='text-secondary pt-7 text-[40px] leading-12 font-bold dark:text-white'>
                                {dbPost.title}
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='dark:bg-darkmode pt-0 pb-20'>
                <div className='container'>
                    <div className='flex flex-wrap justify-center'>
                        <div className='w-full'>
                            {dbPost.featuredImage && (
                                <div className='mb-[60px] aspect-[1920/1080] max-h-[600px] relative w-full'>
                                    <Image
                                        src={dbPost.featuredImage}
                                        alt={dbPost.title ?? 'image'}
                                        fill
                                        priority
                                        className='rounded-lg w-full h-full object-cover object-center'
                                    />
                                </div>
                            )}
                            <div className='-mx-4 flex flex-wrap'>
                                <div className='w-full px-4 lg:w-8/12'>
                                    <div className='blog-details prose dark:prose-invert' dangerouslySetInnerHTML={{ __html: finalHtml }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='bg-LightSoftBlue dark:bg-darklight! lg:py-40 py-16 lg:pb-40 pb-28 -mb-28'>
                <Blog />
            </div>
        </>
    )
}
