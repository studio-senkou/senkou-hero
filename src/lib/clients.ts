import { Testimony } from '@hero/types/dto'
import { supabase } from './supabase'

export const getClientsTestimony = async (): Promise<Array<Testimony>> => {
  try {
    const response = await supabase
      .from('testimonials')
      .select(
        `
        *,
        client:clients (
          id,
          client_name,
          client_image,
          organization_name,
          organization_image,
          address
        )
      `,
      )
      .order('created_at', { ascending: false })

    return response.data as unknown as Array<Testimony>
  } catch (error) {
    return []
  }
}
