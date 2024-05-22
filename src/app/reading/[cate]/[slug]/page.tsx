import type { Metadata, ResolvingMetadata } from 'next'

import { createClient } from '@book/supabase'

import { CONFIG } from '~/app.config'
import { Divider } from '~/components/divider'
import { MainMarkdown } from '~/components/markdown'

import { GitHistory } from './components/git-history'
import { NeedLogin } from './components/need-login'
import { getServerProps } from './getServerProps'
import { Hooks } from './hooks'

export async function generateMetadata(
  props: {
    params: {
      cate: string
      slug: string
    }
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { title } = await getServerProps(props.params)
  // const { cate, slug } = props.params
  return {
    title,
    // openGraph: {
    //   images: `/reading/${cate}/${slug}/og.png`,
    // },
  }
}

export default async (props: {
  params: {
    cate: string
    slug: string
  }
}) => {
  const { text, count, readingTime, title, updatedAt, history, meta } =
    await getServerProps(props.params)

  if (meta.auth) {
    const {
      data: { user },
    } = await createClient().auth.getUser()

    if (!user) return <NeedLogin />
  }

  return (
    <div className="prose min-h-[calc(100vh-25rem)]">
      <Hooks {...{ count, readingTime, title }} />
      <MainMarkdown>{text}</MainMarkdown>

      {updatedAt && (
        <>
          <Divider className="ml-auto mt-6 w-1/4" />

          <p className="text-right opacity-80">
            最后更新于{' '}
            {updatedAt
              ? new Date(updatedAt).toLocaleString('zh-CN', {
                  timeZone: 'Asia/Shanghai',
                })
              : 'N/A'}
          </p>
        </>
      )}

      <GitHistory history={history} />

      {CONFIG.wip && (
        <>
          <Divider className="mt-12" />
          <p>本书还在编写中..</p>
          <p>
            前往{' '}
            <a
              href="https://innei.in/posts/technology/my-first-nextjs-book-here#comment"
              target="_blank"
              rel="noreferrer"
            >
              https://innei.in/posts/tech/my-first-nextjs-book-here#comment
            </a>{' '}
            发表你的观点吧。
          </p>
        </>
      )}
    </div>
  )
}
