/**
 * Cloudflare Pages Function: GET /api/stats
 */

export async function onRequestGet(context: any) {
  return new Response(
    JSON.stringify({
      users: 0,
      messages: 0,
      templates: 100,
      topTemplates: [],
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
