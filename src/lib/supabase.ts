import 'client-only'

import { createClient } from '@book/supabase'

export const supabase = createClient()

export const signWithGithub = async () => {
  const origin = window.location.origin
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/login/callback?next=${encodeURIComponent(window.location.pathname)}`,
    },
  })
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  location.reload()
}
