'use client'

import type { FC } from 'react'

import { StyledButton } from '~/components/button'

import { getCheckoutURL } from '../actions/buy'

export const NeedBuy: FC<{
  variantId: string
}> = ({ variantId }) => {
  return (
    <div className="mx-auto mt-48 flex flex-col items-center justify-center gap-4">
      <p>此页面需要购买此小册的才能查看</p>

      <StyledButton
        onClick={async () => {
          const checkoutUrl = await getCheckoutURL(+variantId)
          if (checkoutUrl) {
            window.open(checkoutUrl)
          }
        }}
      >
        购买
      </StyledButton>
    </div>
  )
}
