'use client'

import { useFormStatus } from 'react-dom'
import useSWR from 'swr'
import type { FC } from 'react'

import { StyledButton } from '~/components/button'

import { getCheckoutURL } from '../actions/buy'

export const NeedBuy: FC<{
  variantId: string
}> = ({ variantId }) => {
  useSWR(
    'check',
    () => {
      return getCheckoutURL(+variantId).then((res) => {
        if (res) {
          location.reload()
        }
      })
    },
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  )
  return (
    <div className="mx-auto mt-48 flex flex-col items-center justify-center gap-4">
      <p>此页面需要购买此小册的才能查看</p>

      <form
        action={async () => {
          const checkoutUrl = await getCheckoutURL(
            +variantId,
            false,
            window.location.pathname,
            window.origin,
          )
          if (checkoutUrl) {
            window.open(checkoutUrl)
          }
        }}
      >
        <BuyButton />
      </form>
    </div>
  )
}

const BuyButton = () => {
  const { pending } = useFormStatus()
  return <StyledButton isLoading={pending}>购买</StyledButton>
}
