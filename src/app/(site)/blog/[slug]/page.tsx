import Blog from '@/components/SharedComponent/Blog'
import { getPostBySlug } from '@/utils/markdown'
import markdownToHtml from '@/utils/markdownToHtml'
import { format } from 'date-fns'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const dbPost = await prisma.blog.findUnique({ where: { slug } })
  const mdPost = dbPost ? null : getPostBySlug(slug, ['title', 'author', 'content', 'metadata'])

  const title = dbPost?.title ?? (mdPost?.title as string)
  const siteName = process.env.SITE_NAME || 'Your Site Name'
  const authorName = process.env.AUTHOR_NAME || 'Your Author Name'

  if (title) {
    return {
      title: `${title} | ${siteName}`,
      author: authorName,
      robots: { index: true, follow: true },
    }
  }
  return {
    title: 'Not Found',
    description: 'No blog article has been found',
    author: authorName,
    robots: { index: false, follow: false },
  }
}

export default async function Post({ params }: Props) {
  const { slug } = await params

  const dbPost = await prisma.blog.findUnique({ where: { slug } })
  if (dbPost) {
    const content = dbPost.content ?? ''
    const isHtml = content.trim().startsWith('<')
    const html = isHtml ? content : await markdownToHtml(content)

    return (
      <>
        <section className='dark:bg-darkmode py-20'>
          <div className='container'>
            <div className='grid md:grid-cols-12 grid-cols-1 items-center'>
              <div className='col-span-8'>
                <span className='text-base text-SlateBlue pr-7 border-r border-solid border-BorderLine dark:border-dark_border w-fit dark:text-white/50'>
                  {format(dbPost.date, 'dd MMM yyyy')}
                </span>
                <h2 className='text-secondary pt-7 text-[40px] leading-[3rem] font-bold dark:text-white'>
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
                {dbPost.coverImage && (
                  <div className='mb-[60px] h-[300px] md:h-[400px] lg:h-[400px] relative'>
                    <Image
                      src={dbPost.coverImage}
                      alt=''
                      fill
                      className='object-cover object-center rounded-lg'
                    />
                  </div>
                )}
                <div className='-mx-4 flex flex-wrap'>
                  <div className='w-full px-4 lg:w-8/12'>
                    <div className='blog-details xl:pr-10' dangerouslySetInnerHTML={{ __html: html }} />
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

  const mdPost = getPostBySlug(slug, [
    'title',
    'author',
    'authorImage',
    'content',
    'coverImage',
    'date',
  ])
  if (!mdPost?.title) notFound()

  const content = await markdownToHtml((mdPost.content as string) || '')

  return (
    <>
      <section className='dark:bg-darkmode py-20'>
        <div className='container'>
          <div className='grid md:grid-cols-12 grid-cols-1 items-center'>
            <div className='col-span-8'>
              <div className='flex flex-col sm:flex-row'>
                <span className='text-base text-SlateBlue pr-7 border-r border-solid border-BorderLine dark:border-dark_border w-fit dark:text-white/50'>
                  {format(new Date(mdPost.date as string), 'dd MMM yyyy')}
                </span>
                <span className='text-base text-SlateBlue sm:pl-7 pl-0 w-fit dark:text-white/50'>
                  13 Comments
                </span>
              </div>
              <h2 className='text-secondary pt-7 text-[40px] leading-[3rem] font-bold dark:text-white'>
                {mdPost.title as string}
              </h2>
            </div>
            <div className='flex lg:justify-center justify-start items-center gap-6 col-span-4 pt-4 md:pt-0'>
              <Image
                src={mdPost.authorImage as string}
                alt='image'
                className='rounded-full'
                width={84}
                height={84}
                quality={100}
                style={{ width: 'auto', height: 'auto' }}
              />
              <div>
                <span className='text-[22px] leading-[2rem] text-primary'>Silicaman</span>
                <p className='text-xl text-SlateBlue dark:text-darktext'>Author</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='dark:bg-darkmode pt-0 pb-20'>
        <div className='container'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full'>
              <div className='mb-[60px] h-[300px] md:h-[400px] lg:h-[750px]'>
                <Image
                  src={mdPost.coverImage as string}
                  alt='image'
                  width={1300}
                  height={0}
                  priority={false}
                  style={{ width: '100%', height: '100%' }}
                  className='h-full w-full object-cover object-center rounded-lg'
                />
              </div>
              <div className='-mx-4 flex flex-wrap'>
                <div className='w-full px-4 lg:w-8/12'>
                  <div className='blog-details xl:pr-10'>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </div>
                <div className='w-full px-4 lg:w-4/12'>
                  <div></div>
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
