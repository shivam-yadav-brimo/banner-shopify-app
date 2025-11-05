// src/app/api/auth/callback/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY!;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET!;
const REDIRECT_URI = 'https://banner-ecommerce-app.vercel.app/api/auth/callback';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const hmac = searchParams.get('hmac');

  if (!shop || !code || !hmac) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // ✅ Verify HMAC signature (authenticity check)
  const params = Object.fromEntries(searchParams.entries());
  delete params['signature'];
  delete params['hmac'];

  const message = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  const generatedHmac = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex');

  if (generatedHmac !== hmac) {
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 403 });
  }

  // ✅ Exchange temporary code for permanent access token
  const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return NextResponse.json({ error: 'Failed to retrieve access token', details: tokenData }, { status: 500 });
  }

  // ✅ Log token for now (later: save to DB)
  console.log(`🔐 Access token for ${shop}:`, tokenData.access_token);

  // ✅ Redirect merchant back to your dashboard UI
  const appName = 'banner-app'; // must match your Shopify app's handle in Partner Dashboard
  const storeName = shop.replace('.myshopify.com', '');
  const adminRedirectUrl = `https://admin.shopify.com/store/${storeName}/apps/${appName}`;

  return NextResponse.redirect(adminRedirectUrl);
}
