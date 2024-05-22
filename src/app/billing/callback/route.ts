import { NextRequest, NextResponse } from 'next/server'

import { checkBuy } from '~/actions/check-buy'
import { configureLemonSqueezy } from '~/lib/lemonsqueezy'

export const GET = async (req: NextRequest) => {
  configureLemonSqueezy()
  const searchParams = req.nextUrl.searchParams
  const next = searchParams.get('next')
  const variantId = searchParams.get('variantId')

  if (!variantId) {
    throw new Error('variantId is required.')
  }
  const result = await checkBuy(variantId)

  if (result) {
    return NextResponse.redirect(
      `${req.nextUrl.origin}${decodeURIComponent(next || '')}`,
    )
  } else {
    throw new Error('You have not purchased this book.')
  }
}
