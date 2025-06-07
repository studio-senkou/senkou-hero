'use server'

import { supabase } from './supabase'

export const subscribe = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.from('subscriptions').insert({
      email,
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error subscribing:', error)
  }
}
