// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY!;
const SCOPES = 'read_products,write_products'; // Example scopes
const REDIRECT_URI = 'https://your-app.vercel.app/api/auth/callback';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shop = searchParams.get('shop');

  if (!shop) {
    return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 });
  }

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=randomstring&grant_options[]=per-user`;

  return NextResponse.redirect(installUrl);
}
