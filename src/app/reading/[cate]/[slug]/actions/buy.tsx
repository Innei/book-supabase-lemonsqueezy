'use server'

import { createClient } from '@book/supabase'
import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js'

import { configureLemonSqueezy } from '~/lib/lemonsqueezy'

export async function getCheckoutURL(
  variantId: number,
  embed = false,
  next = '',
) {
  configureLemonSqueezy()

  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated.')
  }

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: user.email ?? undefined,
        custom: {
          user_id: user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${
          process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_APP_URL
        }/billing/callback?next=${encodeURIComponent(next)}&variantId=${variantId}`,
        receiptButtonText: 'Go to Dashboard',
        receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
      },
    },
  )

  return checkout.data?.data.attributes.url
}
