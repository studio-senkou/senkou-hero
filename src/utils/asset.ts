export const getSupabaseAsset = (path: string) => {
  if (!path) return null
  return `${process.env.NEXT_PUBLIC_SUPABASE_S3}/${path}`
}
