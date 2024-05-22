'use client'

import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

import { Divider } from '~/components/divider'
import { FloatPopover } from '~/components/float-popover'
import { UserArrowLeftIcon } from '~/components/icons/user-arrow-left'
import { signOut, signWithGithub, supabase } from '~/lib/supabase'

import { HeaderActionButton } from './HeaderActionButton'

export const Auth = () => {
  const [currentUser, setCurrentUser] = useState<User>()
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      user.data.user && setCurrentUser(user.data.user)
    })
  }, [])

  return (
    <>
      {!currentUser ? (
        <HeaderActionButton onClick={signWithGithub} aria-label="Reader Login">
          <UserArrowLeftIcon className="size-4" />
        </HeaderActionButton>
      ) : (
        <FloatPopover
          triggerElement={
            <img
              src={currentUser?.user_metadata.avatar_url}
              alt="avatar"
              className="size-10 rounded-full"
            />
          }
          headless
          trigger="click"
        >
          <div className="flex w-32 flex-col rounded-md border border-zinc-100 bg-base-100 shadow shadow-zinc-300 dark:border-zinc-700 dark:shadow-neutral-900 [&>*]:hover:dark:bg-neutral-800 [&>button]:p-2 [&>button]:duration-200">
            <div className="p-2 text-center text-sm opacity-80">
              {currentUser?.user_metadata.full_name}
            </div>
            <Divider className="my-2" />
            <button className="text-sm" onClick={signOut}>
              登出
            </button>
          </div>
        </FloatPopover>
      )}
    </>
  )
}
