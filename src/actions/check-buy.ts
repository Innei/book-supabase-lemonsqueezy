'use server'

import { and, eq } from 'drizzle-orm'

import { createClient } from '@book/supabase'
import { listOrders } from '@lemonsqueezy/lemonsqueezy.js'

import { db } from '~/lib/db'
import { configureLemonSqueezy } from '~/lib/lemonsqueezy'
import { schema } from '~/schema'

export const checkBuy = async (variantId: string) => {
  configureLemonSqueezy()

  if (!variantId) {
    throw new Error('variantId is required.')
  }
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated.')
  }

  const o = await listOrders({
    filter: {
      userEmail: user.email,
    },
  })

  if (o.error) {
    throw new Error(o.error.message)
  }
  const data = o.data?.data

  for (const order of data || []) {
    if (
      order.attributes.first_order_item.variant_id === +variantId &&
      order.attributes.user_email === user.email
    ) {
      await supabase.auth.updateUser({
        data: {
          is_paid: true,
          [variantId]: true,
        },
      })

      await db.transaction(async (db) => {
        const [exist] = await db
          .select()
          .from(schema.paidUsers)
          .where(
            and(
              eq(schema.paidUsers.userId, user.id),
              eq(schema.paidUsers.variantId, variantId),
            ),
          )

        if (!exist) {
          await db.insert(schema.paidUsers).values({
            variantId: variantId,
            userId: user.id,
          })
        }
      })

      return true
    }
  }
  return false
}
