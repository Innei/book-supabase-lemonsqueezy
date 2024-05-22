'use client'

import { StyledButton } from '~/components/button'
import { signWithGithub } from '~/lib/supabase'

export const NeedLogin = () => {
  return (
    <div className="mx-auto mt-48 flex flex-col items-center justify-center gap-4">
      <p>你需要登录才能查看这个页面</p>

      <StyledButton className="bg-black" onClick={signWithGithub}>
        <i className="icon-[mingcute--github-line]"></i> 使用 Github 登录
      </StyledButton>
    </div>
  )
}
