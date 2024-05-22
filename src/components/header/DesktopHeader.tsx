'use client'

import { Auth } from './internal/Auth'

export const DesktopHeader = () => {
  return (
    <div className="fixed right-5 top-5 hidden lg:block">
      <Auth />
    </div>
  )
}
