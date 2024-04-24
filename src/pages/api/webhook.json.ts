import { purgeCache } from '@netlify/functions'

export async function POST({ request }:any) {
  const body = await request.json()

  await purgeCache({ tags: [body.sys.id] }).catch((error) => {
    return new Response(JSON.stringify({
      message: `Failed to revalidate entry with id ${body.sys.id}`,
      error: error.message,
    }), { status: 500 });
  })

  return new Response(JSON.stringify({
    message: `Revalidated entry with id ${body.sys.id}`,
  }), { status: 200 });
}