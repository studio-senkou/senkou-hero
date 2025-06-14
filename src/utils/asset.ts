export const getSupabaseAsset = (path: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_S3}/${path}`
}
